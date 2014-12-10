console.log('main.js linked');
if($ !== undefined) { console.log('  jQuery library loaded!');     }
if(_ !== undefined) { console.log('  Underscore library loaded!'); }


var todoApp       = {}; // create a global namespace
todoApp.taskNum   = 0;
todoApp.taskViews = {}; // this is the global variable to hold our tasks
                        // we hold a reference to our views, bc they in turn
                        // reference our models, via view.model

todoApp.pushView = function(newView) {
  // remember redis? :)
  var viewId = todoApp.taskNum; todoApp.taskNum++; // increment counter
  newView.viewId = viewId; // give that ID to the view, so it can remove itself
  todoApp.taskViews[viewId] = newView; // add our view to the global list of
                                       //   views with a "unique" ID
}

todoApp.createTask = function(data, el) {
  var task     = new Task(data);
  var taskView = new TaskView(task, el).init();

  todoApp.pushView(taskView);
  return task; // return the model for chaining!
}

// NOT doing the below b/c we are loading the page WITH the 
//   current state of the DB!
// todoApp.loadTasks = function() {
//   // INDEX: GET /tasks
//   $.ajax({
//     url: "/tasks",
//     format: "json"
//   }).done(function(data){
//     // create a local task (task model, view and pushed on to the task list)
//     for(var i = 0; i < data.length; i++){
//       todoApp.createTask(data[i]);
//     }
//   });
// }

console.log("1. application initialized...", todoApp);

$(function(){
  console.log('2. page (DOM) loaded: now running onload...');

  // caches references to repeatedly need DOM nodes
  todoApp.$body         = $("body");
  todoApp.$inputField   = $("input");
  todoApp.$submitButton = $("button");
  todoApp.$taskList     = $("ul").eq(0);

  // attach a model & view creation function to the form submission
  todoApp.$submitButton.on("click", function(event){
    event.preventDefault();
    var taskDescription = todoApp.$inputField.val();
    todoApp.$inputField.val(''); // reset the input
    todoApp.createTask({ description: taskDescription })
           .create(); // call create on the model that is returned (see above)  
  });

  // start the app!
  // todoApp.loadTasks();
  todoApp.$taskList.children().each(function(idx, li){
    var data = {}, $li = $(li);
    data.description = $li.find("span.description").text().trim();
    data.id          = $li.data("id");
    data.completed   = $li.data("completed");
    todoApp.createTask(data, li);
  });
});

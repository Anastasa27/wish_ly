console.log("task_view.js linked");

function TaskView(model, el){
  console.log('view created with model:', model);
  
  this.$el   = (el !== undefined) ? $(el) : undefined;
  this.model = model;

  // attach the view to the model so that it can message the view!
  // model.view = this; // all changes are triggered from the client, ie
                        // via the view, so this isn't necessary -- but if
                        // the server was making changes, then we may need
                        // to trigger events from the model on the view...
}

TaskView.prototype = {
  template: _.template($("#task-template").html()),

  render: function() {
    console.log('  view:render', this);
    var temp = this.template({task: this.model});
    this.$el = $(temp); // reset el

    return this; // for chaining!
  },

  init: function() {
    console.log('  view:init', this);
    var view = this; // make it more semantic below...
    // debugger
    // if the element is NOT on the DOM, ie it was NOT passed
    //   in the constructor
    if (!this.$el) {
      // build the element and then add to the DOM
      view.render();
      $("#tasks").append(view.$el);
      console.log('    (building element)', this.$el);
    } else {
      console.log('    (hooking element)', this.$el);
    }
    
    // attach event listeners, et al
    view.$el.on("click", "input",       view, view.toggleCompleted);
    view.$el.on("click", "span.remove", view, view.remove);

    return this; // for chaining!
  },

  toggleCompleted: function(event) {
    console.log('-> view:toggleCompleted', event.data);

    // this is the DOM node
    // event.data refers to the view instance (set in the handler above)
    event.data.$el.find("span.description").toggleClass('completed');

    // message the model
    event.data.model.toggleCompleted();
  },

  remove: function(event) {
    console.log('-> view:remove', event.data);

    // remove from the DOM
    event.data.$el.remove();

    // remove from global list!
    // http://stackoverflow.com/questions/208105/how-to-remove-a-property-from-a-javascript-object
    delete todoApp.taskViews[event.data.viewId];

    // message the model
    event.data.model.destroy();
  }
}

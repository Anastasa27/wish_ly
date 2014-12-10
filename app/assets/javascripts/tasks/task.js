console.log("task.js linked");

function Task(data) {
  console.log('model created with data:', data);
  this.id          = data.id;
  this.completed   = data.completed;
  this.description = data.description;
}

Task.prototype.toggleCompleted = function(){
  console.log('-> model:toggleCompleted', this);

  this.completed = !this.completed; // update model!
  this.update(); // persist!
}

Task.prototype.create = function() {
  console.log('!(AJAX) model:create initiated', this);
  $.ajax({
    url:      "/tasks",
    type:     "POST",
    dataType: "json",
    context:  this, // this sets context in done to the object
    data: {
      task: { // nested for rails strong params (white-listing)!
        description: this.description,
        completed:   this.completed
      }
    }
  }).done(function(data){
    // give the model the data from the server (id, etc.)
    this.id        = data.id;
    this.completed = data.completed;
    console.log('!(AJAX) model:create complete', data, this);
  });
}

Task.prototype.update = function() {
  console.log('!(AJAX) model:update initiated');
  $.ajax({
    url:      "/tasks/" + this.id,
    type:     "PATCH",
    dataType: "json",
    context:  this, // this sets context in done to the object
    data: {
      task: { // nested for rails strong params (white-listing)!
        description: this.description,
        completed:   this.completed
      }
    }
  }).done(function(data){
    console.log('!(AJAX) model:update complete', data, this);
  });
}

Task.prototype.destroy = function(){
  console.log('!(AJAX) model:destroy initiated');
  $.ajax({
    url:      "/tasks/" + this.id,
    type:     "DELETE",
    dataType: "json",
    context:  this // this sets context in done to the object
  }).done(function(data){
    console.log('!(AJAX) model:destroy complete', data, this);
  });
}

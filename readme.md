## Todo.ly

You've been handed a mostly-written Rails backend that serves up sweet, sweet JSON for `Task` objects, and a mostly-written front-end application with a `Task` model and a view. Using your knowledge of AJAX and RESTful routing, sync the two up!

#### Directions

1. Run `rake db:create`, `rake db:create`, and `rake db:seed` from within your new rails app.
1. Run `rails s` and play try creating and toggling the tasks. Reload the page and watch your changes disappear.
1. Critically evaluate the code in `main.js`, `tasks/task.js`, and `tasks/task_view.js`. Notice that the tasks are being loaded by AJAX by hittings the `"/index"` path.
1. Use your knowledge of AJAX and RESTful routing to sync any changes to your client-side models with your the database.
  - Remember, the `Task` model's behaviors (like, say, saving and destroy associated database records) should be written onto its prototype.

#### Bonus

Make it pretty.

#### Resources

- [jQuery AJAX](http://api.jquery.com/jquery.ajax/)

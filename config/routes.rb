# == Route Map (Updated 2014-10-21 15:54)
#
# Prefix Verb   URI Pattern          Controller#Action
#  tasks GET    /tasks(.:format)     tasks#index
#        POST   /tasks(.:format)     tasks#create
#   task GET    /tasks/:id(.:format) tasks#show
#        PATCH  /tasks/:id(.:format) tasks#update
#        PUT    /tasks/:id(.:format) tasks#update
#        DELETE /tasks/:id(.:format) tasks#destroy

Rails.application.routes.draw do
  get '/' => "welcome#index"
  resources :tasks, :except => [:edit, :new]
end

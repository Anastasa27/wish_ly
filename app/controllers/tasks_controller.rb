class TasksController < ApplicationController
  before_action :set_task, only: [:show, :update, :destroy]

  def index
    @tasks = Task.all.sort_by {|task| task.created_at}
    render :index
  end

  def show
    render json: @task
  end

  def create
    @task = Task.create(task_params)
    render json: @task
  end

  def update
    @task.update(task_params)
    render json: @task
  end


  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_task
    @task = Task.find_by(id: params[:id])
  end

  def task_params
    params.require(:task).permit(:description, :completed)
  end
end

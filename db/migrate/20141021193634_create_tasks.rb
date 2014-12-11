class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :description
      t.string :link
      t.boolean :completed, :default => false
      t.timestamps
    end
  end
end

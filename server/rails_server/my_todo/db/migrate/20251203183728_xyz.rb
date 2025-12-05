class Xyz < ActiveRecord::Migration[8.0]
  def change
    rename_column :todos, :completed, :isCompleted
  end
end

class CreateUsersTable < ActiveRecord::Migration[8.0]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :user_type
      t.string :password_digest
      t.timestamps
    end
  end
end

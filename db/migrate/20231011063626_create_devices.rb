class CreateDevices < ActiveRecord::Migration[7.0]
  def change
    create_table :devices do |t|
      t.integer :user_id
      t.string :endpoint
      t.string :p256dh
      t.string :auth

      t.timestamps
    end
  end
end

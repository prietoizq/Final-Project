class CreateImages < ActiveRecord::Migration
  def change
    create_table :images do |t|

    	t.integer :user_id
    	t.string :title
    	t.string :theme
    	t.text :description
    	t.integer :likes, default: 0
      t.text :users_likes

      t.timestamps null: false
    end
  end
end

class CreateCampgrounds < ActiveRecord::Migration[5.2]
  def change
    create_table :campgrounds do |t|
      t.string :campground_ridb_id
      t.string :name
      t.text :description
      
      t.timestamps
    end
  end
end

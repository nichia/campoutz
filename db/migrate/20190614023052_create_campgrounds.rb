class CreateCampgrounds < ActiveRecord::Migration[5.2]
  def change
    create_table :campgrounds do |t|
      t.string :FacilityID
      t.string :FacilityName
      t.text :FacilityDescription
      
      t.timestamps
    end
  end
end

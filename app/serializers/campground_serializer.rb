class CampgroundSerializer < ActiveModel::Serializer
  attributes :campground_ridb_id, :name, :description
end

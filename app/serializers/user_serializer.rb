class UserSerializer < ActiveModel::Serializer
  attributes :username, :email, :firstname, :lastname, :bio, :avatar

  has_many :favorite_campgrounds
end

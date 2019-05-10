class UserSerializer < ActiveModel::Serializer
  attributes :username, :email, :firstname, :lastname, :bio, :avatar
end

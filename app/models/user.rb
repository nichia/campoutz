class User < ApplicationRecord
  has_many :favorites
  has_many :favorite_campgrounds, through: :favorites, source: :favorited, source_type: 'Campground'
  
  has_secure_password
  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true
end

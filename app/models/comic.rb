class Comic < ApplicationRecord
  validates :title, presence: true
  validates :artist, presence: true 

  has_many :reviews
  has_many :readers, through: :reviews
  # accepts_nested_attributes_for :reviews
  accepts_nested_attributes_for :readers

end

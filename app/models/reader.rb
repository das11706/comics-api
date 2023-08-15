class Reader < ApplicationRecord
  has_many :reviews
  has_many :comics, through: :reviews

  accepts_nested_attributes_for :comics
end

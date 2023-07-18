class Reader < ApplicationRecord
  has_many :reviews
  has_many :comics, through: :reviews
end

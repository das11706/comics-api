class Review < ApplicationRecord
  belongs_to :comic
  belongs_to :reader
end

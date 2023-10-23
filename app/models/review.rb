class Review < ApplicationRecord
  validates :description, presence: true

  belongs_to :comic
  # belongs_to :reader, optional: true

end

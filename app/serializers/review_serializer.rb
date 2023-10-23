class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :comic_id, :description
  belongs_to :comic
end

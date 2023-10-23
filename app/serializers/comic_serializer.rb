class ComicSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist
  has_many :reviews 
end

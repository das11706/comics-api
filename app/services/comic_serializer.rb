class ComicSerializer

  def initialize(comic_object)
    @comic = comic_object
  end

  def to_serialized_json
    options = {
      include: {
        reviews: {
          only: [:description]
        }
      },
      except: [:created_at, :updated_at],
    }
    @comic.to_json(options)
  end

end


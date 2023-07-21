class ReviewSerializer

  def initialize(review_object)
    @review = review_object
  end

  def to_serialized_json
    options = {
      include: {
        comic: {
          only: [:artist, :title]
        },
        reader: {
          only: [:name]
        }
      },
      except: [:created_at, :updated_at],
    }
    @review.to_json(options) 
  end

end
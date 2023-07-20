class ReviewsController < ApplicationController

  def index
    reviews = Review.all 
    render json: ReviewSerializer.new(reviews).to_serialized_json
  end


  def show
    review = Review.find_by(id: params[:id])
    render json: ReviewSerializer.new(review).to_serialized_json
    # render json: { id: review.id, comic: review.comic, reader: review.reader }
  end
end

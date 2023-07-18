class ReviewsController < ApplicationController

  def index
    reviews = Review.all 
    render json: reviews, include: [:comic, :reader]
  end


  def show
    review = Review.find_by(id: params[:id])
    render json: { id: review.id, comic: review.comic, reader: review.reader }
  end
end

class ReviewsController < ApplicationController

  def index
    reviews = Review.all 
    render json: ReviewSerializer.new(reviews).to_serialized_json
  end

  def new
    review = Review.new
  end

  def create
    review = Review.new
    review.description = params[:description]
    review.save
    if review
      render json: review, only: [:description]
    # else
    #   render :new
    end
  end

  
  def show
    review = Review.find_by(id: params[:id])
    if review
      render json: ReviewSerializer.new(review).to_serialized_json
    # render json: { description: review.description }
    else
      render json: { message: "Review does not exist" }
    end
  end
  
end



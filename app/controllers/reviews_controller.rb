class ReviewsController < ApplicationController

  def index
    reviews = Review.all 
    render json: ReviewSerializer.new(reviews).to_serialized_json
  end

  def new
    review = Review.new(comic_id: params[:comic_id])
  end

  def create
    # review = Review.new(review_params)
    # comic = Comic.find(params[:id])
    # comic = Comic.find_by(id: params[:id])
    review = Review.new(review_params)
    # reader = Reader.find(params[:reader_id])
    # review = comic.reviews.build(review_params)
    # review.reader = reader
    # review.errors.messages
    # review.description = params[:description]
    review.save
    # if review
      render json: review, only: [:description]
    # else
    #   render :new
    # end
  end


  
  def show
    review = Review.find_by(id: params[:id])
    if review
      # render json: ReviewSerializer.new(review).to_serialized_json
    # render json: { description: review.description }
      render json: review
    else
      render json: { message: "Review does not exist" }
    end
  end

  def destroy
    Review.find(params[:id]).destroy
    render Json: review
  end

  private

  def review_params
    params.require(:review).permit(:description, :comic_id, :reader_id)
  end
  
end



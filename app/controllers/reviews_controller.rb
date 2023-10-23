class ReviewsController < ApplicationController

  def index
    reviews = Review.all 
    render json: reviews
    # render json: ReviewSerializer.new(reviews).to_serialized_json
  end

  # def new
  #   review = Review.new(comic_id: params[:comic_id])
  # end

  def create
    review = Review.new(review_params)
    # review.save

    # review = Review.new
    # review.description = params[:description]
    # review.comic_id = params[:comic_id]
    # review.save

    if review.save
      render json: review, only: [:description, :comic_id]
    else
      # render :new
      render json: review.errors
    end
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


  def edit
    review = Review.find(params[:id])
  end

  def update
    review = Review.find(params[:id])
    if review.update(description: params[:description])
      render json: review
    else
      render json: review.errors
    end
  end


  def destroy
    review = Review.find(params[:id])
    review.destroy
    head :no_content
    # render json: review
  end

  private

  def review_params
    params.require(:review).permit(:description, :comic_id)
  end
  
end



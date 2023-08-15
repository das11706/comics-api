class ComicsController < ApplicationController

  def index
    comics = Comic.all
    # render json: comics, except: [:created_at, :updated_at]
    # render json: comics, only: [:artist, :title]
    # render json: comics
    render json: ComicSerializer.new(comics).to_serialized_json
  end

  

  def new
    comic = Comic.new
    comic.reviews.build(description: '')
   
  end

  def create
    comic = Comic.new(comic_params)
    # comic.title = params[:title]
    # comic.artist = params[:artist]
    comic.save!
    if comic
      # redirect_to comic
      render json: comic, only: [:artist, :title]
    #   redirect_to json: comic, only: [:artist, :title]
    # else
    #   render :new
    end
  end

  def show
    comic = Comic.find_by(id: params[:id])
    if comic
      # render json: { title: comic.title, artist: comic.artist }
      render json: comic
    else
      render json: { message: "Comic does not exist"}
    end
  end

  private

  def comic_params
    params.require(:comic).permit(:title, :artist, reviews_attributes: [:description])
  end


end

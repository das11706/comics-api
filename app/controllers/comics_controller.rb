class ComicsController < ApplicationController

  def index
    comics = Comic.all
    render json: comics
  end

  def new
    comic = Comic.new
    comic.reviews.build(description: '')
   
  end

  def create
    comic = Comic.new()
    if comic
      redirect_to comic
      # redirect_to json: { title: comic.title, artist: comic.artist }
    else
      render :new
  end

  def show
    comic = Comic.find_by(id: params[:id])
    if comic
      render json: { title: comic.title, artist: comic.artist }
    else
      render Json: { message: "Comic does not exist"}
    end
  end
end

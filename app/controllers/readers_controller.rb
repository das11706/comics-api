class ReadersController < ApplicationController

  def index
    readers = Reader.all
    render json: readers, only: [:name]
  end

  def show
    reader = Reader.find_by(id: params[:id])
    if reader
      render json: reader, only: [:name] 
    else
      render json: { message: "Reader does not exist" }
    end
  end

end

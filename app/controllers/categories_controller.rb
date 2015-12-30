class CategoriesController < ApplicationController
  def show
    if params[:name]
      @category = Category.where(name: params[:name]).select('id', 'name')
    elsif params[:id]
      @category = Category.where(id: params[:id]).select('id', 'name')
    end
    render json: @category
  end
  
  def showAll
    @categories = Category.all
    render json: @categories
  end
end

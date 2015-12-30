class PrefixesController < ApplicationController
  def show
    @prefixes = nil
    if params[:cat_name]
      @category = Category.where(name: params[:cat_name])
      @category.each do |cat|
        @prefixes = Prefix.where(category: cat.id).select('id', 'text')
      end
    elsif params[:cat_id]
      @category = Category.where(id: params[:cat_id])
      @category.each do |cat|
        @prefixes = Prefix.where(category: cat.id).select('id', 'text')
      end
    end
    render json: @prefixes
  end
end

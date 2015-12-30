class SuffixesController < ApplicationController
  def show
    @suffixes = Suffix.all
    render json: @suffixes
  end
end

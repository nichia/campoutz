class Api::V1::FavoriteCampgroundsController < ApplicationController
  before_action :set_campground

  def create
    # byebug
    @campground = Campground.find(params[:campground_ridb_id]) || Campground.new(campground_params)
    if current_user.favorite_campgrounds.detect{ |c| c.id == @campground.id}
      render json: {error: "You have already saved this campground"}, status: :not_acceptable
    else
      if Favorite.create(favorited: @campground, user: current_user)
        render json: { campground: campgroundSerializer.new(@campgroun) }, status: :created
      else
        render json: {error: "Oops... cannot save the campground at this time"}, status: :not_acceptable
      end
    end
  end

  def destroy
    @campground = Campground.find(params[:id])
    Favorite.where(favorited_id: @campground.id, user_id: current_user.id).first.destroy
    render json: { campground_id: params[:id]}, status: :ok
  end

  private

  def campground_params
    params.require(:campground).permit(
      :campground_ridb_id,
      :name,
      :description
    )
  end
end

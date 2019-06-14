class Api::V1::FavoriteCampgroundsController < ApplicationController

  def create
    # byebug
    # Find the first campground matching ":campground_ridb_id" or create a new one with the given campgrond_params attributes
    @campground = Campground.create_with(campground_params).find_or_create_by(campground_ridb_id: params[:campground][:campground_ridb_id])

    # Set campground_params and save the record if campground attributes have changed (ensure always have latest api info)
    @campground.assign_attributes(campground_params)
    if @campground.changed?
      @campground.save
    end

    if current_user.favorite_campgrounds.detect{ |c| c.id == @campground.id}
      render json: {error: "You have already saved this campground"}, status: :not_acceptable
    else
      if Favorite.create(favorited: @campground, user: current_user)
        render json: { campground: CampgroundSerializer.new(@campground) }, status: :created
      else
        render json: {error: "Oops... cannot save the campground at this time"}, status: :not_acceptable
      end
    end
  end

  def destroy
    # byebug
    @campground = Campground.find_by(campground_ridb_id: params[:id])
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

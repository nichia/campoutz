class Api::V1::FavoriteCampgroundsController < ApplicationController

  def create
    # Find the first campground matching ":FacilityID" or create a new one with the given campgrond_params attributes
    @campground = Campground.create_with(campground_params).find_or_create_by(FacilityID: params[:campground][:FacilityID])
    
    # byebug
    # Set attributes from campground_params and save the record if the attribute is different (ensure always have latest api info)
    @campground.assign_attributes(campground_params)
    if @campground.changed?
      @campground.save
    end

    if current_user.favorite_campgrounds.detect{ |c| c.id == @campground.id}
      render json: {error: "You have already favorited this campground id " + @campground.FacilityID}, status: :not_acceptable
    else
      if Favorite.create(favorited: @campground, user: current_user)
        render json: { campground: CampgroundSerializer.new(@campground) }, status: :created
      else
        render json: {error: "Oops... cannot favorite the campground at this time"}, status: :not_acceptable
      end
    end
  end

  def destroy
    @campground = Campground.find_by(FacilityID: params[:id])
    if @campground 
      current_user.favorite_campgrounds.delete(@campground)
      render json: { FacilityID: params[:id]}, status: :ok
    else
      render json: {error: "Campground cannot be removed from favorite"}, status: :not_acceptable
    end
  end

  private

  def campground_params
    params.require(:campground).permit(
      :FacilityID,
      :FacilityName,
      :FacilityDescription
    )
  end
end

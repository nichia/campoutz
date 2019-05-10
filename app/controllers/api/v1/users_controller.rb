class Api::V1::UsersController < ApplicationController
  skip_before_action :authorized, only: [:create]

  # http://api.rubyonrails.org/classes/ActionController/ParamsWrapper.html
  # Don't know why: with rails --api, json format - cannot receive params user 'password' because it is not an attribute/column in User model (User has password_digest). Need to add this wrap_parameters to fix the issue.
  wrap_parameters :user, include: %i[username password email firstname lastname bio avatar]

  # An authenticated user can access their profile information
  def profile
    render json: { user: UserSerializer.new(current_user) }, status: :accepted
  end

  def create
    # raise params.inspect
    # byebug
    @user = User.create(user_params)
    if @user.valid?
      @token = encode_token(user_id: @user.id)
      render json: { user: UserSerializer.new(@user), jwt: @token }, status: :created
    else
      render json: { error: 'failed to create user' }, status: :not_acceptable
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :username,
      :password,
      :email,
      :firstname,
      :lastname,
      :bio,
      :avatar
    )
  end
end

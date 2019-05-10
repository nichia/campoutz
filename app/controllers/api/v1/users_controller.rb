class Api::V1::UsersController < ApplicationController
  # http://api.rubyonrails.org/classes/ActionController/ParamsWrapper.html
  # Don't know why: with rails --api, json format - cannot receive params user 'password' because it is not an attribute/column in User model (User has password_digest). Need to add this wrap_parameters to fix the issue.
  wrap_parameters :user, include: %i[username password email firstname lastname bio avatar]

  def create
    # raise params.inspect
    # byebug
    @user = User.create(user_params)
    if @user.valid?
      render json: { user: UserSerializer.new(@user) }, status: :created
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

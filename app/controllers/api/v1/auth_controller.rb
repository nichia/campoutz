class Api::V1::AuthController < ApplicationController
  skip_before_action :authorized, only: [:create]

  def create
    # byebug
    @user = User.find_by(username: auth_params[:username])
    # User#authenticate comes from BCrypt
    if @user && @user.authenticate(auth_params[:password])
      # encode token comes from ApplicationController
      payload = { user_id: @user.id }
      @token = encode_token(payload)
      render json: { user: UserSerializer.new(@user), jwt: @token }, status: :accepted
    else
      render json: { errors: ['Invalid username or password'] }, status: :unauthorized
    end
  end

  private

  def auth_params
    params.require(:user).permit(
      :username,
      :password
    )
  end
end

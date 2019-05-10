class ApplicationController < ActionController::API
  before_action :authorized

  def encode_token(payload)
    # issue a token, store payload in token
    # byebug
    JWT.encode(payload, ENV['jwt_secret'])
  end

  def auth_header
    # Bearer <token>
    request.headers['Authorization']
  end

  def decoded_token
    if auth_header
      # [Bearer, <token>]
      token = auth_header.split(' ')[1]
      begin
        JWT.decode(token, ENV['jwt_secret'], true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil # or [{}]
      end
    end
  end

  def current_user
    if decoded_token
      # [{ "user_id"="3" }, { "alg"=>"HS256"}]
      if user_id = decoded_token[0]['user_id']
        @user = User.find_by(id: user_id)
      end
    end
  end

  def logged_in?
    !!current_user
  end

  def authorized
    render json: { message: 'Please log in' }, status: :unauthorized unless logged_in?
  end
end

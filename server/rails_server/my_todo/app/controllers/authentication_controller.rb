class AuthenticationController < ApplicationController

    skip_before_action :validate_token, only:[:signup, :login]

    def signup
        user = User.new(user_params)
        if user.save
            token = JsonWebToken.encode({user_email: user.email})
            render json: {token: token, user_email: user.email}
            UserMailer.with(user: user).welcome_email.deliver_later
        else
            render json: { error: user.errors.full_messages}, status: :unprocessable_entity
        end    
    end

    def login
        user = User.find_by(email: params[:email])
        if user&.authenticate(params[:password])
            token = JsonWebToken.encode({user_email: user.email})
            render json: {token: token, user_email: user.email}
        else
            render json: {error: "Invalid username or password"}, status: :unauthorized
        end
    end

    private

    def user_params
        params.permit(:email, :name, :user_type,:password, :password_confirmation)
    end
end
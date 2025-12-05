class ApplicationController < ActionController::API

    before_action(:validate_token)

    private

      def validate_token()
        req_header_auth = request.headers["Authorization"]
        if req_header_auth.blank? || !req_header_auth.starts_with("Bearer")
            return nil
        else
            token = req_header_auth.split(" ").last
        end

        begin
           payload, header = JWT.decode(token,Rails.application.credentials.jwt_secret, true, "HS256")
           if payload["exp"] < Time.now().to_i
            raise "Token has expired"
           end
        rescue => e
            render json: { error: e.message }, status: :unauthorized
        end




      end

end

class ApplicationController < ActionController::API

    before_action :validate_token

    private

      def validate_token()
        begin
           req_header_auth = request.headers["Authorization"]
           if req_header_auth.blank? || !req_header_auth.start_with?("Bearer")
               raise "Header Authorization blank"
           else
               token = req_header_auth.split(" ").last
               puts "Token => #{token}"
           end

           payload, header = JWT.decode(token,Rails.application.credentials.jwt_secret, true, {"algorithm" => "HS256"})
           if payload["exp"] < Time.now().to_i
            raise "Token has expired"
           end
        rescue => e
            puts "Error => #{e.message}"
            render json: { error: e.message }, status: :unauthorized
        end




      end

end

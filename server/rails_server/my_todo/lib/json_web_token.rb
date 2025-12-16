class JsonWebToken
    require 'jwt'
    SECRET = Rails.application.credentials.jwt_secret
    
    def self.encode(payload, exp = 10.minutes.from_now)
        payload[:exp] = exp.to_i
        JWT.encode(payload, SECRET, "HS256")
    end
end
class Todo < ApplicationRecord
    belongs_to :user

    scope :for_user, (user)->{where(user_id: user.id)}
end

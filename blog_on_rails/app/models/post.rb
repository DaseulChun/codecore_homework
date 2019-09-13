class Post < ApplicationRecord
  has_many :comments, dependent: :destroy

  # The title column must be present and unique.
  validates :title, presence: true, uniqueness: true

  # The body column must be present and contain at least 50 characters.
  validates :body, 
          presence: {message: "must exist"},  
            length: { minimum: 50,
                      too_short: "is too short. Come on write more! %{count} characters is the minimum"}
end

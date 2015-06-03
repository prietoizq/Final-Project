class User < ActiveRecord::Base
	has_many :images

	has_secure_password
end

class User < ActiveRecord::Base
	has_many :images

	has_secure_password

	def editor? 
 		self.role == 'editor' 
	end

	def admin? 
 		self.role == 'admin' 
	end

	def get_email
		self.email
	end
end

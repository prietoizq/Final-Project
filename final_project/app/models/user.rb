class User < ActiveRecord::Base
	has_many :images, :dependent => :destroy
	#ESTO ES NECESARIO PARA QUE AL BORRAR EL USUARIO SE BORREN TAMBIÉN SUS IMAGENES

	validates :name, presence: true 
	validates :name, uniqueness: true
	validates :name, length: { maximum: 30 } 
	validates :name, format: { with: /[a-zA-Z\d\s]/ }

	validates :email, presence:true
	validates :email, uniqueness: true

	validates :password, presence: true

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

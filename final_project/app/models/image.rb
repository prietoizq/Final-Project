class Image < ActiveRecord::Base

	belongs_to :user
	
	validates :title, presence: true 
	validates :address, presence: true
	validates :description, presence: true 
	validates :theme, presence: true 


	serialize :users_likes, Array
	#serialize lo que hace es convertir ese atributo a ese elemento de forma obligada

	geocoded_by :address	

	

	has_attached_file :photo, :styles => { :medium => "300x300#", :thumb => "100x100#", :large => "500x500#" }, :default_url => "/images/:style/missing.png"
	validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

	after_validation :geocode

end

class ImagesController < ApplicationController

	before_action :require_user, only: [:index, :show, :edit, :destroy, :new, :create]
	#before_action :require_editor, only: [:edit]
	#before_action :require_admin, only: [:destroy]

	def index
		@user = User.find params[:user_id] #el corchete con params tiene que ir junto!!
		@images = @user.images
	end

	def map
		@images = Image.all

		@hash = Gmaps4rails.build_markers(@images) do |image, marker|
	 		marker.lat image.latitude
	 		marker.lng image.longitude
	 		marker.json({:id => image.id })
	 		image_link = view_context.link_to image.title,  user_image_path(image.user_id, image)
	 		marker.infowindow image_link
	 	end 		
	end

	def photos
		@images = Image.all

		respond_to do |format|
			format.html #{ render index: @comments } ESTO EN ESTE CASO PUEDE OMITIRSE
    	format.json { render json: @images }
		end
	end

	def show
		@user = User.find params[:user_id]
		@image = @user.images.find params[:id]

		@hash = Gmaps4rails.build_markers(@image) do |image, marker|
	 		marker.lat image.latitude
	 		marker.lng image.longitude
	 		marker.json({:id => image.id })
	 	end 

	 	respond_to do |format|
			format.html #{ render index: @comments } ESTO EN ESTE CASO PUEDE OMITIRSE
    	format.json { render json: @image }
		end	
	end

	def get_update_map
		array_ids = params[:item]

		@images = []
		array_ids.each do |array_id|
			image = Image.find array_id 
			@images << image
		end

		@hash = Gmaps4rails.build_markers(@images) do |image, marker|
	 		marker.lat image.latitude
	 		marker.lng image.longitude
	 		marker.json({:id => image.id })
	 		image_link = view_context.link_to image.title,  user_image_path(image.user_id, image)
	 		marker.infowindow image_link
	 	end 	
		render 'update_map', layout: false
	end

	def get_search
		image_id = params[:item]
		@image = Image.find image_id
		render 'search', layout: false
	end

	def new
		@user = User.find params[:user_id]
		@image = @user.images.new
	end

	def create
		@user = User.find params[:user_id]
		@image = @user.images.new image_params

		if @image.save
			flash[:notice] = "Image uploaded successfully"
			redirect_to user_image_path(@user, @image) #le pasamos el @project para que tenga una forma de ver el parámetro project_id sobre el que tiene que coger las entries
		else
			flash[:alert] = "Photo hasn't been created!"
			render 'new'
		end
	end

	def edit
		@user = User.find params[:user_id]
		@image = @user.images.find params[:id]
	end

	def update
		@user = User.find params[:user_id]
		@image = @user.images.find params[:id]

		if @image.update image_params
			flash[:notice] = "Image updated successfully"
			redirect_to user_image_path(@user, @image)
		else
			flash.now[:errors] = @image.errors.full_messages #flash.now es para que el render no se lo coma y así poder usar el flash con el render
			render 'edit'
		end
	end

	def like
		@user = User.find params[:user_id]
		@image = @user.images.find params[:id]

	    @image.likes =(@image.likes + 1)
	    @image.save
	     
	    redirect_to user_image_path(@user, @image)  
	end

	def destroy
		@user = User.find params[:user_id]
		image = @user.images.find params[:id]
		image.destroy
		redirect_to user_path(@user)
	end

	private
	def image_params
		params.require(:image).permit(:title, :theme, :description, :likes, :users_likes, :photo, :address, :latitude, :longitude)
	end

end

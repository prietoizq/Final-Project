class ImagesController < ApplicationController

	before_action :require_user, only: [:index, :show, :edit, :destroy, :new, :create]
	#before_action :require_editor, only: [:edit]
	#before_action :require_admin, only: [:destroy]

	def index
		@user = User.find params[:user_id] #el corchete con params tiene que ir junto!!
		@images = @user.images
	end

	def photos
		@images = Image.all
	end

	def photos_by_date
		@images = Image.all
	end

	def show
		@user = User.find params[:user_id]
		@image = @user.images.find params[:id]
	end

	def new
		@user = User.find params[:user_id]
		@image = @user.images.new
	end

	def create
		@user = User.find params[:user_id]
		@image = @user.images.new image_params

		if @image.save
			flash[:notice] = "Photo created successfully"
			redirect_to user_path(@user) #le pasamos el @project para que tenga una forma de ver el parámetro project_id sobre el que tiene que coger las entries
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
			redirect_to user_path(@user)
		else
			flash.now[:errors] = @image.errors.full_messages #flash.now es para que el render no se lo coma y así poder usar el flash con el render
			render 'edit'
		end
	end

	def destroy
		@user = User.find params[:user_id]
		image = @user.images.find params[:id]
		image.destroy
		redirect_to user_path(@user)
	end

	private
	def image_params
		params.require(:image).permit(:title, :direction, :description, :rating, :photo)
	end

end

class UsersController < ApplicationController

	before_action :require_user, only: [:index, :show, :edit, :destroy]
	before_action :require_admin, only: [:destroy]

	def welcome
	end

	def about
	end

	def index 
		@users = User.all
	end

	def show
		begin
			@user = User.find params[:id]
		rescue ActiveRecord::RecordNotFound
			render 'no_users_found'
		end
	end

	def new
		@user = User.new
	end

	def create
		@user = User.new user_params #aquí se llama al metodo privado project_params (mas abajo)
		if @user.save #si es valido, este .save devuelve true, y se guarda. Y si es false, no lo guarda. Con el save comprueba las validaciones que le pusimos en el modelo del project
			flash[:notice] = "User created successfully"
			session[:user_id] = @user.id
			redirect_to users_path #si es true, lo guarda y te lleva al show del proyecto
		else
			flash[:alert] = "User hasn't been created!"
			redirect_to '/signup' #si es falso, te vuelve a llevar a la vista de projects. Ahora se usa render, porque con el redirect_to, te machaca el proyecto
		end
	end

	def edit
		@user = User.find params[:id]
	end

	def update
		@user = User.find params[:id]
		if @user.update user_params
			redirect_to @user #@project equivale a poner todo el path del show project
		else
			render 'edit'
		end
	end

	def destroy
		user = User.find params[:id] #aqui no hace falta poner @ ya que no necesitamos que ese project sea accesible en la VISTA
		user.destroy
		redirect_to users_path
	end

	private #este private hace que los metodos aqui dentro solo sean accesibles desde esta clase
	def user_params #este metodo SE PUEDE LLAMAR COMO QUIERAS, pero es necesario para que al crear un objeto se autorice su creacion (porque si no nos podrían meter codigo malicioso)
		params.require(:user).permit(:name, :email, :password)
	end

end

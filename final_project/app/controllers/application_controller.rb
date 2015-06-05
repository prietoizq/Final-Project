class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user 

	def current_user 
		@current_user ||= User.find(session[:user_id]) if session[:user_id] 
	end

	def require_user 
		redirect_to '/login' unless current_user 
	end

	#esto HABRÍA QUE CAMBIARLO PARA QUE LLEVE A UNA PÁGINA TIPICA DE (NO TIENES PERMISOS)
	#EN VEZ DE ENVIAR AL INDEX
	def require_editor 
  		redirect_to '/' unless current_user.editor? 
	end

	def require_admin
    	redirect_to '/' unless current_user.admin?
  	end

end

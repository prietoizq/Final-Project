Rails.application.routes.draw do

  get 'map' => 'images#map', as:"map"
	get 'photos' => 'images#photos'
  get '/' => 'users#welcome', as:"welcome"
  get '/about' => 'users#about', as:"about"
  get 'signup' => 'users#new'

  get '/users/:user_id/images/:id/like' => 'images#like', as:"like"
  get '/users/:user_id/images/:id/original' => 'images#original', as:"original"

  get 'login' => 'sessions#new'
  get 'images/search' => 'images#get_search', as:"search"
  get 'images/update_map' => 'images#get_update_map', as:"update_map"
  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'
  
  resources :users do
    resources :images
  end

end

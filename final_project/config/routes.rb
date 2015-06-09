Rails.application.routes.draw do

	get 'photos' => 'images#photos'
  get 'photos/date' => 'images#photos_by_date', as:"date"
  get '/' => 'users#welcome', as:"welcome"
  get '/about' => 'users#about', as:"about"
  get 'signup' => 'users#new'
  get 'login' => 'sessions#new'
  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'
  resources :users do
    resources :images
  end

end

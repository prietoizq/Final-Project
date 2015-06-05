Rails.application.routes.draw do
  
  get 'photos' => 'users#photos'
  get 'signup' => 'users#new'
  get 'login' => 'sessions#new'
  post 'login' => 'sessions#create'
  delete 'logout' => 'sessions#destroy'
  resources :users do
    resources :images
  end

end

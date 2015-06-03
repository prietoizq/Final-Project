Rails.application.routes.draw do
  
  get 'signup' => 'users#new'
  resources :users do
    resources :images
  end

end

Rails.application.routes.draw do
  
  resources :users do
    resources :images
  end

end

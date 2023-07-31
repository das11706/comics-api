Rails.application.routes.draw do
  resources :reviews
  resources :readers
  
  # resources :comics
  get '/comics' => 'comics#index'
  get '/comics/:id' => 'comics#show'
  # get '/comics' => 'comics#new'
  post '/comics' => 'comics#create'
  patch '/comics/:id' => 'comics#update'
  delete '/comics/:id' => 'comics#destroy'
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end

Rails.application.routes.draw do
  # get 'devices/create'
  get 'home/index'
  post 'home/post1'
  post 'home/post2'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root to: 'home#index'

  devise_for :users, :controllers => {
    :registrations => 'users/registrations',
    :sessions => 'users/sessions'
  }

  devise_scope :user do
    get "user/:id", :to => "users/registrations#detail"
    get "signup", :to => "users/registrations#new"
    get "login", :to => "users/sessions#new"
    get "logout", :to => "users/sessions#destroy"
    get "logout", :to => "users/sessions#destroy"
  end

  # resources :devices, only: [:create]
end

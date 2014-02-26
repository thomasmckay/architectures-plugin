Rails.application.routes.draw do

=begin
  resources :architectures, :only => [:index] do
    collection do
      get :all
    end
  end
=end

  resource :architectures, :only => [:index]

  namespace 'architectures' do
    #match 'architectures' => 'architectures#index', :via => :get
    #resources :architectures, :only => [:index], :controller => 'architectures'
    #resources :architectures, :only => [:index], :controller => 'architectures/architectures'
    #resources :architectures, :only => [:index], :as => 'architectures#architectures'
    #resources :architectures, :only => [:index], :as => 'architectures'
    #match 'architectures' => 'architectures#index', :via => :get, :as => 'architectures'
    match 'all' => 'architectures#all', :via => :get
  end

  #get :index, :controller => 'architectures'

end

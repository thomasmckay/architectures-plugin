require_dependency "architectures/application_controller"

module Architectures
  class ArchitecturesController < Architectures::ApplicationController

    before_filter :authorize

    def rules
      {
        :index => lambda {true},
        :all => lambda {true}
      }
    end

    def index
      render 'bastion/layouts/application', :layout => false
    end

    def all
      #redirect_to :action => 'index', :anchor => '/architectures'
      render 'bastion/layouts/application', :layout => false, :anchor => '/architectures'
    end
  end
end

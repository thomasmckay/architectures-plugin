module Architectures
  module Api
    class ArchitecturesController < ::Api::V2::ArchitecturesController
      def index
        @render_template = 'architectures/api/architectures/index'
        super
      end
    end
  end
end

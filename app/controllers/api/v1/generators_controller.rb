# frozen_string_literal: true

module Api
  module V1
    class GeneratorsController < ApplicationController
      include ActionController::Live

      before_action :set_indicator, only: %i[show refine metadata]

      def create
        stream_response do |emit|
          Generators::StreamService.new(
            prompt: generator_params[:prompt],
            script_type: generator_params[:script_type] || "indicator",
            name: generator_params[:name],
            &emit
          ).call
        end
      end

      def show
        render json: indicator_json(@indicator)
      end

      def refine
        stream_response do |emit|
          Generators::RefineService.new(
            indicator: @indicator,
            prompt: generator_params[:prompt],
            &emit
          ).call
        end
      end

      def metadata
        result = Generators::MetadataService.new(indicator: @indicator).call
        render json: result
      end

      def complete
        result = Generators::CompleteService.new(
          prefix: complete_params[:prefix],
          script_type: complete_params[:script_type] || "indicator"
        ).call
        render json: result
      rescue ArgumentError => e
        render json: { error: e.message }, status: :unprocessable_entity
      end

      private

      def stream_response
        response.headers["Content-Type"] = "text/event-stream"
        response.headers["Cache-Control"] = "no-cache"
        response.headers["X-Accel-Buffering"] = "no"

        emit = lambda do |payload|
          response.stream.write("data: #{payload.to_json}\n\n")
        end

        yield emit
      rescue StandardError => e
        Rails.logger.error("Generator error: #{e.class} — #{e.message}")
        response.stream.write("data: #{ { type: 'error', message: e.message }.to_json }\n\n")
      ensure
        response.stream.close
      end

      def set_indicator
        @indicator = Indicator.find(params[:id])
      end

      def generator_params
        params.permit(:prompt, :script_type, :name)
      end

      def complete_params
        params.permit(:prefix, :script_type, :mode)
      end

      def indicator_json(indicator)
        {
          id: indicator.id,
          name: indicator.name,
          prompt: indicator.prompt,
          script_type: indicator.script_type,
          generated_code: indicator.generated_code,
          status: indicator.status,
          metadata: indicator.metadata,
          validation: indicator.validation
        }
      end
    end
  end
end

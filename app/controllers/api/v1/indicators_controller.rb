# frozen_string_literal: true

module Api
  module V1
    class IndicatorsController < ApplicationController
      before_action :set_indicator, except: [:index]

      def index
        indicators = Indicator.order(created_at: :desc)
        render json: indicators.map { |indicator| indicator_summary(indicator) }
      end

      def show
        render json: indicator_detail(@indicator)
      end

      def update
        @indicator.update!(indicator_params)
        render json: indicator_detail(@indicator)
      end

      def destroy
        @indicator.destroy!
        head :no_content
      end

      def versions
        render json: @indicator.versions.order(version_number: :desc).map { |version| version_json(version) }
      end

      def restore_version
        Indicators::RestoreVersionService.new(
          indicator: @indicator,
          version_number: params[:version_number].to_i
        ).call
        render json: indicator_detail(@indicator)
      end

      def export
        export = Indicators::ExportService.new(indicator: @indicator).call
        send_data export[:body], filename: export[:filename], type: export[:content_type], disposition: "attachment"
      end

      def version_diff
        version = @indicator.versions.find_by!(version_number: params[:version_number].to_i)
        previous = @indicator.versions.where("version_number < ?", version.version_number).order(version_number: :desc).first
        diff = Indicators::DiffService.new(
          before_code: previous&.code.to_s,
          after_code: version.code
        ).call
        render json: {
          version: version.version_number,
          before_code: previous&.code.to_s,
          after_code: version.code,
          diff: diff
        }
      end

      private

      def set_indicator
        @indicator = Indicator.find(params[:id])
      end

      def indicator_params
        params.permit(:name, :generated_code)
      end

      def indicator_summary(indicator)
        {
          id: indicator.id,
          name: indicator.name,
          script_type: indicator.script_type,
          status: indicator.status,
          updated_at: indicator.updated_at
        }
      end

      def indicator_detail(indicator)
        indicator_summary(indicator).merge(
          prompt: indicator.prompt,
          generated_code: indicator.generated_code,
          metadata: indicator.metadata,
          validation: indicator.validation
        )
      end

      def version_json(version)
        {
          id: version.id,
          version_number: version.version_number,
          prompt_delta: version.prompt_delta,
          metadata: version.metadata,
          created_at: version.created_at
        }
      end
    end
  end
end

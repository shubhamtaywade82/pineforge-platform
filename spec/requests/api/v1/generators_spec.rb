# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Generators API", type: :request do
  describe "POST /api/v1/generators" do
    it "streams server-sent events" do
      allow(Generators::StreamService).to receive(:new) do |**_kwargs, &block|
        service = Class.new do
          define_method(:initialize) { |emitter| @emitter = emitter }
          define_method(:call) do
            @emitter.call(type: "init", indicator_id: SecureRandom.uuid)
            @emitter.call(type: "token", token: "//@version=6\n")
            @emitter.call(
              type: "done",
              validation: { passed: true, errors: [], warnings: [] }
            )
            create(:indicator)
          end
        end
        service.new(block)
      end

      post "/api/v1/generators",
           params: { prompt: "Build RSI", script_type: "indicator" },
           as: :json

      expect(response).to have_http_status(:ok)
      expect(response.media_type).to eq("text/event-stream")
      expect(response.body).to include('"type":"init"')
      expect(response.body).to include('"type":"token"')
      expect(response.body).to include('"type":"done"')
    end
  end
end

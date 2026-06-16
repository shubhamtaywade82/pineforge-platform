# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Generators complete API", type: :request do
  describe "POST /api/v1/generators/complete" do
    it "returns inline completion JSON" do
      stub_ollama_chat(model: PRIMARY_MODEL, content: "plot(close)")

      post "/api/v1/generators/complete",
           params: { prefix: "//@version=6\nindicator(\"Test\")\n", script_type: "indicator" },
           as: :json

      expect(response).to have_http_status(:ok)
      expect(json_response).to include("completion" => "plot(close)", "model_used" => PRIMARY_MODEL)
    end

    it "returns unprocessable entity when prefix is missing" do
      post "/api/v1/generators/complete", params: { script_type: "indicator" }, as: :json

      expect(response).to have_http_status(:unprocessable_entity)
      expect(json_response["error"]).to eq("prefix is required")
    end
  end
end

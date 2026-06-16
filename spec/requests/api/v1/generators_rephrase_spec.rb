# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Generators rephrase API", type: :request do
  describe "POST /api/v1/generators/rephrase" do
    it "returns rephrased prompt JSON" do
      stub_ollama_chat(
        model: PRIMARY_MODEL,
        content: "Create a Pine Script v6 strategy with EMA crossover entries and ATR-based stops."
      )

      post "/api/v1/generators/rephrase",
           params: { prompt: "ema cross with stops", script_type: "strategy" },
           as: :json

      expect(response).to have_http_status(:ok)
      expect(json_response["rephrased_prompt"]).to include("EMA")
      expect(json_response["model_used"]).to eq(PRIMARY_MODEL)
    end

    it "returns unprocessable entity when prompt is missing" do
      post "/api/v1/generators/rephrase", params: { script_type: "indicator" }, as: :json

      expect(response).to have_http_status(:unprocessable_entity)
      expect(json_response["error"]).to eq("prompt is required")
    end
  end
end

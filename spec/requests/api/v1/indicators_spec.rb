# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Indicators API", type: :request do
  let!(:indicator) { create(:indicator) }

  describe "GET /api/v1/indicators" do
    it "lists indicators" do
      get "/api/v1/indicators"

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body.first["id"]).to eq(indicator.id)
    end
  end

  describe "GET /api/v1/indicators/:id/export" do
    it "returns pine script content" do
      get "/api/v1/indicators/#{indicator.id}/export"

      expect(response).to have_http_status(:ok)
      expect(response.body).to include("//@version=6")
      expect(response.headers["Content-Disposition"]).to include(".pine")
    end
  end

  describe "POST /api/v1/indicators/:id/restore_version" do
    it "restores a previous version" do
      indicator.create_version!("//@version=6\nindicator(\"V1\")")
      indicator.create_version!("//@version=6\nindicator(\"V2\")")
      indicator.update!(generated_code: "//@version=6\nindicator(\"V2\")")

      post "/api/v1/indicators/#{indicator.id}/restore_version",
           params: { version_number: 1 },
           as: :json

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body["generated_code"]).to include("V1")
    end
  end

  describe "GET /api/v1/indicators/:id/versions/:version_number/diff" do
    it "returns a diff payload" do
      indicator.create_version!("//@version=6\nindicator(\"V1\")")
      indicator.create_version!("//@version=6\nindicator(\"V2\")")

      get "/api/v1/indicators/#{indicator.id}/versions/2/diff"

      expect(response).to have_http_status(:ok)
      expect(response.parsed_body["diff"]).to be_an(Array)
    end
  end
end

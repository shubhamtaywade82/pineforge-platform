# frozen_string_literal: true

require "rails_helper"

RSpec.describe Llm::EndpointResolver do
  before { described_class.reset_cache! }
  after { described_class.reset_cache! }

  describe ".resolve" do
    let(:cloud_client) { instance_double(Ollama::Client) }
    let(:local_client) { instance_double(Ollama::Client) }

    before do
      allow(Rails.application.config.x).to receive(:ollama_local_client).and_return(local_client)
      allow(Ollama::Client).to receive(:new).and_return(cloud_client)
    end

    def stub_env(vars)
      # Convert all keys and values to string, and remove nil values from the stubbed hash
      env_hash = ENV.to_h.merge(vars.transform_keys(&:to_s))
      vars.each do |k, v|
        if v.nil?
          env_hash.delete(k.to_s)
        else
          env_hash[k.to_s] = v.to_s
        end
      end
      stub_const("ENV", env_hash)
    end

    def mock_http_request(success:, expected_auth: nil)
      http = instance_double(Net::HTTP)
      response = success ? Net::HTTPOK.new("1.1", "200", "OK") : Net::HTTPUnauthorized.new("1.1", "401", "Unauthorized")
      
      allow(Net::HTTP).to receive(:start).and_yield(http)
      
      if expected_auth
        allow(http).to receive(:request) do |req|
          expect(req["Authorization"]).to eq("Bearer #{expected_auth}")
          response
        end
      else
        allow(http).to receive(:request).and_return(response)
      end
    end

    context "when cloud is not configured" do
      before do
        stub_env("OLLAMA_CLOUD_URL" => nil)
      end

      it "uses local client" do
        endpoint = described_class.resolve
        expect(endpoint.client).to eq(local_client)
        expect(endpoint.source).to eq("local")
      end
    end

    context "when cloud is configured but unreachable/unauthorized" do
      before do
        stub_env("OLLAMA_CLOUD_URL" => "http://cloud.ollama.test")
        mock_http_request(success: false)
      end

      it "falls back to local client and local fallback model" do
        endpoint = described_class.resolve
        expect(endpoint.client).to eq(local_client)
        expect(endpoint.model).to eq(LOCAL_FALLBACK_MODEL)
        expect(endpoint.source).to eq("local")
      end
    end

    context "when cloud is configured and reachable without keys" do
      before do
        stub_env(
          "OLLAMA_CLOUD_URL" => "http://cloud.ollama.test",
          "OLLAMA_API_KEY" => nil,
          "OLLAMA_API_KEY_ONE" => nil,
          "OLLAMA_API_KEY_TWO" => nil,
          "OLLAMA_API_KEY_THREE" => nil,
          "OLLAMA_CLOUD_API_KEYS" => nil
        )
        mock_http_request(success: true, expected_auth: nil)
      end

      it "returns cloud client and primary model" do
        endpoint = described_class.resolve(preferred_model: PRIMARY_MODEL)
        expect(endpoint.client).to eq(cloud_client)
        expect(endpoint.model).to eq(PRIMARY_MODEL)
        expect(endpoint.source).to eq("cloud")
      end
    end

    context "when multiple keys are configured" do
      before do
        stub_env(
          "OLLAMA_CLOUD_URL" => "http://cloud.ollama.test",
          "OLLAMA_API_KEY" => nil,
          "OLLAMA_API_KEY_ONE" => "key_one",
          "OLLAMA_API_KEY_TWO" => "key_two",
          "OLLAMA_API_KEY_THREE" => nil,
          "OLLAMA_CLOUD_API_KEYS" => nil
        )
      end

      it "rotates keys if the first one fails and selects the second working one" do
        # First check fails for key_one, second check succeeds for key_two
        http = instance_double(Net::HTTP)
        allow(Net::HTTP).to receive(:start).and_yield(http)

        allow(http).to receive(:request) do |req|
          if req["Authorization"] == "Bearer key_one"
            Net::HTTPUnauthorized.new("1.1", "401", "Unauthorized")
          elsif req["Authorization"] == "Bearer key_two"
            Net::HTTPOK.new("1.1", "200", "OK")
          else
            Net::HTTPServiceUnavailable.new("1.1", "503", "Error")
          end
        end

        endpoint = described_class.resolve
        expect(endpoint.client).to eq(cloud_client)
        expect(endpoint.source).to eq("cloud")
        
        # Verify it built the client with key_two
        expect(Ollama::Client).to have_received(:new) do |config_options|
          expect(config_options[:config].api_key).to eq("key_two")
        end
      end

      it "caches the working key to avoid checking failed keys repeatedly" do
        # Mock first invocation: key_one fails, key_two succeeds
        http = instance_double(Net::HTTP)
        allow(Net::HTTP).to receive(:start).and_yield(http)

        allow(http).to receive(:request) do |req|
          if req["Authorization"] == "Bearer key_one"
            Net::HTTPUnauthorized.new("1.1", "401", "Unauthorized")
          elsif req["Authorization"] == "Bearer key_two"
            Net::HTTPOK.new("1.1", "200", "OK")
          end
        end

        # Resolve once to cache key_two
        described_class.resolve

        # On the second call, it should check key_two directly (cached) and succeed, without retrying key_one
        allow(http).to receive(:request).with(
          hash_including("Authorization" => "Bearer key_two")
        ).and_return(Net::HTTPOK.new("1.1", "200", "OK"))

        expect(http).not_to receive(:request).with(
          hash_including("Authorization" => "Bearer key_one")
        )

        endpoint = described_class.resolve
        expect(endpoint.client).to eq(cloud_client)
        expect(endpoint.source).to eq("cloud")
      end
    end
  end
end

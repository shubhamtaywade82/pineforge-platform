# frozen_string_literal: true

Rails.application.routes.draw do
  get "health", to: "health#show"

  namespace :api do
    namespace :v1 do
      resources :generators, only: %i[create show] do
        collection do
          post :complete
        end
        member do
          post :refine
          post :metadata
        end
      end

      resources :indicators, only: %i[index show update destroy] do
        member do
          get :versions
          post :restore_version
          get :export
          get "versions/:version_number/diff", action: :version_diff
        end
      end
    end
  end
end

# frozen_string_literal: true

class GenerationSession < ApplicationRecord
  belongs_to :indicator
  belongs_to :user, optional: true
end

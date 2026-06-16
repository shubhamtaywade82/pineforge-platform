# frozen_string_literal: true

class IndicatorVersion < ApplicationRecord
  belongs_to :indicator

  validates :version_number, presence: true, uniqueness: { scope: :indicator_id }
  validates :code, presence: true
end

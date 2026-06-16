# frozen_string_literal: true

class Indicator < ApplicationRecord
  belongs_to :user, optional: true
  has_many :versions, class_name: "IndicatorVersion", dependent: :destroy
  has_one :generation_session, dependent: :destroy

  enum :script_type, { indicator: "indicator", strategy: "strategy", library: "library" }
  enum :status, { pending: "pending", streaming: "streaming", complete: "complete", failed: "failed" }

  validates :name, :prompt, presence: true
  validates :pine_version, inclusion: { in: %w[6] }

  before_validation :set_default_name, on: :create

  def create_version!(code, prompt_delta: nil)
    next_version = versions.maximum(:version_number).to_i + 1
    versions.create!(
      version_number: next_version,
      code: code,
      prompt_delta: prompt_delta,
      metadata: metadata
    )
  end

  private

  def set_default_name
    self.name = "Untitled #{script_type.capitalize}" if name.blank?
  end
end

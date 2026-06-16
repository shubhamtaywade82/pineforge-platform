# frozen_string_literal: true

require "rails_helper"

RSpec.describe GenerationSession, type: :model do
  subject(:session) { build(:generation_session) }

  it { is_expected.to belong_to(:indicator) }
  it { is_expected.to belong_to(:user).optional }
end

# frozen_string_literal: true

require "rails_helper"

RSpec.describe IndicatorVersion, type: :model do
  subject(:version) { build(:indicator_version) }

  it { is_expected.to belong_to(:indicator) }
  it { is_expected.to validate_presence_of(:version_number) }
  it { is_expected.to validate_presence_of(:code) }
  it { is_expected.to validate_uniqueness_of(:version_number).scoped_to(:indicator_id) }
end

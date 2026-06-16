# frozen_string_literal: true

class User < ApplicationRecord
  has_many :indicators, dependent: :nullify
  has_many :generation_sessions, dependent: :nullify

  validates :email, presence: true, uniqueness: { case_sensitive: false }
end

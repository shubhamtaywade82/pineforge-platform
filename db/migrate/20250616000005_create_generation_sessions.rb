# frozen_string_literal: true

class CreateGenerationSessions < ActiveRecord::Migration[8.1]
  def change
    create_table :generation_sessions, id: :uuid do |t|
      t.references :indicator, type: :uuid, null: false, foreign_key: true
      t.references :user, type: :uuid, foreign_key: true
      t.jsonb :messages, default: []

      t.timestamps
    end
  end
end

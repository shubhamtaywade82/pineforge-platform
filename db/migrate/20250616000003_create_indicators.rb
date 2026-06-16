# frozen_string_literal: true

class CreateIndicators < ActiveRecord::Migration[8.1]
  def change
    create_table :indicators, id: :uuid do |t|
      t.references :user, type: :uuid, foreign_key: true
      t.string :name, null: false
      t.string :script_type, null: false, default: "indicator"
      t.text :prompt, null: false
      t.text :generated_code
      t.string :pine_version, default: "6"
      t.string :model_used
      t.string :status, default: "pending"
      t.jsonb :metadata, default: {}
      t.jsonb :validation, default: {}

      t.timestamps
    end

    add_index :indicators, :script_type
    add_index :indicators, :status
    add_index :indicators, :metadata, using: :gin
  end
end

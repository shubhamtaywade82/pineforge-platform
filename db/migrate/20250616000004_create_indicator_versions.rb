# frozen_string_literal: true

class CreateIndicatorVersions < ActiveRecord::Migration[8.1]
  def change
    create_table :indicator_versions, id: :uuid do |t|
      t.references :indicator, type: :uuid, null: false, foreign_key: true
      t.integer :version_number, null: false, default: 1
      t.text :code, null: false
      t.text :prompt_delta
      t.jsonb :metadata, default: {}

      t.timestamps
    end

    add_index :indicator_versions, %i[indicator_id version_number], unique: true
  end
end

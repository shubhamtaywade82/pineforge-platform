# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_06_16_000005) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"
  enable_extension "pgcrypto"

  create_table "generation_sessions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.uuid "indicator_id", null: false
    t.jsonb "messages", default: []
    t.datetime "updated_at", null: false
    t.uuid "user_id"
    t.index ["indicator_id"], name: "index_generation_sessions_on_indicator_id"
    t.index ["user_id"], name: "index_generation_sessions_on_user_id"
  end

  create_table "indicator_versions", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.text "code", null: false
    t.datetime "created_at", null: false
    t.uuid "indicator_id", null: false
    t.jsonb "metadata", default: {}
    t.text "prompt_delta"
    t.datetime "updated_at", null: false
    t.integer "version_number", default: 1, null: false
    t.index ["indicator_id", "version_number"], name: "index_indicator_versions_on_indicator_id_and_version_number", unique: true
    t.index ["indicator_id"], name: "index_indicator_versions_on_indicator_id"
  end

  create_table "indicators", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.text "generated_code"
    t.jsonb "metadata", default: {}
    t.string "model_used"
    t.string "name", null: false
    t.string "pine_version", default: "6"
    t.text "prompt", null: false
    t.string "script_type", default: "indicator", null: false
    t.string "status", default: "pending"
    t.datetime "updated_at", null: false
    t.uuid "user_id"
    t.jsonb "validation", default: {}
    t.index ["metadata"], name: "index_indicators_on_metadata", using: :gin
    t.index ["script_type"], name: "index_indicators_on_script_type"
    t.index ["status"], name: "index_indicators_on_status"
    t.index ["user_id"], name: "index_indicators_on_user_id"
  end

  create_table "users", id: :uuid, default: -> { "gen_random_uuid()" }, force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "generation_sessions", "indicators"
  add_foreign_key "generation_sessions", "users"
  add_foreign_key "indicator_versions", "indicators"
  add_foreign_key "indicators", "users"
end

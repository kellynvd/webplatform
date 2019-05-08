# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_08_003136) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "bank_accounts", id: :serial, force: :cascade do |t|
    t.integer "account_number"
    t.integer "agency"
    t.integer "bank"
    t.integer "operation"
    t.integer "ngo_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["ngo_id"], name: "index_bank_accounts_on_ngo_id"
  end

  create_table "ngos", id: :serial, force: :cascade do |t|
    t.string "social_name"
    t.string "fantasy_name"
    t.string "phone_number1"
    t.string "phone_number2"
    t.string "email"
    t.string "site"
    t.bigint "cnpj"
    t.string "activity"
    t.date "date_start"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "description"
    t.boolean "active"
    t.string "transparency_portal"
    t.string "bank"
    t.string "agency"
    t.string "operation"
    t.string "account"
    t.string "titular"
    t.string "zipcode"
    t.string "address_number"
    t.string "address"
    t.string "neighborhood"
    t.string "city"
    t.string "state"
    t.string "payment_type"
    t.text "payment_form"
    t.text "terms_and_conditions"
  end

  create_table "ngos_users", id: false, force: :cascade do |t|
    t.bigint "ngo_id", null: false
    t.bigint "user_id", null: false
    t.index ["ngo_id"], name: "index_ngos_users_on_ngo_id"
    t.index ["user_id"], name: "index_ngos_users_on_user_id"
  end

  create_table "pets", id: :serial, force: :cascade do |t|
    t.string "name"
    t.integer "age"
    t.string "sex"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "description"
    t.boolean "active"
    t.bigint "ngo_id"
    t.index ["ngo_id"], name: "index_pets_on_ngo_id"
  end

  create_table "users", id: :serial, force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "cpf"
    t.string "phone"
    t.boolean "temporary_home"
    t.string "image"
    t.string "last_name"
    t.integer "group"
    t.string "provider"
    t.string "uid"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "bank_accounts", "ngos"
  add_foreign_key "pets", "ngos"
end

class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.string :description
      t.references :comic, null: false, foreign_key: true
      t.references :reader, null: false, foreign_key: true

      t.timestamps
    end
  end
end

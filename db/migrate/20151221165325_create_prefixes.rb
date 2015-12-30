class CreatePrefixes < ActiveRecord::Migration
  def change
    create_table :prefixes do |t|
      t.text :text
      t.references :category, index: true

      t.timestamps
    end
  end
end

class CreateSuffixes < ActiveRecord::Migration
  def change
    create_table :suffixes do |t|
      t.text :text
      

      t.timestamps
    end
  end
end

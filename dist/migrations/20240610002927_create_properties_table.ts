import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("properties", (table) => {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("slug").notNullable().unique();
    table.text("description").notNullable();
    table.string("property_type").notNullable(); // e.g., 'Condo', 'Land', 'House', 'Villa'
    table.string("transaction_type").notNullable(); // e.g., 'rent', 'purchase'
    table.string("province").notNullable(); // Province in Thailand
    table.string("city").notNullable().defaultTo("Pattaya"); // City
    table.string("district").nullable(); // District or neighborhood
    table.string("sub_district").nullable(); // Sub-district or sub-neighborhood
    table.string("address").notNullable(); // Full address
    table.string("postal_code").notNullable(); // Postal code
    table.decimal("price", 15, 2).notNullable(); // Listing price
    table.boolean("available").notNullable().defaultTo(true); // Availability status
    table.decimal("size", 15, 2).notNullable(); // Size in square meters
    table.integer("bedrooms").nullable(); // Number of bedrooms
    table.integer("bathrooms").nullable(); // Number of bathrooms
    table.integer("parking_spaces").nullable(); // Number of parking spaces
    table.string("furnishing").nullable(); // Furnishing status (e.g., 'Fully furnished', 'Unfurnished')
    table.string("thumbnail_image").nullable(); // URL to the thumbnail image
    table.json("images").nullable(); // Array of image URLs stored as JSON
    table.timestamp("date_added").defaultTo(knex.fn.now()); // Date added
    table.timestamp("date_changed").defaultTo(knex.fn.now()); // Date changed
    table.string("meta_title").nullable(); // Meta title for SEO
    table.text("meta_description").nullable(); // Meta description for SEO
    table.text("features").nullable(); // Additional features as JSON or text
    table.text("amenities").nullable(); // Property amenities (e.g., 'Pool', 'Gym')
    table.text("nearby_facilities").nullable(); // Nearby facilities (e.g., 'School', 'Hospital')
    table.integer("author_id").nullable(); // ID of the user who added the property
    table.integer("floors").nullable(); // Number of floors
    table.decimal("land_area", 15, 2).nullable(); // Land area in square meters
    table.string("telephone_number").nullable(); // Contact phone number
    table.json("facilities").nullable(); // Facilities as JSON
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("properties");
}

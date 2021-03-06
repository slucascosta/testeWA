import * as Knex from 'knex';

const tableName = 'OrderItem';

export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) return;

  await knex.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table
      .integer('orderId')
      .notNullable()
      .unsigned()
      .references('id')
      .inTable('Order')
      .onDelete('CASCADE');
    table.string('description', 128).notNullable();
    table
      .float('price')
      .unsigned()
      .notNullable();
    table
      .integer('quantity')
      .unsigned()
      .notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) await knex.schema.dropTable(tableName);
}

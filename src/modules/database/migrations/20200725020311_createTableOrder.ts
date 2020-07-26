import * as Knex from 'knex';

const tableName = 'Order';

export async function up(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) return;

  await knex.schema.createTable(tableName, table => {
    table.increments('id').primary();
    table
      .dateTime('createdDate')
      .notNullable()
      .defaultTo(knex.fn.now());
    table.string('description', 64).notNullable();
    table
      .integer('total')
      .notNullable()
      .defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<any> {
  if (await knex.schema.hasTable(tableName)) await knex.schema.dropTable(tableName);
}

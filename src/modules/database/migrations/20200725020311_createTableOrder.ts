import * as Knex from 'knex';

const tableName = 'Order';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTableIfNotExists(tableName, table => {
    table.increments('id').primary();
    table
      .dateTime('createdDate')
      .notNullable()
      .defaultTo(knex.fn.now());
    table.integer('total').notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTableIfExists(tableName);
}

import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('client_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('clients')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE')

      table
        .integer('gateway_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('gateways')
        .onDelete('SET NULL')
        .onUpdate('CASCADE')

      table.string('external_id', 255).nullable()

      table
        .enum('status', ['PENDING', 'APPROVED', 'FAILED', 'REFUNDED'])
        .notNullable()
        .defaultTo('PENDING')

      table.decimal('amount', 12, 2).notNullable()
      table.string('card_last_numbers', 4).nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.index(['client_id'])
      table.index(['gateway_id'])
      table.index(['status'])
      table.index(['external_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}

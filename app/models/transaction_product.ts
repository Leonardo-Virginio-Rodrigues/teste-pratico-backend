import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

import Transaction from '#models/transaction'
import Product from '#models/product'

export default class TransactionProduct extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'transaction_id' })
  declare transactionId: number

  @column({ columnName: 'product_id' })
  declare productId: number

  @column()
  declare quantity: number

  @column({
    columnName: 'unit_amount',
    consume: (value) => Number(value),
  })
  declare unitAmount: number

  @column({
    columnName: 'total_amount',
    consume: (value) => Number(value),
  })
  declare totalAmount: number

  @column.dateTime({
    columnName: 'created_at',
    autoCreate: true,
  })
  declare createdAt: DateTime

  @column.dateTime({
    columnName: 'updated_at',
    autoCreate: true,
    autoUpdate: true,
  })
  declare updatedAt: DateTime

  @belongsTo(() => Transaction)
  declare transaction: BelongsTo<typeof Transaction>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>
}

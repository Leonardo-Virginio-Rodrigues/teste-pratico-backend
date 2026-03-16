import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import Client from '#models/client'
import Gateway from '#models/gateway'
import TransactionProduct from '#models/transaction_product'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'client_id' })
  declare clientId: number

  @column({ columnName: 'gateway_id' })
  declare gatewayId: number | null

  @column({ columnName: 'external_id' })
  declare externalId: string | null

  @column()
  declare status: 'PENDING' | 'APPROVED' | 'FAILED' | 'REFUNDED'

  @column({
    consume: (value) => Number(value),
  })
  declare amount: number

  @column({ columnName: 'card_last_numbers' })
  declare cardLastNumbers: string | null

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

  /* RELATIONSHIPS */

  @belongsTo(() => Client)
  declare client: BelongsTo<typeof Client>

  @belongsTo(() => Gateway)
  declare gateway: BelongsTo<typeof Gateway>

  @hasMany(() => TransactionProduct)
  declare products: HasMany<typeof TransactionProduct>
}

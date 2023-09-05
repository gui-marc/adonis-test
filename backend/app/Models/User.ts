import { DateTime } from 'luxon'
import { HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import FriendRequest from './FriendRequest'
import AppBaseModel from './AppBaseModel'

export default class User extends AppBaseModel {
  @hasMany(() => FriendRequest, { foreignKey: 'sender_id' })
  public sentFriendRequests: HasMany<typeof FriendRequest>

  @hasMany(() => FriendRequest, { foreignKey: 'receiver_id' })
  public receivedFriendRequests: HasMany<typeof FriendRequest>

  @column({ isPrimary: true })
  public id: number

  @column()
  public fullName: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

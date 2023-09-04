import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export enum FriendRequestStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export default class FriendRequest extends BaseModel {
  @hasOne(() => User, { foreignKey: 'id' })
  public sender: HasOne<typeof User>

  @hasOne(() => User, { foreignKey: 'id' })
  public receiver: HasOne<typeof User>

  @column({ isPrimary: true })
  public id: number

  @column()
  public senderId: number

  @column()
  public receiverId: number

  @column()
  public status: FriendRequestStatus = FriendRequestStatus.PENDING

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}

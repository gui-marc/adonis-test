import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Friend from 'App/Models/Friend'

export default class FriendsController {
  constructor(protected ctx: HttpContextContract) {}

  public async index({ auth }: HttpContextContract) {
    const user = auth.user!

    const friendResponse = await Friend.query()
      .preload('sender')
      .preload('receiver')
      .where('sender_id', user.id)
      .orWhere('receiver_id', user.id)
      .select('id', 'sender_id', 'receiver_id')

    return friendResponse.map((friend) => {
      if (friend.senderId === user.id) {
        return friend.receiver
      }
      return friend.sender
    })
  }
}

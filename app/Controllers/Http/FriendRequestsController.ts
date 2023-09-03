import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Friend from 'App/Models/Friend'
import FriendRequest, { FriendRequestStatus } from 'App/Models/FriendRequest'

export default class FriendRequestsController {
  constructor(protected ctx: HttpContextContract) {}

  public async received({ auth }: HttpContextContract) {
    const user = auth.user!
    return await FriendRequest.query().where('receiver_id   ', user.id).preload('sender')
  }

  public async sent({ auth }: HttpContextContract) {
    const user = auth.user!
    return await FriendRequest.query().where('sender_id', user.id).preload('receiver')
  }

  public async create({ auth, params, response }: HttpContextContract) {
    const user = auth.user!

    if (user.id === Number(params.receiverId)) {
      return response.badRequest('Cannot send friend request to yourself')
    }

    const existingRequest = await FriendRequest.query()
      .where('sender_id', user.id)
      .where('receiver_id', params.receiverId)
      .where('status', FriendRequestStatus.PENDING)
      .orWhere('status', FriendRequestStatus.ACCEPTED)
      .first()

    if (existingRequest) {
      return response.badRequest('Friend request already sent')
    }

    const friendRequest = await FriendRequest.create({
      senderId: user.id,
      receiverId: params.receiverId,
    })

    return friendRequest
  }

  public async accept({ auth, params }: HttpContextContract) {
    const user = auth.user!

    const friendRequest = await FriendRequest.query()
      .where('sender_id', params.senderId)
      .where('receiver_id', user.id)
      .where('status', FriendRequestStatus.PENDING)
      .firstOrFail()

    friendRequest.status = FriendRequestStatus.ACCEPTED

    await friendRequest.save()

    await Friend.create({
      senderId: friendRequest.senderId,
      receiverId: friendRequest.receiverId,
    })

    return friendRequest
  }

  public async reject({ auth, params }: HttpContextContract) {
    const user = auth.user!

    const friendRequest = await FriendRequest.query()
      .where('sender_id', params.senderId)
      .where('receiver_id', user.id)
      .where('status', FriendRequestStatus.PENDING)
      .firstOrFail()

    friendRequest.status = FriendRequestStatus.REJECTED

    await friendRequest.save()

    return friendRequest
  }

  public async cancel({ auth, params }: HttpContextContract) {
    const user = auth.user!

    const friendRequest = await FriendRequest.query()
      .where('sender_id', user.id)
      .where('receiver_id', params.receiverId)
      .where('status', FriendRequestStatus.PENDING)
      .firstOrFail()

    await friendRequest.delete()

    return friendRequest
  }
}

import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Friend from 'App/Models/Friend'
import FriendRequest, { FriendRequestStatus } from 'App/Models/FriendRequest'
import Ws from 'App/Services/Ws'
import { WebsocketEvents } from 'Constants/ws'

export default class FriendRequestsController {
  constructor(protected ctx: HttpContextContract) {}

  public async received({ auth }: HttpContextContract) {
    const user = auth.user!
    return await FriendRequest.query().where('receiver_id', user.id).preload('sender')
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
      .where('status', [FriendRequestStatus.PENDING, FriendRequestStatus.ACCEPTED])
      .first()

    if (existingRequest) {
      return response.badRequest('Friend request already sent')
    }

    const friendRequest = await FriendRequest.create({
      senderId: user.id,
      receiverId: params.receiverId,
    })

    const friendRequestForReceiver = await FriendRequest.query()
      .preload('sender')
      .where('id', friendRequest.id)
      .firstOrFail()

    await Ws.io
      .to(`user:${friendRequest.receiverId}`)
      .emit(WebsocketEvents.FriendRequestReceived, friendRequestForReceiver)

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

    const friendRequestForSender = await FriendRequest.query()
      .preload('receiver')
      .where('id', friendRequest.id)
      .firstOrFail()

    await Ws.io
      .to(`user:${friendRequest.senderId}`)
      .emit(WebsocketEvents.FriendRequestAccepted, friendRequestForSender)

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

    const friendRequestForSender = await FriendRequest.query()
      .preload('receiver')
      .where('id', friendRequest.id)
      .firstOrFail()

    await Ws.io
      .to(`user:${friendRequest.senderId}`)
      .emit(WebsocketEvents.FriendRequestRejected, friendRequestForSender)

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

    const friendRequestForReceiver = await FriendRequest.query()
      .preload('sender')
      .where('id', friendRequest.id)
      .firstOrFail()

    await Ws.io
      .to(`user:${friendRequest.receiverId}`)
      .emit(WebsocketEvents.FriendRequestCanceled, friendRequestForReceiver)

    return friendRequest
  }
}

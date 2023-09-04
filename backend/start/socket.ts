import Ws from 'App/Services/Ws'
import { authenticateSocket } from 'Utils/ws-auth'
import { WebsocketEvents } from 'Constants/ws'

Ws.boot()

/**
 * Listen for incomming socket connections
 */
Ws.io.on(WebsocketEvents.Connection, async (socket) => {
  try {
    const user = await authenticateSocket(socket)
    // Join user to their own private room
    await socket.join(`user:${user.id}`)
    await socket.emit(WebsocketEvents.Authenticated, { user })
  } catch (error) {
    await socket.emit('error', error)
    await socket.disconnect()
  }
})

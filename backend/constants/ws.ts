export enum WebsocketEvents {
  // General
  Connection = 'connection',
  Disconnect = 'disconnect',
  Error = 'error',
  Authenticated = 'authenticated',
  // Friend Requests
  FriendRequestReceived = 'friend-request:received',
  FriendRequestAccepted = 'friend-request:accepted',
  FriendRequestRejected = 'friend-request:rejected',
  FriendRequestCanceled = 'friend-request:canceled',
}

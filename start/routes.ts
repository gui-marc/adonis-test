/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('users', 'UsersController').apiOnly()

  Route.group(() => {
    Route.get('logout', 'AuthController.logout').middleware('auth')
    Route.get('refresh', 'AuthController.refresh').middleware('auth')
    Route.get('test', async () => ({ message: 'Hello world' })).middleware('auth')

    Route.post('login', 'AuthController.login')
  }).prefix('auth')

  // Protected routes
  Route.group(() => {
    Route.group(() => {
      Route.get('sent', 'FriendRequestsController.sent')
      Route.get('received', 'FriendRequestsController.received')

      Route.post(':receiverId', 'FriendRequestsController.create')
      Route.delete(':receiverId/cancel', 'FriendRequestsController.cancel')

      Route.post(':senderId/accept', 'FriendRequestsController.accept')
      Route.post(':senderId/reject', 'FriendRequestsController.reject')
    }).prefix('friend-requests')

    Route.get('friends', 'FriendsController.index')
  }).middleware('auth')
}).prefix('api')

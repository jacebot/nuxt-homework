'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.group(() => {
  Route.post('login', 'Auth/AuthenticationController.login')
  Route.post('register', 'Auth/AuthenticationController.register')
  Route.get('me', 'Auth/AuthenticationController.me').middleware(['auth'])
  Route.post('list/posts', 'Post/PostController.list')
  Route.post('post/details', 'Post/PostController.details')
  Route.post('post/create', 'Post/PostController.createPost').middleware(['auth'])
  Route.post('comment/create', 'Post/PostController.createComment').middleware(['auth'])
}).prefix('api')

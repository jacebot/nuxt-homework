'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
 const Factory = use('Factory')
 const Hash = use('Hash')

 Factory.blueprint('App/Models/User', async (faker) => {
   return {
    username: faker.username(),
    email: faker.email(),
    password: await Hash.make(faker.password())
   }
 })

 Factory.blueprint('App/Models/Post', async (faker) => {
   return {
    title: faker.sentence(),
    body: faker.paragraph(),
    slug: 'a_question'
   }
 })

 Factory.blueprint('App/Models/Comment', async (faker) => {
   return {
    body: faker.sentence(),
    rank: faker.integer({ min: 0, max: 20 })
   }
 })

 Factory.blueprint('App/Models/Tag', async (faker) => {
   return {
    name: faker.animal({type: 'farm'})
   }
 })

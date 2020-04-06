'use strict'

/*
|--------------------------------------------------------------------------
| DatabaseSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const User = use('App/Models/User')
const Post = use('App/Models/Post')

class DatabaseSeeder {
  async run () {

    await Factory.model('App/Models/User').create()
    const User_1 = await User.find(1)

    const post_model_1 = await Factory.model('App/Models/Post').make()
    const post_model_2 = await Factory.model('App/Models/Post').make()
    const post_model_3 = await Factory.model('App/Models/Post').make()
    const post_model_4 = await Factory.model('App/Models/Post').make()
    const post_model_5 = await Factory.model('App/Models/Post').make()

    await User_1.posts().save(post_model_1)
    await User_1.posts().save(post_model_2)
    await User_1.posts().save(post_model_3)
    await User_1.posts().save(post_model_4)
    await User_1.posts().save(post_model_5)

    const Post_1 = await Post.find(1)
    const Post_2 = await Post.find(2)
    const Post_3 = await Post.find(3)
    const Post_4 = await Post.find(4)
    const Post_5 = await Post.find(5)

    const comment_model_1 = await Factory.model('App/Models/Comment').make()
    const comment_model_2 = await Factory.model('App/Models/Comment').make()
    const comment_model_3 = await Factory.model('App/Models/Comment').make()
    const comment_model_4 = await Factory.model('App/Models/Comment').make()
    const comment_model_5 = await Factory.model('App/Models/Comment').make()

    const tag_model_1 = await Factory.model('App/Models/Tag').make()
    const tag_model_2 = await Factory.model('App/Models/Tag').make()
    const tag_model_3 = await Factory.model('App/Models/Tag').make()
    const tag_model_4 = await Factory.model('App/Models/Tag').make()
    const tag_model_5 = await Factory.model('App/Models/Tag').make()

    await Post_1.comments().save(comment_model_1)
    await Post_2.comments().save(comment_model_2)
    await Post_3.comments().save(comment_model_3)
    await Post_4.comments().save(comment_model_4)
    await Post_5.comments().save(comment_model_5)

    await Post_1.tags().save(tag_model_1)
    await Post_2.tags().save(tag_model_2)
    await Post_3.tags().save(tag_model_3)
    await Post_4.tags().save(tag_model_4)
    await Post_5.tags().save(tag_model_5)
  }
}

module.exports = DatabaseSeeder

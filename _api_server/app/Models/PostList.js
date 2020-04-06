'use strict'

const Model = use('Model')
const Database = use('Database')

class PostList extends Model {
  async list () {
    return await Database.select('*').from('posts')
  }
}

module.exports = PostList

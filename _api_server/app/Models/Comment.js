'use strict'

const Model = use('Model')

class Comment extends Model {
  static get visible () {
    return ['body', 'rank']
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  post() {
    return this.belongsTo('App/Models/Post')
  }
}

module.exports = Comment

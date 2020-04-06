'use strict'

const Model = use('Model')

class Tag extends Model {
  static get visible () {
    return ['name']
  }
}

module.exports = Tag

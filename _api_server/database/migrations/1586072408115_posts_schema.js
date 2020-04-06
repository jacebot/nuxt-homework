'use strict'

const Schema = use('Schema')

class PostSchema extends Schema {
  up () {
    this.create('posts', (table) => {
      table.increments()
      table.string('title', 255)
      table.text('body')
      table.integer('user_id').references('id').inTable('users')
      table.text('slug')
      table.timestamps()
    })

    this.create('tags', (table) => {
      table.increments()
      table.integer('post_id').references('id').inTable('posts')
      table.string('name', 255)
      table.timestamps()
    })

    this.create('comments', (table) => {
      table.increments()
      table.text('body')
      table.integer('post_id').references('id').inTable('posts')
      table.integer('rank')
      table.timestamps()
    })
  }

  down () {
    this.drop('posts')
    this.drop('tags')
    this.drop('comments')
  }
}

module.exports = PostSchema

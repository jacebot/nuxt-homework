'use strict'

const Model = use('Model')

class Post extends Model {
  static boot() {
    super.boot()

    async function slugifyTitle(str) {
      return await str
        .trim()
        .split(/(?=[A-Z\-.,'`" ])/gm)
        .filter((i) => i !== ' ')
        .map((i) => i.replace(/[_\- ]/, ''))
        .join('_')
        .toLowerCase()
    }

    this.addHook('beforeSave', async (postInstance) => {
      if (postInstance.title.length > 0) {
        postInstance.slug = await slugifyTitle(postInstance.title)
      }
    })
  }

  user() {
    return this.belongsTo('App/Models/User')
  }

  comments() {
    return this.hasMany('App/Models/Comment')
  }

  tags() {
    return this.hasMany('App/Models/Tag')
  }
}

module.exports = Post

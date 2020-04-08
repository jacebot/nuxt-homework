'use strict'

const Post = use('App/Models/Post')
const Comment = use('App/Models/Comment')
const User = use('App/Models/User')
const Database = use('Database')

class PostController {
  async createPost({ request, response }) {
    const postData = request.only(['title', 'body', 'user_id'])

    try {
      const post = await Post.create(postData)

      return response.json({
        status: 'success',
        postId: post.id,
        postSlug: post.slug
      })
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message: 'There was a problem creating a post, please try again later.'
      })
    }
  }

  async createComment({ request, response }) {
    const commentData = request.only(['body', 'post_id', 'rank'])

    try {
      const comment = await Comment.create(commentData)

      return response.json({
        status: 'success',
        commentId: comment.id
      })
    } catch (error) {
      response.status(400).json({
        status: 'error',
        message:
          'There was a problem creating a comment, please try again later.'
      })
    }
  }

  async details({ request, response }) {
    const { id } = request.only(['id'])

    const post = await Post.find(id)
    const user = await User.find(post.user_id)

    const tags = await post.tags().fetch()
    const comments = await post
      .comments()
      .orderBy('rank', 'desc')
      .fetch()

    post.tags = tags
    post.comments = comments
    post.user_id = user.username

    return response.json({
      status: 'success',
      post
    })
  }

  async list({ request, response }) {
    const { id } = request.only(['id'])
    const tagArray = []
    // TODO: Optimize this query or use the ORM better...
    const data = await Database.select('*')
      .from('posts')
      .forPage(id || 1, 5)
    const tagsData = await Database.select('*').from('tags')
    const commentsData = await Database.select('*').from('comments')

    for (const post of data) {
      const user = await User.find(post.user_id)

      post.tags = []
      post.highestRatedComment = {}
      post.user_id = user.username

      for (const tag of tagsData) {
        if (post.id === tag.post_id) {
          post.tags = [...post.tags, tag.name]
        }
      }

      for (const comment of commentsData) {
        let maxRank = 0

        if (post.id === comment.post_id && comment.rank >= maxRank) {
          maxRank = comment.rank

          post.highestRatedComment = {
            body: comment.body,
            rank: comment.rank
          }
        }
      }
    }

    for (const tag of tagsData) {
      tagArray.push(tag.name)
    }

    return response.json({
      status: 'success',
      list: data,
      tags: [...new Set(tagArray)]
    })
  }
}

module.exports = PostController

<template>
  <li v-if="post" class="post">
    <nuxt-link
      :to="{
        path: `answer/${post.id}/${post.slug}`,
        params: { id: post.id }
      }"
      ><h3 class="title">
        {{ truncate ? truncatedTitle : post.title }}<br />
        <small
          >Question By: {{ post.user_id ? post.user_id : '' }} at
          {{ post.created_at }}</small
        >
      </h3>
      <p class="postBody">
        {{ truncate ? truncatedBody : post.body }}
      </p>
      <hr />
      <Comment :comment="post.highestRatedComment" :truncate="truncate" />
    </nuxt-link>
  </li>
</template>

<script>
import Comment from '~/components/Comment.vue'

export default {
  name: 'PostLink',
  components: {
    Comment
  },
  props: ['post', 'truncate'],
  computed: {
    truncatedTitle() {
      const newTitle = this.post.title.substring(0, 48)
      const spaceIndex = newTitle.lastIndexOf(' ')
      newTitle.substring(0, spaceIndex)
      return newTitle.length < 48 ? newTitle : newTitle + '...'
    },
    truncatedBody() {
      const newBody = this.post.body.substring(0, 48)
      const spaceIndex = newBody.lastIndexOf(' ')
      newBody.substring(0, spaceIndex)
      return newBody.length < 48 ? newBody : newBody + '...'
    }
  }
}
</script>

<style>
.post {
  padding: 10px;
  margin: 1% 0;
  border: 1px solid #ddd;
  border-radius: 3px;
  text-align: left;
  width: 100%;
}
h3.title {
  font-size: 1.3rem;
  font-weight: bold;
  margin: 0;
}
.postBody {
  display: block;
  font-size: 0.9rem;
  margin: 12px 0;
}
</style>

<template>
  <li v-if="post" class="post">
    <nuxt-link
      :to="{
        path: `answer/${post.id}/${post.slug}`,
        params: { id: post.id }
      }"
      ><h3 class="title">
        {{ post.title }}<br />
        <small>{{ post.created_at }}</small>
      </h3>
      <p class="postBody">{{ post.body }}</p>
      <hr />
      <Comment :comment="post.highestRatedComment" />
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
  props: ['post']
}
</script>

<style>
.post {
  padding: 10px;
  margin: 1% 0;
  border: 1px solid #ddd;
  border-radius: 3px;
  width: 46%;
  text-align: left;
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

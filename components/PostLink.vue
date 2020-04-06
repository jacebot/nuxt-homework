<template>
  <li>
    <nuxt-link
      :to="{
        path: `answer/${post.id}/${post.slug}`,
        params: { id: post.id }
      }"
      ><h3>
        {{ post.title }}<br />
        <small>{{ post.created_at }}</small>
      </h3>
      <p>{{ post.body }}</p>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'PostLink',
  props: ['post']
}
</script>

<style></style>

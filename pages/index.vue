<template>
  <div>
    <div class="container">
      <div>
        <logo />
        <h1 class="title">
          qa-app
        </h1>
        <h2 class="subtitle">
          My praiseworthy Nuxt.js project
        </h2>
        <div>
          <ul v-if="posts.length">
            <PostLink v-for="post in posts" :key="post.id" :post="post" />
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
import PostLink from '~/components/PostLink.vue'

export default {
  components: {
    Logo,
    PostLink
  },
  data() {
    return {
      posts: []
    }
  },

  mounted() {
    this.getPosts()
  },

  methods: {
    async getPosts() {
      try {
        await this.$axios
          .post('list/posts')
          .then((res) => {
            this.posts = [...res.data.list]
          })
          .catch((err) => {
            console.log(err)
          })
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

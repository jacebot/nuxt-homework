<template>
  <div>
    <h1>{{ details.title }}</h1>
    <p>{{ details.body }}</p>
    <Comment
      v-for="comment in details.comments"
      :key="comment.$index"
      :comment="comment"
    />
  </div>
</template>

<script>
import Comment from '~/components/Comment.vue'

export default {
  props: ['id'],
  components: {
    Comment
  },
  data() {
    return {
      details: {}
    }
  },
  mounted() {
    console.log(this._props, this.$route)
    this.getPost()
  },
  methods: {
    async getPost() {
      const apiRequest = { id: Number(this.$route.params.id) }

      try {
        await this.$axios
          .post('post/details', apiRequest)
          .then((res) => {
            this.details = res.data.post
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

<style></style>

_

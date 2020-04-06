<template>
  <div class="container">
    <h1 class="title">
      {{ type !== 'comment' ? 'Question' : 'Answer' }}
    </h1>
    <div class="content">
      <div v-if="errors.length">
        <p>
          <b>Please correct the following error(s):</b>
        </p>
        <ul>
          <li vfor="error in errors">{{ error }}</li>
        </ul>
      </div>
      <form name="contact">
        <div v-if="type !== 'comment'">
          <label class="form-label" for="title">
            Title:
          </label>
          <input id="title" class="form-field" name="title" v-model="title" />
        </div>
        <label class="form-label" for="message">
          Message:
        </label>
        <textarea
          class="form-field"
          name="message"
          id="message"
          v-model="message"
        ></textarea>
        <input class="pure-button" @click="checkForm" value="Send message" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type', 'pid'],
  data() {
    return {
      errors: [],
      title: null,
      message: null
    }
  },
  methods: {
    async checkForm(e) {
      const route = this.type !== 'comment' ? 'post/create' : 'comment/create'

      const apiRequest = {
        body: this.message
      }

      if (this.type !== 'comment') {
        apiRequest.title = this.title
      } else {
        apiRequest.post_id = this.pid
      }

      try {
        await this.$axios
          .post(route, apiRequest)
          .then((res) => {
            if (res.data.postId > 0) {
              this.$route.push(`/answer/${res.data.postId}`)
            }
            if (res.data.commentId) {
              // TODO: Update comments via vuex
            }
          })
          .catch((err) => {
            console.log(err)
          })
      } catch (e) {
        this.errors.push(e.response.data.message)
      }
    }
  }
}
</script>

<style></style>

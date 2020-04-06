<template>
  <div class="form-container">
    <h3 class="title">
      {{ type !== 'comment' ? 'Ask A Question' : 'Submit An Answer' }}
    </h3>
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
  props: ['type', 'pid', 'uid', 'slug'],
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
        apiRequest.user_id = this.uid
      } else {
        apiRequest.post_id = this.pid
        apiRequest.rank = 0
      }

      try {
        await this.$axios
          .post(route, apiRequest)
          .then(async (res) => {
            const { postId, postSlug, status } = await res.data

            if (status === 'success') {
              this.$router.push({
                path: `/answer/${postId || this.pid}/${postSlug || this.slug}`,
                params: { id: res.data.postId }
              })
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

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
}

form {
  display: flex;
}
</style>

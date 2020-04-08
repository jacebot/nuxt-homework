<template>
  <div class="form-container">
    <h3 class="form-title">
      {{ type !== 'comment' ? 'Ask A Question' : 'Submit An Answer' }}
    </h3>
    <form name="contact">
      <div v-if="errors.length">
        <p>
          <b>Please correct the following error(s):</b>
        </p>
        <ul>
          <li vfor="error in errors">{{ error }}</li>
        </ul>
      </div>
      <div v-if="type !== 'comment'">
        <label class="form-label" for="question">
          Title:
          <input
            id="question"
            v-model="title"
            class="form-field"
            name="question"
          />
        </label>
      </div>
      <label class="form-label" for="message">
        Message:
        <textarea
          id="message"
          v-model="message"
          class="form-field"
          name="message"
        ></textarea>
      </label>
      <input
        value="Send message"
        type="submit"
        class="pure-button submit"
        @click="checkForm"
      />
    </form>
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
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  border: solid 1px rgb(17, 9, 59);
  background: rgb(43, 24, 151);
  color: rgb(218, 163, 63);
}

.form-title {
  margin: 12px;
}

.form-label {
  display: flex;
  align-content: center;
  align-items: center;
}

form {
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  flex: 1;
}

#message,
#question {
  margin: 12px auto;
  margin-left: 12px;
}

#message {
  min-height: 54px;
}

.submit {
  margin: 12px 0;
}
</style>

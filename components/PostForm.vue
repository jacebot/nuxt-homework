<template>
  <div class="form-container">
    <div v-if="loggedInUser" name="contact" class="pure-form pure-form-stacked">
      <fieldset>
        <legend>
          <h3 class="form-title">
            {{ type !== 'comment' ? 'Ask A Question' : 'Submit An Answer' }}
          </h3>
        </legend>
        <div v-if="errors.length">
          <p>
            <b>Please correct the following error(s):</b>
          </p>
          <ul>
            <li vfor="error in errors">{{ error }}</li>
          </ul>
        </div>
        <div class="pure-g">
          <div
            v-if="type !== 'comment'"
            class="pure-u-1 pure-u-lg-1-2 form-col"
          >
            <label class="form-label" for="question">
              Title:
            </label>
            <input
              id="question"
              v-model="title"
              class="form-field pure-input-1"
              name="question"
            />
          </div>
          <div class="pure-u-1 pure-u-lg-1-2 form-col">
            <label class="form-label" for="message">
              Comment:
            </label>
            <textarea
              id="message"
              v-model="message"
              class="form-field pure-input-1"
              name="message"
            ></textarea>
          </div>
          <div class="pure-u-1 form-button">
            <button
              class="pure-button pure-button-warning submit"
              @click="checkForm"
            >
              Submit {{ type !== 'comment' ? 'Question' : 'Answer' }}
            </button>
          </div>
        </div>
      </fieldset>
    </div>
    <template v-else>
      <h3 class="form-title">
        Please <nuxt-link to="/register">register</nuxt-link> or
        <nuxt-link to="/login">login</nuxt-link> to&nbsp;
        {{ type !== 'comment' ? 'Ask A Question' : 'Submit An Answer' }}
      </h3>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: ['type', 'pid', 'uid', 'slug'],
  data() {
    return {
      errors: [],
      title: null,
      message: null
    }
  },
  computed: {
    ...mapGetters(['loggedInUser'])
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

            if (status === 'success' && this.type !== 'comment') {
              this.$router.push({
                path: `/answer/${postId || this.pid}/${postSlug || this.slug}`,
                params: { id: res.data.postId }
              })
            } else {
              this.$router.go()
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
  border: solid 1px rgb(17, 9, 59);
  background: rgb(43, 24, 151);
  color: rgb(233, 200, 92);
  padding: 12px;
}

.form-container a {
  color: rgb(241, 147, 59);
}

.pure-form legend .form-title {
  margin: 12px;
  color: rgb(218, 163, 63);
}

.form-col {
  padding-right: 6px;
}

.pure-button-warning {
  color: rgb(43, 24, 151);
  background: rgb(218, 163, 63);
}

.form-button {
  text-align: left;
  padding: 6px 0;
}

.form-label {
  display: flex;
  align-content: center;
  align-items: center;
}

#message {
  min-height: 54px;
}

#message,
#question {
  color: #000;
}
</style>

<template>
  <section class="section">
    <div class="container">
      <div class="pure-g">
        <div class="pure-u-1">
          <h2 class="title">Register!</h2>
        </div>
        <div class="pure-u-1">
          <Notification v-if="error" :message="error" />

          <form
            class="pure-form pure-form-aligned"
            method="post"
            @submit.prevent="register"
          >
            <fieldset>
              <div class="pure-control-group">
                <label for="name">Username</label>
                <input
                  id="name"
                  v-model="username"
                  type="text"
                  placeholder="Username"
                  required
                />
                <span class="pure-form-message-inline"
                  >This is a required field.</span
                >
              </div>

              <div class="pure-control-group">
                <label class="label">Email</label>

                <input
                  v-model="email"
                  type="email"
                  class="input"
                  name="email"
                  required
                />
                <span class="pure-form-message-inline"
                  >This is a required field.</span
                >
              </div>
              <div class="pure-control-group">
                <label class="label">Password</label>

                <input
                  v-model="password"
                  type="password"
                  class="input"
                  name="password"
                  required
                />
                <span class="pure-form-message-inline"
                  >This is a required field.</span
                >
              </div>
              <button type="submit" class="pure-button pure-button-primary">
                Register
              </button>
            </fieldset>
          </form>
          <div style="margin-top: 20px">
            Already got an account? <nuxt-link to="/login">Login</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Notification from '~/components/Notification'

export default {
  middleware: 'guests',
  components: {
    Notification
  },

  data() {
    return {
      username: '',
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async register() {
      try {
        await this.$axios.post('register', {
          username: this.username,
          email: this.email,
          password: this.password
        })

        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password
          }
        })

        this.$router.push('/')
      } catch (e) {
        this.error = e.response.data.message
      }
    }
  }
}
</script>

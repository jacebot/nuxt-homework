<template>
  <section class="section">
    <div class="container">
      <div class="pure-g">
        <div class="pure-u-1">
          <h2 class="title has-text-centered">Welcome back!</h2>
        </div>
        <div class="pure-u-1">
          <Notification v-if="error" :message="error" />

          <form class="pure-form" method="post" @submit.prevent="login">
            <fieldset>
              <input v-model="email" type="email" class="input" name="email" />
              <input
                v-model="password"
                type="password"
                class="input"
                name="password"
              />

              <button type="submit" class="pure-button pure-button-primary">
                Log In
              </button>
            </fieldset>
          </form>
          <div style="margin-top: 20px">
            <p>
              Don't have an account?
              <nuxt-link to="/register">Register</nuxt-link>
            </p>
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
      email: '',
      password: '',
      error: null
    }
  },

  methods: {
    async login() {
      try {
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

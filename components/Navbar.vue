<template>
  <div
    id="menu"
    class="custom-wrapper pure-g"
    :class="[showMenu ? 'open' : '']"
  >
    <div class="pure-u-1 pure-u-md-1-3">
      <div class="pure-menu">
        <a href="/" class="pure-menu-heading custom-brand">Brand</a>
        <a
          id="toggle"
          href="#"
          class="custom-toggle"
          :class="[showMenu ? 'x' : '']"
          @click="showMenu = !showMenu"
          ><s class="bar"></s><s class="bar"></s
        ></a>
      </div>
    </div>
    <div class="pure-u-1 pure-u-md-1-3">
      <div class="pure-menu custom-can-transform">
        <ul class="pure-menu-list">
          <li class="pure-menu-item">
            <a href="/" class="pure-menu-link">Home</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="pure-u-1 pure-u-md-1-3">
      <div class="pure-menu custom-can-transform">
        <ul class="pure-menu-list">
          <template v-if="isAuthenticated">
            <li class="pure-menu-item">
              <nuxt-link class="pure-menu-link" to="/profile"
                >My Profile</nuxt-link
              >
            </li>
            <li class="pure-menu-item">
              <a class="pure-menu-link" @click="logout">Logout</a>
            </li>
          </template>
          <template v-else>
            <li class="pure-menu-item">
              <nuxt-link class="pure-menu-link" to="/register"
                >Register</nuxt-link
              >
            </li>
            <li class="pure-menu-item">
              <nuxt-link class="pure-menu-link" to="/login">Log In</nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      showMenu: false
    }
  },
  computed: {
    classObject() {
      return {
        open: this.showMenu
      }
    },
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  watch: {
    $route() {
      this.showMenu = false
    }
  },
  mounted() {
    const WINDOW_CHANGE_EVENT =
      // eslint-disable-next-line prettier/prettier
      'onorientationchange' in window ? 'orientationchange' : 'resize'
    window.addEventListener(WINDOW_CHANGE_EVENT, this.closeMenu)
  },
  destroyed() {
    const WINDOW_CHANGE_EVENT =
      // eslint-disable-next-line prettier/prettier
      'onorientationchange' in window ? 'orientationchange' : 'resize'
    window.removeEventListener(WINDOW_CHANGE_EVENT, this.closeMenu)
  },
  methods: {
    closeMenu() {
      const menu = document.getElementById('menu')

      if (menu.classList.contains('open')) {
        this.showMenu = false
      }
    },
    async logout() {
      await this.$auth.logout()
    }
  }
}
</script>

<style>
.custom-wrapper {
  background-color: #ffd390;
  margin-bottom: 1em;
  height: 2.1em;
  overflow: hidden;
  transition: height 0.5s;
}

.custom-wrapper.open {
  height: 14em;
}

.custom-menu-3 {
  text-align: right;
}

.custom-toggle {
  width: 34px;
  height: 34px;
  position: absolute;
  top: 0;
  right: 0;
  display: none;
}

.custom-toggle .bar {
  background-color: #777;
  display: block;
  width: 20px;
  height: 2px;
  border-radius: 100px;
  position: absolute;
  top: 18px;
  right: 7px;
  transition: all 0.5s;
}

.custom-toggle .bar:first-child {
  transform: translateY(-6px);
}

.custom-toggle.x .bar {
  transform: rotate(45deg);
}

.custom-toggle.x .bar:first-child {
  transform: rotate(-45deg);
}

@media (max-width: 47.999em) {
  .custom-menu-3 {
    text-align: left;
  }

  .custom-toggle {
    display: block;
  }
}
@media (min-width: 48em) {
  .custom-can-transform {
    width: 100%;
    white-space: nowrap;
  }

  .custom-can-transform ul {
    display: inline-block;
  }

  .custom-can-transform .pure-menu-item {
    display: inline-block;
    zoom: 1;
    vertical-align: middle;
  }
}
</style>

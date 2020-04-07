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
        <div class="filter-row">
          <button class="pure-button" @click="setFilterByTag('all')">
            All
          </button>
          <TagButton
            v-for="tag in tags"
            :key="tag.$index"
            :name="tag"
            :active="tagFilterKey"
            @click.native="setFilterByTag(tag)"
          />
        </div>
        <div>
          <PostForm :uid="loggedInUser ? loggedInUser.id : null" />
        </div>
        <div>
          <div>
            <button class="pure-button" @click="getPosts('back')">
              &larr; Back
            </button>
            <button class="pure-button" @click="getPosts('next')">
              Next &rarr;
            </button>
          </div>
          <ul v-if="!loading.busy" class="postWrap">
            <PostLink
              v-for="post in filterPostsByTag"
              :key="post.$index"
              :post="post"
            />
          </ul>
          <div v-else><h2>Loading...</h2></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import Logo from '~/components/Logo.vue'
import PostLink from '~/components/PostLink.vue'
import TagButton from '~/components/TagButton.vue'
import PostForm from '~/components/PostForm.vue'

export default {
  components: {
    Logo,
    PostLink,
    TagButton,
    PostForm
  },

  data() {
    return {
      posts: [],
      tags: [],
      filterTags: [],
      tagFilterKey: 'all',
      page: 1
    }
  },

  computed: {
    ...mapState(['loading']),
    ...mapGetters(['loggedInUser']),
    filterPostsByTag(tag) {
      const newArr = [...this.posts]
      if (this.tagFilterKey === 'all') {
        return this.posts
      } else {
        // const arr = this.tags.filter((t, i) => t === tag)
        // this.posts.filter((e) => e.tags.includes(this.tagFilterKey))
        return newArr.filter((e) => e.tags.includes(this.tagFilterKey))
      }
    },
    pageNumber: {
      get() {
        return this.page
      },
      set(v) {
        this.page = v
      }
    }
  },

  created() {
    this.getPosts()
  },

  methods: {
    ...mapActions({
      busyState: 'loading/triggerBusyState',
      stopBusyState: 'loading/stopBusyState'
    }),
    async getPosts(id) {
      this.busyState()
      let page

      if (id) {
        page =
          id === 'next'
            ? (this.pageNumber = this.page + 1)
            : (this.pageNumber = this.page - 1)
      }

      if (!page || page < 1) {
        page = 1
      }

      try {
        await this.$axios
          .post('list/posts', { id: page })
          .then((res) => {
            const sortedArr = res.data.list.sort((a, b) =>
              a.highestRatedComment.rank === b.highestRatedComment.rank
                ? 0
                : a.highestRatedComment.rank < b.highestRatedComment.rank
                ? 1
                : -1
            )
            this.posts = [...sortedArr]
            this.tags = [...res.data.tags]
            this.stopBusyState()
          })
          .catch((err) => {
            console.log(err)
            this.stopBusyState()
          })
      } catch (e) {
        this.error = e.response.data.message
        this.stopBusyState()
      }
    },
    setFilterByTag(tag) {
      this.tagFilterKey = tag
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

.filter-row {
  display: flex;
  padding: 2%;
}

.postWrap {
  list-style-type: none;
  padding: 2%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
}
</style>

<template>
  <div class="answer">
    <h1>
      {{ details.title }}<br />
      <small
        >Question By: {{ details.user_id ? details.user_id : '' }} at
        {{ details.created_at }}</small
      >
    </h1>
    <p class="body">{{ details.body }}</p>
    <button class="pure-button sort-button" @click="sortComments">
      Sort Comments By Rating:&nbsp;
      <span class="bold">{{ sortedAsc ? 'Descending' : 'Ascending' }}</span>
    </button>
    <PostForm
      :type="'comment'"
      :pid="Number(this.$route.params.id)"
      :slug="details.slug"
    />
    <Comment
      v-for="comment in details.comments"
      :key="comment.$index"
      :comment="comment"
    />
  </div>
</template>

<script>
import Comment from '~/components/Comment.vue'
import PostForm from '~/components/PostForm.vue'

export default {
  components: {
    Comment,
    PostForm
  },
  data() {
    return {
      details: {},
      sortedAsc: false
    }
  },
  mounted() {
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
    },
    sortComments() {
      this.sortedAsc = !this.sortedAsc

      if (this.sortedAsc) {
        this.details.comments.sort((a, b) => (a === b ? 0 : a > b ? 1 : -1))
      } else {
        this.details.comments.sort((a, b) => (a === b ? 0 : a < b ? 1 : -1))
      }
    }
  }
}
</script>

<style scoped>
.bold {
  font-weight: 700;
}
.answer {
  padding: 18px;
}

.body {
  background: lightblue;
  border-radius: 3px;
  padding: 6px;
}

.sort-button {
  margin: 12px;
  margin-left: 0;
}

small {
  font-size: 0.5em;
  font-weight: 300;
}
</style>

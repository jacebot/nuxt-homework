<template>
  <div>
    <div v-if="comment.body" class="comment">
      <div class="rank">
        {{ comment.rank }}
      </div>
      <div>
        {{ truncate ? truncatedComment : comment.body }}
      </div>
    </div>
    <p v-else>No Comment has been made.</p>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['comment', 'truncate'],
  computed: {
    truncatedComment() {
      const newBody = this.comment.body.substring(0, 48)
      const spaceIndex = newBody.lastIndexOf(' ')
      newBody.substring(0, spaceIndex)
      return newBody.length < 48 ? newBody : newBody + '...'
    }
  }
}
</script>

<style scoped>
.comment {
  display: flex;
  border: dashed 1px darkgrey;
  align-content: center;
  align-items: center;
}
.rank {
  margin-right: 12px;
  background: darkblue;
  color: orange;
  font-size: 20px;
  padding: 6px;
  text-align: center;
  min-width: 36px;
}
</style>

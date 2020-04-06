<template>
  <div class="comment">
    <div class="rank">
      {{ comment.rank }}
    </div>
    <div>
      {{ comment.body }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: ['comment']
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

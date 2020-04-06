<template>
  <div>
    <div>
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

<style></style>

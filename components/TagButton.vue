<template>
  <button class="pure-button button-secondary tag-button">
    {{ name }}
  </button>
</template>

<script>
export default {
  name: 'TagButton',
  props: ['name']
}
</script>

<style scoped>
.tag-button {
  margin-left: 6px;
}
.button-secondary {
  color: white;
  border-radius: 4px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  background: rgb(66, 184, 221);
}
</style>

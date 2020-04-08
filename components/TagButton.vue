<template>
  <button
    class="pure-button button-secondary tag-button"
    :class="{ 'button-active': active.includes(name) }"
  >
    {{ name }}
  </button>
</template>

<script>
export default {
  name: 'TagButton',
  props: ['name', 'active']
}
</script>

<style scoped>
.tag-button {
  margin-left: 6px;
  margin-top: 3px;
}

.button-secondary {
  color: white;
  border-radius: 4px;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  background: rgb(66, 184, 221);
}

.button-active {
  background: rgb(55, 87, 192);
}
</style>

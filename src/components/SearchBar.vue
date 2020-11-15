<template>
  <div>
    <input v-debounce:500ms="onInput" type="text">
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  methods: {
    onInput(a,e) {
      this.$emit('termChange', e.target.value)
    },
  },
}
</script>

<style scoped>
input {
  width: 75%;
}

div {
  text-align: center;
  margin: 20px;
}
</style>


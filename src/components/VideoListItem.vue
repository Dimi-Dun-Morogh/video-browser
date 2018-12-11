<template>
  <li class="list-group-item media" @click="onVideoSelect">
    <img :src="thumbnailUrl" class="mr-3">
    <div class="media-body">{{ video.snippet.title }}</div>
  </li>
</template>

<script>
export default {
  name: 'VideoListItem',
  props: {
    video: Object,
  },
  computed: {
    thumbnailUrl() {
      return this.video.snippet.thumbnails.default.url
    },
  },
  methods: {
    onVideoSelect() {
      this.$emit('videoSelect', this.video)
    },
  },
}
</script>

<style scoped>
li {
  display: flex;
  cursor: pointer;
  transition: background-color 0.3s;
}

li:hover {
  background-color: #eee;
}
</style>

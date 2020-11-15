<template>
  <ul class="list-group col-md-4">
    <VideoListItem
      v-for="video in videos"
      :video="video"
      :key="video.etag"
      @videoSelect="onVideoSelect"
    ></VideoListItem>
    <span>results : {{totalResults}}</span>
    <div class="buttons-wrap">
      <button @click="prevClick" :disabled="!disabled">Prev</button>
      <button @click="nextClick">Next
      </button>
    </div>
  </ul>
</template>

<script>
import VideoListItem from './VideoListItem'

export default {
  name: 'VideoList',
  components: {
    VideoListItem,
  },
  props: {
    videos: Array,
    totalResults:  Number,
    disabled: Boolean,
  },
  methods: {
    onVideoSelect(video) {
      this.$emit('videoSelect', video)
    },
    nextClick(){
      this.$emit('onNext')
    },
    prevClick(){
      this.$emit('onPrev')
    }
  },
}
</script>

<style css scoped>
span {
  text-align: center;
}
button {
  cursor: pointer;
}
button +  button {
  margin-left: 5px;
}
</style>

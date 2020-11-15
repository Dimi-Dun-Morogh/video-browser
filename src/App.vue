<template>
  <div class="container">
    <SearchBar @termChange="onTermChange"></SearchBar>
    <div class="row">
      <VideoDetail :video="selectedVideo" />
      <VideoList :videos="videos" @videoSelect="onVideoSelect"></VideoList>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SearchBar from './components/SearchBar'
import VideoList from './components/VideoList'
import VideoDetail from './components/VideoDetail'
import { YOUTUBE_API_KEY } from './config'

export default {
  name: 'App',
  components: {
    SearchBar,
    VideoList,
    VideoDetail,
  },
  data() {
    return {
      selectedVideo: {},
      videos: [],
    }
  },
  methods: {
   async onTermChange(searchTerm) {
    try {
     const fetchedVids = await axios
        .get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            key: YOUTUBE_API_KEY,
            type: 'video',
            part: 'snippet',
            q: searchTerm,
          },
        });
    this.videos = fetchedVids.data.items;
    if(this.videos.length !== 0) this.selectedVideo = this.videos[0];
    } catch (error) {
      return Promise.reject(error);
    }
    },
    onVideoSelect(video) {
      this.selectedVideo = video
    },
  },
}
</script>

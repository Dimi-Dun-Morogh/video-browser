<template>
  <div class="container">
    <SearchBar @termChange="onTermChange"></SearchBar>
    <div class="row">
      <VideoDetail :video="selectedVideo" />
      <VideoList
        :videos="videos"
        @videoSelect="onVideoSelect"
        @onNext="nextPage"
        @onPrev="prevPage"
        :totalResults="resultsNum"
        :disabled="buttonBool"
        v-show="videos.length"
      ></VideoList>
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
      resultsNum: 0,
      query: '',
      nextPageToken: '',
      prevPageToken: '',
      currentPageToken: '',
      pageCounter: 0,
    }
  },
  computed: {
    buttonBool() {
      return Boolean(this.pageCounter > 0)
    },
  },
  methods: {
    async fetchVids(query, pageToken) {
      try {
        const pageQuery = pageToken ? pageToken : ''
        return await axios.get(
          `https://www.googleapis.com/youtube/v3/search/`,
          {
            params: {
              key: YOUTUBE_API_KEY,
              type: 'video',
              part: 'snippet',
              q: query,
              pageToken: pageQuery,
            },
          }
        )
      } catch (error) {
        return Promise.reject(error)
      }
    },
    async onTermChange(searchTerm, page) {
      try {
        const fetchedVids = await this.fetchVids(searchTerm, page)
        const {
          items,
          nextPageToken,
          pageInfo: { totalResults },
        } = fetchedVids.data
        this.videos = items
        this.currentPageToken = page || ''
        this.nextPageToken = nextPageToken
        this.resultsNum = totalResults
        this.query = searchTerm
        if (this.videos.length !== 0) this.selectedVideo = this.videos[0]
      } catch (error) {
        return Promise.reject(error)
      }
    },
    onVideoSelect(video) {
      this.selectedVideo = video
    },
    nextPage() {
      console.log('next page go', this.nextPageToken)
      this.pageCounter = this.pageCounter + 1;
      this.prevPageToken = this.currentPageToken
      this.onTermChange(this.query, this.nextPageToken)
    },
    prevPage() {
      console.log('prev page go', this.prevPageToken);
      this.pageCounter = this.pageCounter -1;
      if (this.pageCounter === 0) return this.onTermChange(this.query); //because apparently there is no special url for page 0;
      this.onTermChange(this.query, this.prevPageToken)
    },
  },
}
</script>

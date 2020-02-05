<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <the-posts class="the-posts" v-bind:filter="filter" />
    <the-filters class="the-filters" v-on:filter-event="filter = $event" />
  </div>
</template>

<script>
import ThePosts from './components/ThePosts.vue'
import TheFilters from './components/TheFilters.vue'

export default {
  name: 'app',
  components: {
    ThePosts,
    TheFilters
  },
  data() {
    return {
      filter: {
        name: '',
        content: ''
      }
    }
  },
  methods: {
    print(event) {
      console.log(event)
    }
  }
}
</script>

<style lang="scss">
$break-large: 1440px;
$break-medium: 720px;
$break-small: 480px;

#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  min-width: 320px;
  // text-align: center;
  // color: #2c3e50;
  // margin-top: 60px;
  @media screen and (max-width: $break-medium) {
    flex-direction: column-reverse;
    align-items: center;
  }
}

#app > .the-posts {
  width: 75%;

  @media screen and (max-width: $break-medium) {
    width: 100%;
  }
}

#app > .the-filters {
  width: 25%;
  @media screen and (max-width: $break-medium) {
    // width: 100%;
    min-height: 10rem;
    min-width: 15rem;
  }
}
</style>

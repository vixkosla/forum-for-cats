<template>
  <div class="hello">
    <!-- <pre> {{ posts }} </pre>
    <pre> {{ users }} </pre> -->
    <post
      v-for="(item, index) in filteredItems"
      v-bind:key="index"
      v-bind:post="item"
    ></post>
    <!-- <post :post="items[0]"></post> -->
  </div>
</template>

<script>
import Post from '@/components/Post.vue'

export default {
  components: {
    post: Post
  },
  name: 'ThePosts',
  props: {
    filter: {
      type: Object,
      default() {
        return {
          name: '',
          content: ''
        }
      }
    }
  },
  data() {
    return {
      loading: false,
      errored: false,
      posts: [],
      users: [],
      items: []
    }
  },
  computed: {
    filteredItems() {
      return this.items
        .filter(item => {
          return item.name.includes(this.filter.name)
        })
        .filter(item => {
          return item.body.includes(this.filter.content)
        })
    }
  },
  async mounted() {
    await this.fetchPosts()
    await this.fetchUsers()
    this.prepareData()
  },
  methods: {
    async fetchPosts() {
      this.loading = true

      try {
        const { data } = await this.$http.request({
          url: `${process.env.VUE_APP_URL_POSTS}`,
          'Access-Control-Allow-Origin': '*'
        })
        // console.log('posts')
        // console.log(data)
        this.posts = data
      } catch (error) {
        this.errored = true
        console.log('fetching posts catch next error' + error)
      }
      this.loading = false
    },
    async fetchUsers() {
      this.loading = true

      try {
        const { data } = await this.$http.request({
          url: `${process.env.VUE_APP_URL_USERS}`,
          'Access-Control-Allow-Origin': '*'
        })
        // console.log('users')
        // console.log(data)
        this.users = data
      } catch (error) {
        this.errored = true
        console.log('fetching users catch next error: ' + error)
      }
      this.loading = false
    },
    prepareData() {
      const items = []

      for (let i = 0; i < 10; i++) {
        items.push({
          id: i + 1,
          name: this.users[`${this.posts[i].id - 1}`].name,
          title: this.posts[i].title,
          body: this.posts[i].body
        })
      }

      this.items = items
      // console.log(items)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

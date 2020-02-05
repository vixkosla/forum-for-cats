<template>
  <div>
    <div class="post">
      <div class="post-container">
        <div class="post-container-image">
          <img v-bind:src="image" v-bind:alt="post.title" />
        </div>
        <div class="post-container-information">
          <span>{{ post.name }}</span>
          <h1>{{ post.title }}</h1>
          <p>{{ post.body }}</p>
        </div>
      </div>
      <div class="post-comments-show">
        <span v-show="!display" v-on:click="getComments"
          >Открыть комментарии</span
        >
      </div>
    </div>
    <div v-if="display" class="comments">
      <comment
        v-for="(item, index) in items"
        v-bind:key="index"
        v-bind:comment="item"
      ></comment>
      <div class="comments-hide">
        <span v-on:click="getComments">Скрыть комментарии</span>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/Comment.vue'

export default {
  components: {
    comment: Comment
  },
  name: 'Post',
  props: {
    post: {
      type: Object,
      // why we define default values propertyes for object props in v-for
      default() {
        return {
          id: 0,
          name: 'Louis Armstrong',
          title: 'American/Canadian scientist',
          body:
            'was an expert in the fields of radiogenic isotope geochemistry and geochronology, geochemical evolution of the earth, geology of the American Cordillera, and large-magnitude crustal extension. He published over 170 scientific papers.'
        }
      }
    }
  },
  data() {
    return {
      uploaded: false,
      display: false,
      loading: false,
      errored: false,
      comments: [],
      items: [],
      position: 0
    }
  },
  computed: {
    image() {
      return `http://placekitten.com/150/${this.post.id + 150}`
    }
  },
  methods: {
    async getComments() {
      if (!this.uploaded) {
        await this.fetchComments()
        this.prepareData()
        this.uploaded = true
        // save position page to restore it in hide 'case' in future
        this.position = window.pageYOffset
        console.log(this.position)
      }
      if (this.display) {
        window.scroll(0, this.position)
        console.log('back to the post')
      }

      this.display = !this.display
      console.log('Comments button has clicked')
    },
    async fetchComments() {
      // const url = `${process.env.VUE_APP_URL_COMMENTS}` + (this.post.id + 1)
      // console.log(url)

      this.loading = true

      try {
        const { data } = await this.$http.request({
          url: `${process.env.VUE_APP_URL_COMMENTS}` + this.post.id,
          'Access-Control-Allow-Origin': '*'
        })
        console.log('comments')
        console.log(data)
        this.comments = data
      } catch (error) {
        this.errored = true
        console.log('fetching comments catch next error: ' + error)
      }
      this.loading = false
    },
    prepareData() {
      const items = []

      this.comments.forEach((comment, index) => {
        items.push({
          id: index + 1,
          name: comment.name,
          body: comment.body
        })
      })

      this.items = items
      console.log(items)
    }
  }
}
</script>

<style lang="scss" scoped>
$break-large: 1440px;
$break-medium: 720px;
$break-small: 480px;

.post {
  background-color: rgb(200, 243, 250);
  margin: 1rem;
  padding: 1rem;
  border: 0.2px solid rgb(192, 192, 192);

  &-container {
    display: flex;

    &-image {
      @media screen and (max-width: $break-small) {
        width: 100px;
        height: 100px;
      }
    }

    &-information {
      padding-left: 1rem;
      display: flex;
      flex-direction: column;
      text-align: left;
    }

    &-information > span {
      color: grey;
    }

    &-information > h1 {
      margin: 0;
      font-size: 1.5rem;
    }

    &-information > p {
      margin: 0;
    }
  }

  &-comments-show {
    text-align: right;
    margin-top: 0.5rem;
  }

  &-comments-show > span {
    margin: 0;
    margin-right: 1rem;
    cursor: pointer;
    color: blue;
  }
}

.comments {
  width: 80%;
  margin: 0 auto;
  margin-top: -1rem;

  &-hide {
    text-align: right;
    padding: 0.5rem 0;
  }

  &-hide > span {
    background-color: rgb(200, 243, 250);
    cursor: pointer;
    color: blue;
    padding: 0.5rem;
  }
}
</style>

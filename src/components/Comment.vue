<template>
  <div class="comment-container">
    <div class="comment-container-image">
      <img :src="image" :alt="comment.name" />
    </div>
    <div class="comment-container-information">
      <div class="comment-container-information-name">
        <h2>{{ comment.name }}</h2>
        <span> промурчал </span>
      </div>
      <p>{{ comment.body }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    comment: {
      type: Object,
      default() {
        return {
          id: 0,
          name: 'Enrique Miguel Iglesias Preysler',
          body:
            'Born 8 May 1975, is a Spanish-Filipino singer, songwriter, actor and record producer who is widely regarded as the King of Latin Pop.'
        }
      }
    }
  },
  computed: {
    image() {
      return `http://placekitten.com/75/${this.comment.id + 120}`
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-container {
  display: flex;
  background-color: rgb(200, 243, 250);
  padding: 1rem;
  // width: 80%;
  margin: 0 auto;
  border: 0.2px solid rgb(192, 192, 192);

  &-image {
  }

  &-information {
    padding-left: 1rem;
    display: flex;
    flex-direction: column;
    text-align: left;

    &-name > h2 {
      margin: 0;
      font-size: 1.2rem;
      display: inline-block;
    }

    &-name > span {
      color: grey;
      margin-left: 1rem;
    }
  }
}
</style>

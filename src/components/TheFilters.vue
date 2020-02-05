<template>
  <div class="filters">
    <h3>Фильтры</h3>
    <label for="">Имя/Название</label>
    <input type="text" v-model="name" />
    <label for="">Контент</label>
    <input type="text" v-model="content" />
  </div>
</template>

<script>
export default {
  name: 'TheFilters',
  data() {
    return {
      name: '',
      content: ''
    }
  },
  watch: {
    filter: {
      deep: true,
      handler() {
        this.$emit('filter-event', this.filter)
      }
    }
  },
  computed: {
    filter() {
      return {
        name: this.name,
        content: this.content
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 1rem;
  background-color: lightgrey;

  & > input {
    width: 70%;
  }
}
</style>

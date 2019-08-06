<template>
  <div>Foo
    <button @click="clickMe">click me</button>
    <p class="green">{{this.$store.state.name}}</p>
  </div>
</template>

<script>
  export default {
    // 这个方法只在服务端执行，并且只在页面组件执行
    asyncData(store) {
      console.log(123)
      return store.dispatch('changeName')
    },
    methods: {
      clickMe () {
        alert('hello world')
      }
    },
    mounted () {
      this.$store.dispatch('changeName')
    }
  }
</script>

<style>
  .green {
    background: green;
    color: #ffffff;
  }
</style>


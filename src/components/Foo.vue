<template>
  <div>Foo
    <button @click="clickMe">click me</button>
  </div>
</template>

<script>
  export default {
    methods: {
      clickMe () {
        alert('hello world')
      }
    }
  }
</script>

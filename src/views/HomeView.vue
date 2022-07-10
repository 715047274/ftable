<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
    <DataForm msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import DataForm from '@/components/DataForm.vue'
export default {
  name: 'HomeView',
  components: {
    DataForm
  }
}
</script>
<style>
.home {
  padding: 10px;
}
</style>
<template>
  <div class="navbar">
    <h1>Climber Cards</h1>
    <router-link to="/login">Login</router-link>
  </div>
</template>

<script>
  export default {
    name: 'navbar',
    data: function() {
      return {

      }
    }
  }
</script>

<style>
  .navbar {
    display: flex;
    height: 50px;
    border-bottom: 1px solid gray;
    margin-bottom: 20px;
    padding: 0px 0px 20px 20px;
  }
</style>

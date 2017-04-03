<template>
  <div>
    <a href="/auth">Let's get you logged in</a>
    <div>{{ loggedIn }}</div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data: function() {
      return {
        loggedIn: 'not logged in'
      }
    },
    methods: {
      authenticate: function() {
        this.$http.get('/auth').then(response => {
          console.log('Logged the user in');
          this.loggedIn = 'logged in as:' + JSON.stringify(response.body);
        }, err => {
          console.log('Could not log you in: %s', err);
        });
      }
    }
  }
</script>

<style>

</style>

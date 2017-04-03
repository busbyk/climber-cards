<template>
  <div class="container">
    <nav-bar></nav-bar>
    <div class="content-container">
      <div class="cards-container">
        <climber-card></climber-card>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from './components/NavBar.vue';
  import ClimberCard from './components/ClimberCard.vue';

  export default {
    name: 'app',
    data: function() {
      return {
        state: {}
      }
    },
    components: {
      NavBar,
      ClimberCard
    }
  }
</script>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  .content-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .cards-container {
    display: flex;
    flex-direction: column;
    width: 60%;
  }
</style>

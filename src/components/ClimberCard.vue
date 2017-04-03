<template>
  <div class="card">
    <h2>{{ user.name }}</h2>
    <img v-bind:src="user.avatar"/>
    <div class="style-buttons">
      <div v-for="(style, styleName) in user.styles">
        <h3>{{ styleName }}</h3>
        <strong>Leads: </strong>{{ style.lead }}<br/>
        <strong>Follows: </strong>{{ style.follow }}<br/>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'climber-card',
    data: function() {
      return {
        user: {}
      }
    },
    created: function() {
      this.getClimberData();
    },
    methods: {
      getClimberData: function() {
        this.$http.get('/climberData').then(response => {
          this.user = response.body;
        }, err => {
          console.log('something went wrong getting user\'s data');
        });
      }
    }
  }
</script>

<style>
  .card {
    padding: 10px;
    -moz-box-shadow:    3px 3px 5px 6px #ccc;
    -webkit-box-shadow: 3px 3px 5px 6px #ccc;
    box-shadow:         3px 3px 5px 6px #ccc;
  }

  .style-buttons {
    display: flex;
  }

  .style-buttons div {
    flex-grow: 1;
    cursor: pointer;
    padding: 10px;
  }

  .style-buttons div:hover {
    -moz-box-shadow:    3px 3px 5px 6px #ccc;
    -webkit-box-shadow: 3px 3px 5px 6px #ccc;
    box-shadow:         3px 3px 5px 6px #ccc;
  }
</style>

<template>
  <div class="card">
    <div class="background-photo"></div>
    <div class="card-content-container">
      <div class="avatar-container">
        <img v-bind:src="user.avatar"/>
      </div>
      <div class="title">{{ user.name }}</div>
      <div class="style-buttons">
        <div v-for="(style, styleName) in user.styles" class="style">
          <div class="title">{{ styleName }}</div>
          <strong>Leads: </strong>{{ style.lead }}<br/>
          <strong>Follows: </strong>{{ style.follow }}<br/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'climber-card',
    data: function() {
      return {
        user: {},
        cardBackgroundStyle: {}
      }
    },
    created: function() {
      this.getClimberData();
      this.setCardBackgroundStyle();
    },
    methods: {
      getClimberData: function() {
        this.$http.get('api/mp/climberData').then(response => {
          this.user = response.body;
        }, err => {
          console.log('something went wrong getting user\'s data');
        });
      },
      setCardBackgroundStyle: function() {
        console.log('how to set the style...');
      }
    }
  }
</script>

<style>
  .card {
    position: relative;
    -moz-box-shadow:    3px 3px 5px 6px #ccc;
    -webkit-box-shadow: 3px 3px 5px 6px #ccc;
    box-shadow:         3px 3px 5px 6px #ccc;
    border-radius: 15px;
  }

  .card-content-container {
    padding: 20px;
  }

  .avatar-container {
    position: relative;
    left: -60px;
  }

  .avatar-container img {
    border-radius: 50%;
  }

  .title {
    font-size: 40px;
    font-weight: bold;
    margin: 10px 0 10px 0;
  }

  .style-buttons {
    display: flex;
  }

  .style-buttons .style {
    flex-grow: 1;
    cursor: pointer;
    padding: 10px;
  }

  .style-buttons .style:hover {
    -moz-box-shadow:    3px 3px 5px 6px #ccc;
    -webkit-box-shadow: 3px 3px 5px 6px #ccc;
    box-shadow:         3px 3px 5px 6px #ccc;
  }

  .style-buttons .title {
    font-size: 20px;
    margin: 0 0 10px 0;
  }

  .background-photo {
    background-color: gray;
    position: absolute;
    left: 0;
    right: 0;
    height: 200px;
    border-radius: 15px 15px 0 0;
  }
</style>

<template>
  <div class="card">
    <div class="background-photo" v-bind:style="{ 'background-image': 'url(' + activeBackgroundImage + ')' }"></div>
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
        backgroundImages: [],
        activeBackgroundImage: ""
      }
    },
    created: function() {
      this.getClimberData().then(() => {
        this.getBackgroundImages();
      }, err => {
        console.log('could not get climber data so cannot get images');
      });
    },
    methods: {
      getClimberData: function() {
        return new Promise((resolve, reject) => {
          this.$http.get('api/mp/climberData').then(response => {
            this.user = response.body;
            resolve();
          }, err => {
            console.log('something went wrong getting user\'s data');
            reject();
          });
        });
      },
      getBackgroundImages: function() {
        let queryBase = 'api/msft/images/search',
            query = '',
            style = Object.keys(this.user.styles)[0];

        query = queryBase + '?q=' + encodeURIComponent(style + ' climbing');
        console.log(query);

        this.$http.get(query).then(res => {
          this.backgroundImages = res.body;
          this.activeBackgroundImage = this.backgroundImages[0];

          let counter = 0;
          setInterval(() => {
            this.activeBackgroundImage = this.backgroundImages[counter];
            if(counter == 9) {
              counter = 0;
            } else {
              counter++;
            }
          }, 5000);
        }, err => {
          console.log('something went wrong getting images');
        });
      }
    }
  }
</script>

<style>
  .card {
    position: relative;
    -moz-box-shadow:    0px 1px 3px 2px #ccc;
    -webkit-box-shadow: 0px 1px 3px 2px #ccc;
    box-shadow:         0px 1px 3px 2px #ccc;
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
    -moz-box-shadow:    0px 1px 3px 2px #ccc;
    -webkit-box-shadow: 0px 1px 3px 2px #ccc;
    box-shadow:         0px 1px 3px 2px #ccc;
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
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;
  }
</style>

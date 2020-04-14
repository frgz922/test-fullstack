<template>
  <div>
    <NavBar></NavBar>
    <md-card>
      <md-card-header>
        <div class="md-title">Login</div>
      </md-card-header>

      <md-card-content>
        <h2 v-if="wrongCred">Wrong credentials entered!. Please enter your correct details.</h2>
        <form v-on:submit.prevent="loginUser">
          <md-field>
            <label for="user">Username</label>
            <md-input name="name" id="user" v-model="username"/>
          </md-field>

          <md-field>
            <label for="pass">Password</label>
            <md-input type="password" name="password" id="pass" v-model="password"/>
          </md-field>
          <md-card-actions>
            <md-button type="submit" class="md-primary">Login</md-button>
          </md-card-actions>
        </form>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
  import NavBar from '../components/Navbar'

  export default {
    name: 'login',
    components: {
      NavBar
    },
    data () {
      return {
        username: '',
        password: '',
        wrongCred: false // activates appropriate message if set to true
      }
    },
    methods: {
      loginUser () { // call loginUSer action
        this.$store.dispatch('loginUser', {
          username: this.username,
          password: this.password
        })
          .then(() => {
            this.wrongCred = false
            this.$router.push({ name: 'users' })
          })
          .catch(err => {
            console.log(err)
            this.wrongCred = true // if the credentials were wrong set wrongCred to true
          })
      }
    },
    mounted () {
      console.log(this.$router.params)
    }
  }
</script>

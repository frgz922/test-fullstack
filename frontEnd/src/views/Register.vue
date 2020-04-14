<template>
  <div>
    <NavBar></NavBar>
    <form class="md-layout" @submit.prevent>
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Users</div>
        </md-card-header>
        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field>
                <label for="email">Email</label>
                <md-input type="email" name="email" id="email" v-model="userData.email"/>
              </md-field>
              <md-field>
                <label for="country">Country</label>
                <md-input name="country" id="country" v-model="userData.country"/>
              </md-field>
              <md-field v-if="!this.userData.id">
                <label for="password">Password</label>
                <md-input type="password" name="password" id="password" v-model="userData.password"/>
              </md-field>
              <md-field v-if="!this.userData.id">
                <label for="pass">Password Confirmation</label>
                <md-input type="password" name="pass" id="pass" v-model="userData.confirm"/>
              </md-field>
            </div>
          </div>
        </md-card-content>
        <md-card-actions>
          <router-link :to = "{ name:'users' }">
            <md-button>Back</md-button>
          </router-link>
          <md-button type="submit" class="md-primary" v-if="!this.userData.id" @click="registerUser()" >Create User</md-button>
          <md-button type="submit" class="md-primary" v-if="this.userData.id" @click="updateUser()" >Update User</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
  import { getAPI } from '../api/axios-base'
  import NavBar from '../components/Navbar'
  import { mapState } from 'vuex'
  export default {
    name: 'register',
    components: {
      NavBar
    },
    data () {
      return {
        email: '',
        country: '',
        password: '',
        confirm: '',
        userData: {}
      }
    },
    computed: mapState(['accessToken']),
    methods: {
      registerUser () {
        this.$store.dispatch('registerUser', {
          email: this.userData.email,
          password: this.userData.password,
          country: this.userData.country,
          confirm: this.userData.confirm
        }).then(() => {
          if (this.accessToken === null) {
            this.$router.push({ name: 'login' })
          } else {
            this.$router.push({ name: 'users' })
          }
        })
      },
      updateUser () {
        this.$store.dispatch('updateUser', {
          email: this.userData.email,
          password: this.userData.password,
          country: this.userData.country,
          confirm: this.userData.confirm,
          id: this.userData.id
        }).then(() => {
          this.$router.push({ name: 'users' })
        })
      }
    },
    mounted () {
      console.log(this.userData.id)
      if (this.$route.params.id) {
        getAPI.get('/api/v1/users/' + this.$route.params.id, { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
          .then(response => {
            this.userData = response.data
          })
          .catch(err => { // refresh token expired or some other error status
            console.log(err)
          })
      }
    }
  }
</script>

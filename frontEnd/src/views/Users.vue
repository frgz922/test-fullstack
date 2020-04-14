<template>
  <div>
    <NavBar></NavBar>
    <md-table v-model="APIData" md-card>
      <md-table-toolbar>
        <h1 class="md-title">Users</h1>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID" md-sort-by="id">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
        <md-table-cell md-label="Country">{{ item.country }}</md-table-cell>
        <md-table-cell md-label="Edit">
          <router-link :to="{ name:'update', params: {id: item.id} }">
            <md-button class="md-primary md-raised md-icon-button">
              <md-icon>edit</md-icon>
            </md-button>
          </router-link>
        </md-table-cell>
        <md-table-cell md-label="Delete">
          <md-button class="md-accent md-raised md-icon-button" @click="deleteUser(item.id)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Are you sure you want to DELETE this user?"
      md-confirm-text="Continue"
      md-cancel-text="Cancel"
      @md-cancel="onCancel"
      @md-confirm="onConfirm"/>
  </div>
</template>

<script>
  import NavBar from '../components/Navbar'
  import { getAPI } from '../api/axios-base'
  import { mapState } from 'vuex'

  export default {
    name: 'Downloads',
    data: () => ({
      active: false,
      userID: ''
    }),
    onIdle () {
      this.$store.dispatch('logoutUser')
        .then(response => {
          this.$router.push('/login')
        })
    },
    components: {
      NavBar
    },
    computed: mapState(['APIData']),
    created () {
      getAPI.get('/api/v1/users/', { headers: { Authorization: `Bearer ${this.$store.state.accessToken}` } })
        .then(response => {
          console.log('GetAPI successfully got the mods')
          this.$store.state.APIData = response.data // store the response data in store
        })
        .catch(err => { // refresh token expired or some other error status
          console.log(err)
        })
    },
    methods: {
      onConfirm (n) {
        this.$store.dispatch('deleteUser', {
          id: this.userID
        }).then((r) => {
          if (r.status === 204) {
            this.$router.go(n)
          }
        })
      },
      onCancel () {
        this.active = false
      },
      deleteUser (userID) {
        this.active = true
        this.userID = userID
      }
    }
  }
</script>

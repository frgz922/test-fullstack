<template>
  <div>
    <md-toolbar class="md-primary" md-elevation="1">
      <h3 class="md-title" style="flex: 1">Title</h3>
      <router-link :to = "{ name:'register' }">
        <md-button>Create User</md-button>
      </router-link>
      <router-link :to = "{ name:'login' }">
        <md-button v-if="accessToken==null">Login</md-button>
      </router-link>
      <router-link :to = "{ name:'users' }">
        <md-button>Users List</md-button>
      </router-link>
    </md-toolbar>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: 'NavBar',
    computed: mapState(['accessToken'])
  }
</script>

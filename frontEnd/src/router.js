import Vue from 'vue'
import Router from 'vue-router'
import login from './views/Login'
import register from './views/Register'
import users from './views/Users'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        requiresLogged: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/update/:id',
      name: 'update',
      component: register
    },
    {
      path: '/users',
      name: 'users',
      component: users,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

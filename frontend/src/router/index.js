import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'
import PostView from '../views/Post-View.vue'
import SignupView from '../views/SignUp.vue'
import LoginView from '../views/LogIn.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/post',
    name: 'Post',
    component: PostView
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

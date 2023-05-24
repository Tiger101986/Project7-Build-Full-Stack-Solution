import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
import PostView from '../views/PostPage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import LoginView from '../views/LogInPage.vue'
import ProfileView from '../views/ProfilePage.vue'
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
    name: 'SignUpPage',
    component: SignUpPage
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
import PostView from '../views/PostPage.vue'
import SinglePage from '../views/SinglePage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import LoginView from '../views/LogInPage.vue'
import ProfileView from '../views/ProfilePage.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
    /* beforeEnter(to, from, next) {
      const { userId, token } = JSON.parse(localStorage.getItem("users-info")); 
      alert('Please login first')
      if (to.name !== 'Login' && token) {
        return '/login'
      }
    }, */
  },
  {
    path: '/post',
    name: 'Post',
    component: PostView,
    meta: {
      requiresAuth: true,
    },
    /* beforeEnter(to, from, next) {
      const { userId, token } = JSON.parse(localStorage.getItem("users-info"));
      alert('Please login first') 
      if (to.name !== 'Login') {
        return '/login'
      }
    }, */
  },
  {
    path: '/:id',
    name: 'SinglePost',
    component: SinglePage,
    meta: {
      requiresAuth: true,
    },
    /* beforeEnter(to, from, next) {
      const { userId, token } = JSON.parse(localStorage.getItem("users-info"));
      alert('Please login first')
      if (to.name !== 'Login') {
        return '/login'
      }
    }, */
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
    component: ProfileView,
    meta: {
      requiresAuth: true,
    },
    /* beforeEnter(to, from, next) {
      const { userId, token } = JSON.parse(localStorage.getItem("users-info"));
      alert('Please login first')
      if (to.name !== 'Login') {
        return '/login'
      }
    } */
  },
]
routes.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("users-info"));
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (user.token) {
      next();
    } else {
      next({ path: '/login' });
    }
  }
  next();
});
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

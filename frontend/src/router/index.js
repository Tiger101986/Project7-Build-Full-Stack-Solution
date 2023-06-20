import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomePage.vue'
import PostView from '../views/PostPage.vue'
import SinglePage from '../views/SinglePage.vue'
import SignUpPage from '../views/SignUpPage.vue'
import LoginView from '../views/LogInPage.vue'
/* import LogOutView from '../views/LogOutPage.vue' */
import ProfileView from '../views/ProfilePage.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/post',
    name: 'Post',
    component: PostView,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/:id',
    name: 'SinglePost',
    component: SinglePage,
    meta: {
      requiresAuth: true,
    },
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
 /*  {
    path: '/logout',
    name: 'LogOut',
    component: LogOutView,
    meta: {
      requiresAuth: true,
    },
  }, */
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
    meta: {
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  const user = JSON.parse(localStorage.getItem("users-info"));
  if (to.matched.some(route => route.meta.requiresAuth)) {
    if (user?.token) {
      next();
    } else {
      next({ path: '/login' });
    }
  }else{
    next();
  }
});


export default router

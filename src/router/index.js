import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home');
const Category = () => import('views/category/Category');
const Cart = () => import('views/cart/Cart');
const Profile = () => import('views/profile/Profile');
const Detail = () => import('views/detail/Detail');
const Comments = () => import('views/coments/Comments');
const Login = () => import('views/login/Login');
const Register = () => import('views/register/Register');
const NewPassword = () => import('views/newpassword/NewPassword');
const Favorite = () => import('views/favorite/Favorite');

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    // meta: {
    //   keepAlive: true
    // }
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail',
    component: Detail,
  },
  {
    path: '/comments',
    name: 'comments',
    component: Comments
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/forget',
    component: NewPassword
  },
  {
    path: '/favorite',
    component: Favorite
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router

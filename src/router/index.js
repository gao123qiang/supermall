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
const CheckDaily = () => import('views/profile/comps/checkdaily/CheckDaily');
const Address = () => import('views/profile/comps/address/Address');
const AddressEidt = () => import('views/profile/comps/addressEdit/AddressEdit');
const AddressChange = () => import('views/profile/comps/addressChange/AddressChange');

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
    path: '/profile/sign',
    component: CheckDaily
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
  },
  {
    path: '/profile/address',
    component: Address
  },
  {
    path: '/profile/address/edit',
    component: AddressEidt
  },
  {
    path: '/profile/address/change',
    component: AddressChange
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router

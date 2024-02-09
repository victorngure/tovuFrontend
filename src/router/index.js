import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/HomeView.vue'
import Register from '@/views//Registration/Register.vue'

import Login from '@/views/Auth/Login.vue'

import Dashboard from '@/views/Dashboard.vue'

import Customers from '@/views/Customers/Customers'

import Payments from '@/views/Payments/Payments'

import Leads from '@/views/Customers/Leads'

Vue.use(VueRouter)

const routes = [
  {
    path: '/leads',
    name: 'leads',
    component: Leads
  }, 
  {
    path: '/payments',
    name: 'payments',
    component: Payments
  }, 
  {
    path: '/customers',
    name: 'customers',
    component: Customers
  }, 
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  }, 
  {
    path: '/',
    name: 'home',
    component: Home
  }, 

  {
    path: '/register',
    name: 'register',
    component: Register
  }, 

  {
    path: '/login',
    name: 'login',
    component: Login
  }, 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

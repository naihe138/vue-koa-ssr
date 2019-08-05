import Vue from 'vue'
import VueRouter from 'vue-router'
import Foo from './components/Foo'
import Bar from './components/Bar'
import Baz from './components/Baz'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Foo
    },
    {
      path: '/bar',
      component: Bar
    },
    {
      path: '/baz',
      component: Baz
    }
  ]
})

export default router

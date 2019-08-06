import Vue from 'vue'
import VueRouter from 'vue-router'
import Foo from './components/Foo'

const Bar = () => import(/* webpackChunkName: "bar" */ './components/Bar')
const Baz = () => import(/* webpackChunkName: "baz" */ './components/Baz')

Vue.use(VueRouter)

export default () => {
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
  return router
}

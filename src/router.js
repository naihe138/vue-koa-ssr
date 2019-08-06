import Vue from 'vue'
import VueRouter from 'vue-router'
import Foo from './components/Foo'

const Bar = () => import('./components/Bar')
const Baz = () => import('./components/Baz')

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

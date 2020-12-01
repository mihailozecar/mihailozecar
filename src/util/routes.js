const BaseLayout = () => import('@/layout/BaseLayout.vue')
const Home = () => import('@/components/Home.vue')

const DccLayout = () => import('@/layout/DccLayout.vue')
const AuthLayout = () => import('@/layout/AuthLayout.vue')

const DccHome = () => import('@/components/DccHome.vue')

const routes = [
  {
    path: '/',
    component: BaseLayout,
    name: 'root',
    redirect: { name: 'home' },
    meta: {
      authRequired: false
    },
    children: [
      {
        path: 'home',
        component: Home,
        name: 'home',
        meta: {
          authRequired: false
        }
      }
    ]
  },
  {
    path: '/dcc',
    component: DccLayout,
    name: 'dcc',
    redirect: { name: 'dcc-home' },
    meta: {
      authRequired: true
    },
    children: [
      {
        path: 'home',
        component: DccHome,
        name: 'dcc-home',
        meta: {
          authRequired: true
        }
      }
    ]
  },
  {
    path: '/auth',
    component: AuthLayout,
    name: 'auth',
    meta: {
      authRequired: false
    }
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: 'root' },
    meta: {
      authRequired: false
    }
  }
]

export default routes
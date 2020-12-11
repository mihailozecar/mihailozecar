const BaseLayout = () => import('@/layout/BaseLayout.vue')
const Home = () => import('@/components/Home.vue')

const DccLayout = () => import('@/layout/DccLayout.vue')
const AuthLayout = () => import('@/layout/AuthLayout.vue')

const DccHome = () => import('@/components/DccHome.vue')
const ProblemDetails = () => import('@/components/ProblemDetails.vue')

const routes = [
  {
    path: '/',
    name: 'root',
    component: BaseLayout,
    redirect: { name: 'home' },
    meta: {
      authRequired: false
    },
    children: [
      {
        path: 'home',
        name: 'home',
        component: Home,
        meta: {
          authRequired: false
        }
      }
    ]
  },
  {
    path: '/dcc',
    name: 'dcc',
    component: DccLayout,
    redirect: { name: 'dcc-home' },
    meta: {
      authRequired: true
    },
    children: [
      {
        path: 'home',
        name: 'dcc-home',
        component: DccHome,
        meta: {
          authRequired: true
        },
        children: [
          {
            path: 'problem/:problemKey',
            name: 'problem-details',
            component: ProblemDetails,
            meta: {
              authRequired: true
            },
            props: true
          }
        ]
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: AuthLayout,
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
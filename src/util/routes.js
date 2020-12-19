const BaseLayout = () => import('@/layout/BaseLayout.vue')
const Home = () => import('@/components/Home.vue')

const AppLayout = () => import('@/layout/AppLayout.vue')
const AuthLayout = () => import('@/layout/AuthLayout.vue')

const DccHome = () => import('@/components/DccHome.vue')
const ProblemDetails = () => import('@/components/ProblemDetails.vue')

const Account = () => import('@/components/Account.vue')

const _homepage = { name: 'dcc-home' };

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
        path: '',
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
    redirect: { name: 'app' },
    meta: {
      authRequired: true
    }
  },
  {
    path: '/app',
    name: 'app',
    component: AppLayout,
    redirect: _homepage,
    meta: {
      authRequired: true
    },
    children: [
      {
        path: 'dcc',
        name: 'dcc-home',
        component: DccHome,
        meta: {
          authRequired: true,
          header: 'Daily Coding Challenge'
        },
        children: [
          {
            path: 'problem/:problemKey',
            name: 'problem-details',
            component: ProblemDetails,
            meta: {
              authRequired: true,
              header: 'Daily Coding Challenge'
            },
            props: true
          }
        ]
      },
      {
        path: 'account',
        name: 'account',
        component: Account,
        meta: {
          authRequired: true,
          header: 'Account'
        }
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

export const homepage = _homepage.name

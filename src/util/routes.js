const BaseLayout = () => import('@/layout/BaseLayout.vue')
const Home = () => import('@/components/Home.vue')

const DccLayout = () => import('@/layout/DccLayout.vue')

const routes = [
  {
    path: '/',
    component: BaseLayout,
    name: 'root',
    redirect: { name: 'home' },
    children: [
      {
        path: 'home',
        component: Home,
        name: 'home'
      }
    ]
  },
  {
    path: '/dcc',
    component: DccLayout,
    name: 'dcc'
  },
  {
    path: "/:catchAll(.*)",
    redirect: { name: 'root' }
  }
]

export default routes
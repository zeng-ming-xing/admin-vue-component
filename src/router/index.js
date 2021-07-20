import { createRouter, createWebHistory } from 'vue-router'


const routes = [{
   name:'Index',
   path:'/',
   component: () => import('../page/Demo1.vue')
},
{
  name:'Demo2',
  path:'/demo2',
  component:()=>import('../page/demo/Demo2.vue')
},
{
  name:'Demo3',
  path:'/demo3',
  component:()=>import('@/page/demo3/Demo3.vue')
}]

const router = createRouter({
  history:createWebHistory(),
  routes
})

export function useRouter(app){
  app.use(router)
}
export default router
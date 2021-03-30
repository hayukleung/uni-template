import { RouterMount, createRouter } from 'uni-simple-router';
import modules from './modules';

const router = createRouter({
  routes: [...modules], // 路由表
  platform: process.env.VUE_APP_PLATFORM,
  h5: {
    loading: false,
    paramsToQuery: true,
  },
  encodeURI: true,
});
// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  console.log('[router] from', from)
  console.log('[router]   to', to)
  next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
  console.log('[router]', 'afterEach')
})

export {
  router,
  RouterMount
}
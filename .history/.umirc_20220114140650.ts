import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/oauth': {
      target: 'http://172.16.77.49:8081',
      changeOrigin: true,
      // pathRewrite: { "^/oauth" : "" }
    },
    '/openapi': {
      target: 'http://172.16.77.49:8081',
      changeOrigin: true,
      // pathRewrite: { "^/oauth" : "" }
    },
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/upload', component: '@/pages/upload' },
    { path: '/accessToken', component: '@/pages/accessToken' },
    { path: '/fileList', component: '@/pages/fileList' },
    { path: '/viewToken', component: '@/pages/viewToken' },
  ],
  fastRefresh: {},
});

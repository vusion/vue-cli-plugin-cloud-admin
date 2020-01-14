import AppView from './App.vue'
import config from '../../config.json';
// 在 vue-router 中为 /addon/<id> 添加子路由。
// 例如，addRoutes('foo', [ { path: '' }, { path: 'bar' } ])
// 将会向路由器添加 /addon/foo/ 和 /addon/foo/bar。
// 我们在此用 'test-webpack-route' 名称创建一个新的 '/addon/vue-webpack/' 路由
ClientAddonApi.addRoutes(config.prefix, [
  { path: '', name: `${config.prefix}.routes.index`, component: AppView }
])
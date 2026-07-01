import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import App from './App.vue';
import Home from './components/Home.vue';
import Detail from './components/Detail.vue';
import Form from './components/Form.vue';

// 导入全局样式
import './style.css';

// 路由配置
const routes = [
  { path: '/', component: Home },
  { path: '/create', component: Form },
  { path: '/post/:id', component: Detail },
  { path: '/edit/:id', component: Form },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
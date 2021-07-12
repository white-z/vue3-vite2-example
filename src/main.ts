import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementPlus from 'element-plus'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import 'dayjs/locale/zh-cn'
import 'element-plus/dist/index.css'
import './styles/index.scss'

async function render(): Promise<any> {
  const app = createApp(App);
  app.use(store);
  app.use(router);
  app.use(ElementPlus, { locale });
  const vm = await app.mount("#app");
  return Promise.resolve(vm);
}

render().then(() => {
  console.log('app mounted');
});

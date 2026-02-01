import 'virtual:uno.css';
import 'animate.css/animate.css';
import { createApp } from 'vue';
import App from './App.vue';
import './assets/style.scss';

import pinia from './store';
import router from './router';
import i18n from './locales';

import Antd from 'ant-design-vue';

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(Antd);

app.mount('#app');

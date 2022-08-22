// 1.Create APP
import { createApp } from "vue";
import App from "./App.vue";
const app = createApp(App);

// 2.Components
import router from "./router/index";
app.use(router);

import { createPinia } from "pinia";
app.use(createPinia());

import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
app.use(ElementPlus);

import TitanUI from "@deepberry/titan-web-components";
app.use(TitanUI);

// 3.Mount DOM
app.mount("#app");

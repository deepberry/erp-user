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
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "element-plus/dist/index.css";
app.use(ElementPlus, {
    locale: zhCn,
});

import TitanUI from "@deepberry/titan-web-components";
app.use(TitanUI);

// 3.Mount DOM
app.mount("#app");

import Vue from "vue";
// import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import { Button } from "ant-design-vue/lib/button";
// import "ant-design-vue/dist/antd.less";
// import "ant-design-vue/lib/button/style";
import { Button, Layout } from "ant-design-vue";

Vue.config.productionTip = false;

// Vue.use(Antd);
Vue.use(Button);
Vue.use(Layout);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

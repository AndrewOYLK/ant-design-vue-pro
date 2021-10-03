import Vue from "vue";
// import Antd from "ant-design-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import { Button } from "ant-design-vue/lib/button";
// import "ant-design-vue/dist/antd.less";
// import "ant-design-vue/lib/button/style";
import {
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  notification,
} from "ant-design-vue";

import Authorized from "./components/Authorized";
import Auth from "./directives/auth";

Vue.config.productionTip = false;

// Vue.use(Antd);
Vue.use(Button);
Vue.use(Layout);
Vue.use(Icon);
Vue.use(Drawer);
Vue.use(Radio);
Vue.use(Menu);
Vue.use(notification);
Vue.component("Authorized", Authorized);
Vue.use(Auth);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

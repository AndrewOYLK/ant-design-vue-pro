<template>
  <div>
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider :trigger="null" v-model="collapsed" collapsible>
        <div class="logo" />
        <SiderMenu></SiderMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="collapsed = !collapsed"
          ></a-icon>
          <Header></Header>
        </a-layout-header>
        <a-layout-content style="margin: 0 16px">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          <Footer></Footer>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";

export default {
  components: {
    Header,
    Footer,
    SiderMenu,
  },
  data() {
    return {
      collapsed: false, // 左侧菜单收缩
    };
  },
};
</script>

<style scoped>
.trigger {
  padding: 0 20px;
  line-height: 64px;
}

.trigger:hover {
  background-color: #eee;
}
</style>

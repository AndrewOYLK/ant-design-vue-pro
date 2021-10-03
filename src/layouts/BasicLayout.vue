<template>
  <div :class="[`nav-theme-${navTheme}`, `nav-layout-${navLayout}`]">
    <a-layout id="components-layout-demo-side" style="min-height: 100vh">
      <a-layout-sider
        v-if="navLayout === 'left'"
        :theme="navTheme"
        :trigger="null"
        v-model="collapsed"
        collapsible
        width="256px"
      >
        <div class="logo">Ant Desigh Vue Pro</div>
        <SiderMenu :theme="navTheme"></SiderMenu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            v-auth="['admin']"
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
    <!-- 方式1：编写权限组件嵌套，唯一弊端需要写组件 -->
    <Authorized :authority="['admin']">
      <SettingDrawer></SettingDrawer>
    </Authorized>
  </div>
</template>

<script>
import Header from "./Header";
import Footer from "./Footer";
import SiderMenu from "./SiderMenu";
import SettingDrawer from "../components/SettingsDrawer";

export default {
  computed: {
    navTheme() {
      return this.$route.query.navTheme || "dark";
    },
    navLayout() {
      return this.$route.query.navLayout || "left";
    },
  },
  components: {
    Header,
    Footer,
    SiderMenu,
    SettingDrawer,
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

.logo {
  height: 64px;
  line-height: 64px;
  text-align: center;
  overflow: hidden;
}

.nav-theme-dark >>> .logo {
  color: #ffffff;
}
</style>

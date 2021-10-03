<template>
  <div>
    <a-menu
      :selected-keys="selectedKeys"
      :open-keys.sync="openKeys"
      :mode="mode"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({ path: item.path, query: $route.query })"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon"></a-icon>
          <span>{{ item.meta.title }}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path"></sub-menu>
      </template>
    </a-menu>
  </div>
</template>
<script>
import SubMenu from "./SubMenu.vue";
import { check } from "../utils/auth";

export default {
  props: {
    theme: {
      type: String,
      default: "light",
    },
  },
  components: {
    "sub-menu": SubMenu,
  },
  watch: {
    "$route.path": function (val) {
      this.selectedKeys = this.selectedKeysMap[val];
      this.openKeys = this.collapsed ? [] : this.openKeysMap[val];
    },
  },
  data() {
    this.selectedKeysMap = {};
    this.openKeysMap = {};
    // this.$router.options.routes可以拿到路由中的配置
    const menuData = this.getMenuData(this.$router.options.routes);
    return {
      selectedKeys: this.selectedKeysMap[this.$router.path],
      openKeys: this.collapsed ? [] : this.openKeysMap[this.$router.path],
      mode: "inline",
      collapsed: false,
      menuData,
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    getMenuData(routes = [], parentKeys = [], selectedKey) {
      const menuData = [];
      for (let item of routes) {
        if (item.meta && item.meta.authority && !check(item.meta.authority)) {
          break;
        }
        // routes.forEach((item) => {
        if (item.name && !item.hideInMenu) {
          this.openKeysMap[item.path] = parentKeys;
          this.selectedKeysMap[item.path] = [selectedKey || item.path];
          const newItem = { ...item }; // 解构
          delete newItem.children;
          if (item.children && !item.hideChildrenInMenu) {
            newItem.children = this.getMenuData(item.children, [
              ...parentKeys,
              item.path,
            ]);
          } else {
            this.getMenuData(
              item.children,
              selectedKey ? parentKeys : [...parentKeys, item.path],
              selectedKey || item.path
            );
          }
          menuData.push(newItem);
        } else if (
          !item.hideInMenu &&
          !item.hideChildrenInMenu &&
          item.children
        ) {
          menuData.push(
            ...this.getMenuData(item.children, [...parentKeys, item.path])
          );
        }
        // });
      }
      return menuData;
    },
  },
};
</script>

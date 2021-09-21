<template>
  <div id="app">
    <!-- <a-button>按钮</a-button> -->
    <!-- <div id="nav">
      <router-link to="/dashboard/analysis">dashboard</router-link> |
      <router-link to="/form">form</router-link>
    </div> -->
    <router-view />
    <!-- <RenderRouterView /> -->
  </div>
</template>

<script>
// import RenderRouterView from "@/components/RenderRouterView.vue";

export default {
  name: "App",
  components: {
    // RenderRouterView,
  },
};
</script>

<style lang="less"></style>

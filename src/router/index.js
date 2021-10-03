import Vue from "vue";
import { check, isLogin } from "../utils/auth";
import findLast from "lodash/findLast";
import VueRouter from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "../views/404";
import Forbidden from "../views/403";
import { notification } from "ant-design-vue";
// import RenderRouterView from "../components/RenderRouterView";

Vue.use(VueRouter);

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    meta: {
      authority: ["user", "admin"],
    },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis",
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          icon: "dashboard",
          title: "仪表盘",
        },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: {
              title: "分析页",
            },
            component: () =>
              import(
                /* webpackChunkName: "dashboard" */ "../views/Dashboard/Analysis"
              ),
          },
        ],
      },
      {
        path: "/form",
        name: "form",
        component: { render: (h) => h("router-view") },
        meta: {
          icon: "form",
          title: "表单",
          authority: ["admin"],
        },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: {
              title: "基础表单",
            },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/BasicForm"),
          },
          {
            path: "/form/step-form",
            name: "stepform",
            hideChildrenInMenu: true,
            meta: {
              title: "分步表单",
            },
            component: () =>
              import(/* webpackChunkName: "form" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info",
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step1"
                  ),
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step2"
                  ),
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "form" */ "../views/Forms/StepForm/Step3"
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/user",
    name: "user",
    hideInMenu: true,
    meta: {
      icon: "user",
      title: "用户",
    },
    // component: RenderRouterView,
    // component: { render: h => h("router-view") },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout"), // 异步加载
    children: [
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        path: "/user/login",
        name: "login",
        component: () => import("../views/User/Login"),
      },
      {
        path: "/user/register",
        name: "register",
        component: () => import("../views/User/Register"),
      },
    ],
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
    component: NotFound,
  },
  {
    path: "/403",
    name: "403",
    hideInMenu: true,
    component: Forbidden,
  },
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start();
  }

  const record = findLast(to.matched, (record) => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== "/user/login") {
      next({
        path: "/user/login",
      });
    } else if (to.path !== "/403") {
      // 提示框
      notification.error({
        message: "403",
        description: "请联系管理员",
      });

      // 跳到403页面
      next({
        path: "/403",
      });
    }
    NProgress.done();
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;

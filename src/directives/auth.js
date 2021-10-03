import { check } from "../utils/auth";

// 弊端：只有在第一次才会去控制，如果权限是动态的去更改的话，那么就没办法去控制，因为remove掉了
function install(Vue, options = {}) {
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    },
  });
}

export default {
  install,
};

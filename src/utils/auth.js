// 获取当前用户权限
export function getCurrentAuthority() {
  // 一般后端返回
  return ["admin"];
}

export function check(authority) {
  const current = getCurrentAuthority();
  return current.some((item) => authority.includes(item));
}

export function isLogin() {
  const current = getCurrentAuthority();
  return current && current[0] !== "guest";
}

const routes = {};

export const addRoute = (path, render) => {
  routes[path] = render;
};

export const navigateTo = (path) => {
  window.history.pushState({}, "", path);
  router();
};

export const router = () => {
  const path = window.location.pathname;
  const render = routes[path] || routes["/"];
  render();
};

window.addEventListener("popstate", router);
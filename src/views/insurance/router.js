import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/home/index.vue";
import subPage from "./pages/subpage/index.vue";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "首页"
      }
    },
    {
      path: "/subPage",
      name: "subPage",
      component: subPage,
      meta: {
        title: "子页面"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  // 路由发生变化修改页面title
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});

export default router;

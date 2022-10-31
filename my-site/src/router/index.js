import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
import { titleController } from "@/utils"



// 判断是否为传统方式（CDN）引入 （script）
if (!window.VueRouter) {
    Vue.use(VueRouter); //使用一个vue插件
}

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//路由的实例
const router = new VueRouter({
    //配置
    routes,
    mode: "history",
});


//设置页面标题
router.afterEach((to, from) => {
    titleController.setRouteTitle(to.meta.title);
})

export default router;
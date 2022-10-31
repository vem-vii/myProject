// 入口文件
// import "./mock"
import Vue from "vue";
import App from "./App.vue";
import "./styles/global.less";
import router from "./router";
import showMessage from "./utils/showMessage"
import "./eventBus";
import store from "./store";

store.dispatch("setting/fetchSetting").catch(() => {});

Vue.prototype.$showMessage = showMessage;

//注册全局指令
import vLoading from "./directives/loading";
import vLazy from "./directives/lazy";

Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);


new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');


// //测试事件总线


// function handler1(data = 1) {
//     console.log("handler1", data);
// }

// function handler2(data = 2) {
//     console.log("handler2", data);
// }

// eventBus.$on("event1", handler1)
// eventBus.$on("event1", handler2)
// eventBus.$on("event2", handler1)


// window.eventBus = eventBus;
// window.handler1 = handler1;
// window.handler2 = handler2;


//测试接口
// import * as blogApi from "./api/blog";


// blogApi.getBlog("litao").then((r) => {
//     console.log(r)
// })


// blogApi.postComment({
//     nickname: "昵称",
//     content: "评论内容,纯文本",
//     blogId: "123",
// }).then((r) => {
//     console.log(r);
// })

// blogApi.getComments("1213").then((r) => {
//     console.log(r);
// })

// vm.sayHello();
// 创建一个div加入到页面中
// import styles from "./styles/message.module.less";
// const div = document.createElement("div");
// div.className = styles.message;
// div.innerText = "litao"
// document.body.appendChild(div);

/**
  获取某个组件渲染的Dom根元素
*/
//     function getComponentRootDom(comp, props){
//       const vm = new Vue({
//         render: h => h(comp, {props})
//       });
//       console.log(vm);
//       vm.$mount();
//       return vm.$el;
//     }
// import Icon from "./components/Icon"
// var dom = getComponentRootDom(Icon, {type: "home"})
// console.log(dom);

//扩展vue实例上的方法
// Vue.prototype.sayHello = function(){
//   console.log("Hello!");
// }

// import showMessage from "./utils/showMessage";

// window.showMessage = showMessage;
// showMessage('litao', "error")

// --save：将保存配置信息到pacjage.json的dependencies节点中。

// --save-dev：将保存配置信息到pacjage.json的devDependencies节点中。

// dependencies：运行时的依赖，发布后，即生产环境下还需要用的模块

// devDependencies：开发时的依赖。里面的模块是开发时用的，发布时用不到它。
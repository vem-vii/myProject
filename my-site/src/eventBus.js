// const listeners = {};
// //事件总线
// export default {
//     //监听某一个事件
//     $on(eventName, handler) {
//         if (!listeners[eventName]) {
//             listeners[eventName] = new Set();
//         }
//         listeners[eventName].add(handler);
//     },

//     //取消监听
//     $off(eventName, handler) {
//         if (!listeners[eventName]) {
//             return;
//         }
//         listeners[eventName].delete(handler);
//     },

//     //触发事件
//     $emit(eventName, ...args) {
//         if (!listeners[eventName]) {
//             return;
//         }

//         //
//         for (const handler of listeners[eventName]) {
//             handler(...args);
//         }
//     }
// }


// 事件总线
// Vue实例中包含众多方法和事件（$emit $off $on） 
import Vue from "vue";
const app = new Vue({});
/**
 * 事件名：mainScroll
 * 含义：主区域滚动条位置变化后触发
 * 参数
 *      滚动的dom元素， 如果是undefined 则表示dom元素已经不存在
 */

Vue.prototype.$bus = app; //在main.js中的vue实例prototype上添加一个实例
export default app
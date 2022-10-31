/*
 * @Author: 1401771935@qq.com 1401771935@qq.com
 * @Date: 2022-05-16 06:04:16
 * @LastEditors: 1401771935@qq.com 1401771935@qq.com
 * @LastEditTime: 2022-05-27 10:27:22
 * @FilePath: \搭建工程\my-site\src\utils\getComponentRootDom.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
  import Vue from 'vue';
  /**
    获取某个组件渲染的Dom根元素
  */
export default function(comp, props){
      const vm = new Vue({
        render: h => h(comp, {props})
      });
      vm.$mount();
      return vm.$el;
    }
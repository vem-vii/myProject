<!--
 * @Author: your name
 * @Date: 2022-04-29 17:16:29
 * @LastEditTime: 2022-05-03 11:58:07
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \搭建工程\my-site\src\components\Empty\index.vue
-->
<template>
    <div class="empty-container">
        <Icon type="empty" />
        <p>{{text}}</p>
    </div>
</template>

<script>
import Icon from "../Icon";
export default {
    components: {
        Icon,
    },
    props: {
       text: {
           type: String,
           default: "无数据",
       }
   }
}
</script>

<style scoped lang="less">
@import "~@/styles/mixin.less";
@import "~@/styles/var.less";
    .empty-container {
        .self-center();
        color: gray;
        text-align: center;
    }
    .iconfont-container{
        font-size: 72px;
    }
</style>
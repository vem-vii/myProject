<!--
 * @Author: your name
 * @Date: 2022-04-20 21:20:53
 * @LastEditTime: 2022-07-18 15:24:37
 * @LastEditors: 1401771935@qq.com 1401771935@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue\搭建工程\my-site\src\commponents\Avatar.vue
-->

<template>
  <img
    class="avatar-container"
    :src="url"
    :style="{
      width: size + 'px',
      height: size + 'px',
    }"
  />
</template>

<script>
export default {
  // props: ["url"]

  // props: {
  //   url: string,//url属性必须是一个字符串
  // }

  props: {
    url: {
      type: String, //url属性必须是一个字符串
      required: true, //属性必须传递
    },

    size: {
      type: Number,
      default: 100, //尺寸默认值
    },
  },
};
</script>

<style scoped>
/* scoped形成一个作用域的样式*/
.avatar-container {
  border-radius: 50%;
  object-fit: cover;
  display: block;
}
</style>
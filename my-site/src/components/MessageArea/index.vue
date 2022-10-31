<template>
  <div class="message-area-container">
    <!-- v-on="$listeners"将所有监听器指向这个组件的某个特定的子元素  
    $listeners从父组件获取到
     -->
    <DataForm v-on="$listeners" />
    <!-- 这里的v-on="$listeners" 
    等效于在这个组件内 v-on={submit: handleSubmit(){}}
    在methods中在定义一个handleSubmit方法去方法内使用emit()事件
    再向上抛出数据触发父组件事件处理数据
    -->

    <h3>
      {{ title }}
      <span>{{ subTitle }}</span>
    </h3>
    <DataList :list="list" />
    <!-- isListLoading 放在props中用来接受父组件BlogComment传递来的布尔值 -->
    <div class="loading" v-loading="isListLoading"></div>
  </div>
</template>

<script>
import DataForm from "./DataForm";
import DataList from "./DataList";
export default {
  // props接收父组件传递的数据
  props: {
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    list: {
      type: Array,
      default: () => [],
    },
    isListLoading: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    DataForm,
    DataList,
  },
};
</script>

<style scoped lang="less">
.loading {
  position: relative;
  height: 100px;
}
</style>

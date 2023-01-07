<script setup lang="ts">
import { onMounted, ref } from "vue";
  
// 导入LF核心模块和对应的样式文件
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";

// 声明容器的对应ref对象和LF对象
const container = ref();
const lf = ref<LogicFlow>();

onMounted(() => {
  lf.value = new LogicFlow({
    // 通过选项指定了渲染的容器和需要显示网格
    container: container.value,
    grid: true,
  })
  lf.value.render();
})
</script>

<template>
	<!--  提供一个LF渲染的容器  -->
  <div ref="container" class="container"></div>
</template>

<style scoped>
.container {
  width: 500px;
  height: 400px;
}
</style>

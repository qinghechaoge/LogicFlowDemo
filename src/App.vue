<template>
    <div>
        <span class="node" @mousedown="onStart('storageTank1')">罐子</span>
    </div>
    <!--  提供一个LF渲染的容器  -->
    <div ref="container" class="container"></div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

// 导入LF核心模块和对应的样式文件
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";

import registerStorageTank from './views/node/registerStorageTank.js'

// 声明容器的对应ref对象和LF对象
const container = ref();
const lf = ref<LogicFlow>();

const graphData = {
    nodes: [
        {
            id: '681035e6-11e3-43d7-9392-1deed852c01a',
            type: 'storageTank1',
            x: 300,
            y: 100
        }
    ],
    edges: []
}

onMounted(() => {
    lf.value = new LogicFlow({
        // 通过选项指定了渲染的容器和需要显示网格
        container: container.value,
        grid: true,
    })
    registerStorageTank(lf.value, 'storageTank1');
    lf.value.on('custom:event', (r) => {
        console.log(r)
    });
    lf.value.render(graphData);
})

function onStart(type: any) {
    lf.value?.dnd.startDrag({
        type,
        text: `${type}节点`
    });
}
</script>
<style scoped>
.container {
    width: 500px;
    height: 400px;
}

.node {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>

<template>
    <div>
        <span class="node" @mousedown.prevent="onStart('storageTank1')">罐子</span>
        <span class="node" @mousedown.prevent="onStart('storageTank2')">罐子2</span>
    </div>
    <!--  提供一个LF渲染的容器  -->
    <div ref="container" class="container"></div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import { all_svg } from './assets/images/flow/index';

// 导入LF核心模块和对应的样式文件
import LogicFlow from "@logicflow/core";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";

import registerStorageTank from './views/node/registerStorageTank'
import registerLine from './views/node/registerLine'
import registerArrow from './views/node/registerArrow'

// 声明容器的对应ref对象和LF对象
const container = ref();
const lf = ref<LogicFlow>();

const graphData = {
    nodes: [
        {
            id: '1',
            type: 'storageTank1',
            x: 300,
            y: 100
        },
        {
            id: '2',
            type: 'customline',
            x: 100,
            y: 100
        },
        {
            id: '3',
            type: 'arrow',
            properties: {
                anchorsOffset:[[0,0],[-15,15],[-15,0],[-15,-15]],
                deg: 180,
                width:30
            },
            x: 100,
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
    registerLine(lf.value);
    registerArrow(lf.value);
    all_svg['storageTank2'] = './src/assets/images/flow/storageTank/storageTank2.svg';
    registerStorageTank(lf.value, 'storageTank2');
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

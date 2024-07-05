<template>
    <div>
        <span class="node" @mousedown="onStart('CustomNode')">CustomNode</span>
        <span class="node" @mousedown="onStart('storageTank1')">storageTank1</span>
    </div>
  <!--  提供一个LF渲染的容器  -->
    <div ref="container" class="container"></div>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";

// 导入LF核心模块和对应的样式文件
import LogicFlow from "@logicflow/core";
import {Menu} from "@logicflow/extension";
import "@logicflow/core/dist/style/index.css";
import "@logicflow/extension/lib/style/index.css";

import CustomNode from "./CustomNode";
import registerStorageTank from './views/node/registerStorageTank.js'

// 声明容器的对应ref对象和LF对象
const container = ref();
const lf = ref<LogicFlow>();

const graphData = {
    nodes: [
        {
            id: 'fba7fc7b-83a8-4edd-b4be-21f694a5d490',
            type: 'CustomNode',
            x: 100,
            y: 100,
        },
        {
            id: '681035e6-11e3-43d7-9392-1deed852c01a',
            type: 'rect',
            x: 300,
            y: 100
        }
    ],
    edges: [
        {
            sourceNodeId: 'fba7fc7b-83a8-4edd-b4be-21f694a5d490',
            targetNodeId: '681035e6-11e3-43d7-9392-1deed852c01a',
            type: 'polyline'
        }
    ]
}

const menuConfig = {
    nodeMenu: [
        {
            text: '分享',
            callback() {
                alert('分享成功！');
            }
        },
        {
            text: '属性',
            callback(node: any) {
                alert(`
          节点id：${node.id}
          节点类型：${node.type}
          节点坐标：(x: ${node.x}, y: ${node.y})`
                );
            },
        },
    ],
    edgeMenu: false, // 删除默认的边右键菜单
    graphMenu: [], // 覆盖默认的边右键菜单，与false表现一样
};

onMounted(() => {
    lf.value = new LogicFlow({
        // 通过选项指定了渲染的容器和需要显示网格
        container: container.value,
        grid: true,
        plugins: [Menu]
    })
    lf.value.extension.menu.addMenuConfig(menuConfig);
    lf.value.extension.menu.setMenuByType({
        type: 'rect',
        menu: [
            {
                text: '分享',
                callback() {
                    alert('分享成功ByType！');
                }
            },
        ]
    })
    lf.value.register(CustomNode);
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

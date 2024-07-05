import { RectNode, RectNodeModel } from '@logicflow/core';

class CustomNodeModel extends RectNodeModel {
  setAttributes() {
    this.stroke = '#1E90FF';
    this.fill = '#F0F8FF';
    this.radius = 10;
    const { properties: { isDisabledNode } } = this;
    if (!isDisabledNode) {
      // 单独为非禁用的元素设置菜单。
      this.menu = [
        {
          text: 'del',
          callback: (node: any) => {
            this.graphModel.deleteNode(node.id);
            this.graphModel.eventCenter.emit('custom:event', node);
          },
        },
        {
          text: 'edit',
          callback: (node: any) => {
            this.graphModel.setElementStateById(node.id, 2);
          },
        },
        {
          text: 'copy',
          callback: (node: any) => {
            this.graphModel.cloneNode(node.id);
          },
        },
      ];
    }
  }
}

export default {
    type: "CustomNode",
    view: RectNode,
    model: CustomNodeModel,
}
import { HtmlNodeModel, HtmlNode } from '@logicflow/core';

export default function registerCustomLine(lf) {
  lf.register('customline', () => {
    class LineModel extends HtmlNodeModel {
      constructor(data, graphModel) {
        super(data, graphModel);
        const { width = 100, height = 2 } = data.properties;
        this.width = width;
        this.height = height;
        this.anchorsOffset = [
          [-50, 1],
          [50, 1],
        ];
      }
    }

    class LineNode extends HtmlNode {
      constructor(data, graphModel) {
        super(data, graphModel);
      }
      setHtml(rootEl) {
        const attributes = this.props.model;
        const { properties } = attributes;
        let { bgColor = '#000000', width = 100, height = 2 } = properties;
        const el = document.createElement('div');
        el.className = 'uml';
        if (!bgColor) {
          bgColor = '#000000';
        }
        const html = `
      <div>
        <div style="background-color:${bgColor};width:${width}px;height:${height}px"></div>
      </div>
    `;
        el.innerHTML = html;
        // 需要先把之前渲染的子节点清除掉。
        rootEl.innerHTML = '';
        rootEl.appendChild(el);
      }
    }
    return {
      view: LineNode,
      model: LineModel,
    };
  });
}

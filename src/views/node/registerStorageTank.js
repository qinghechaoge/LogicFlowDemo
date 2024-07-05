import { HtmlNodeModel, HtmlNode } from '@logicflow/core';
import { all_svg } from '../../assets/images/flow/index';

export default function registerStorageTank(lf, custom) {
  lf.register(custom, () => {
    class UmlModel extends HtmlNodeModel {
      constructor(data, graphModel) {
        super(data, graphModel);
        const { width = 100, height = 100, text = '' } = data.properties;
        this.width = width;
        this.height = height;
        this.anchorsOffset = [
          [50, 0],
          [0, 50],
          [-50, 0],
          [0, -50],
        ];
        data.text = {
          value: text,
          x: data.x,
          y: data.y + 35,
        };
      }
    }

    class UmlNode extends HtmlNode {
      constructor(data, graphModel) {
        data.text = {
          value: (data.text && data.text.value) || '字体',
          x: data.x,
          y: data.y,
          draggable: true,
        };
        super(data, graphModel);
      }

      getTextStyle() {
        const attributes = this.props.model;
        const { properties } = attributes;
        const { fontColor = '#323232', fontSize = 12, fontLineHeight = 1.5, deg = 0 } = properties;
        return {
          fontSize: fontSize,
          color: fontColor,
          autoWrap: true,
          lineHeight: fontLineHeight,
          fontFamily: '黑体',
          wrapPadding: '2px 3px',
        };
      }

      setHtml(rootEl) {
        const attributes = this.props.model;
        const { properties } = attributes;
        const { deg = 0 } = properties;
        const el = document.createElement('div');
        el.className = 'uml';
        const html = `
                <div>
                 <img src="${all_svg[custom]}" style="width:100%;height:100%;transform:rotate(${deg}deg);"/>
                </div>
              `;
        el.innerHTML = html;
        // 需要先把之前渲染的子节点清除掉。
        rootEl.innerHTML = '';
        rootEl.appendChild(el);
      }
    }
    return {
      view: UmlNode,
      model: UmlModel,
    };
  });
}

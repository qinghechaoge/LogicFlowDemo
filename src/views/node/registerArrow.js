import { HtmlNodeModel, HtmlNode } from '@logicflow/core';

export default function registerArrow(lf, custom) {
  lf.register('arrow', () => {
    class ArrowModel extends HtmlNodeModel {
      constructor(data, graphModel) {
        super(data, graphModel);
        const { width = 60, height = 60, text = '', anchorsOffset= [
          [0, 0],
          [-30, 30],
          [-30, 0],
          [-30, -30],
        ] } = data.properties;
        this.width = width;
        this.height = width;
        this.anchorsOffset = anchorsOffset;
        data.text = {
          value: text,
          x: data.x,
          y: data.y + 35,
        };
      }
    }

    class ArrowNode extends HtmlNode {
      constructor(data, graphModel) {
        data.text = {
          value: '',
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
        debugger
        const attributes = this.props.model;
        const { properties } = attributes;
        const { deg = 180, bgColor = '#909090', width = 60 } = properties;
        const el = document.createElement('div');
        el.className = 'arrow';
        const html = `
                <div>
                 <span style="float: left;width: 0; height: 0;border-width: ${
                   width / 2
                 }px;border-style: solid;border-color: transparent ${bgColor} transparent transparent;transform: rotate(${deg}deg);"></span>
                </div>
              `;
        el.innerHTML = html;
        // 需要先把之前渲染的子节点清除掉。
        rootEl.innerHTML = '';
        rootEl.appendChild(el);
      }
      setAttributes(){
        debugger
      }
    }
    return {
      view: ArrowNode,
      model: ArrowModel,
    };
  });
}

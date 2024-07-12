<template>
  <div>
    <a-form :label-col="{ style: { width: '70px' } }" :model="formData">
      <a-form-item label="名称">
        <a-input v-model:value="formData.text" size="mini" />
      </a-form-item>
      <a-form-item label="字体颜色">
        <a-input type="color" v-model:value="formData.fontColor" />
      </a-form-item>
      <a-form-item label="字体大小">
        <a-input-number size="mini" v-model:value="formData.fontSize" controls-position="right" :min="12" :max="99" />
      </a-form-item>
      <a-form-item label="旋转角度">
        <a-input-number size="mini" v-model:value="formData.deg" controls-position="right" :min="0" :max="360" />
      </a-form-item>
      <!-- <a-form-item label="行高">
          <a-input size="mini" v-model.number="formData.fontLineHeight" type="number"></a-input>
        </a-form-item> -->
      <a-form-item label="宽度">
        <a-input v-model:value="formData.width" type="number" size="mini" />
      </a-form-item>
      <a-form-item label="高度">
        <a-input v-model:value="formData.height" type="number" size="mini" />
      </a-form-item>
      <a-form-item label="锚点">
        <a-button size="mini" type="text" preIcon="ant-design:plus-outlined" style="margin-left: 150px" @click="handleAdd" />
        <div v-for="(item, index) in formData.anchorsOffset" :key="index">
          <div>
            <a-input v-model:value.number="formData.anchorsOffset[index][0]" type="number" size="mini" class="dot-item" />
            <a-input v-model:value.number="formData.anchorsOffset[index][1]" type="number" size="mini" class="dot-item" />
            <a-button size="mini" type="text" preIcon="ant-design:delete-outlined" @click="handleRemove(index)" />
          </div>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  export default {
    name: '',
    props: {
      nodeData: Object,
      lf: Object || String,
    },
    data() {
      return {
        textX: 50,
        textY: 100,
        formData: {
          text: '',
          textX: 0,
          textY: 35,
          width: 100,
          height: 100,
          fontColor: '#323232',
          fontSize: 12,
          deg: 0,
          // fontLineHeight: 1.5,
          anchorsOffset: [
            [50, 0],
            [0, 50],
            [-50, 0],
            [0, -50],
          ],
        },
      };
    },
    watch: {
      formData: {
        handler: function () {
          this.onSubmit();
        },
        deep: true,
      },
    },
    mounted() {
      console.log('21', this.$props.nodeData);
      const { properties, text } = this.$props.nodeData;
      if (properties) {
        this.formData = Object.assign({}, this.$data.formData, properties);
      }
      if (text && text.value) {
        this.formData.text = text.value;
      }
    },
    methods: {
      onSubmit() {
        console.log(this.$props.nodeData);
        const { id, x, y } = this.$props.nodeData;
        this.$props.lf.setProperties(id, this.formData);
        this.$props.lf.getModelById(id).updateAttributes({
          width: this.formData.width,
          height: this.formData.height,
          anchorsOffset: this.formData.anchorsOffset,
          text: {
            value: this.formData.text,
            x: x + this.formData.textX,
            y: y + this.formData.textY,
          },
        });
        console.log(id);
        // this.$forceUpdate()
        // this.$props.lf.updateText(id, this.$data.formData.text);
        // this.$props.lf.changeNodeType({id, type:'curved-edge'})
        // this.$props.lf.getNodeModel(id);
        // console.log(this.$props.lf.getNodeModel(id));
        // console.log('22222111',this.$props.lf.getNodeData(id));
        // this.$props.lf.updateEditConfig({
        //   stopZoomGraph: true,
        // });
        // this.$props.lf.setNodeData({
        //   id,
        //   properties: this.$data.formData
        // });
        // this.$props.lf.setTheme({
        //   rect: {
        //     width: 100,
        //     height: 30,
        //     radius: 2,
        //     fill: "#34415b",
        //     strokeWidth: 0,
        //   },
        // });
        // console.log('this.demoData==>',this.demoData)
        // let data = JSON.parse(JSON.stringify(this.demoData))
        // data.nodes = data.nodes.map(e=>{
        //   if(e.id==id){
        //     e.properties = this.$data.formData
        //   }
        //   return e
        // })

        // this.$emit("onClose");
      },
      handleAdd() {
        this.formData.anchorsOffset.push(Array(2).fill(0));
      },
      handleRemove(index) {
        this.formData.anchorsOffset.splice(index, 1);
      },
    },
  };
</script>

<style lang="less" scoped>
  .dot-add {
    font-size: 18px;
  }
  .dot-item {
    width: 80px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
</style>

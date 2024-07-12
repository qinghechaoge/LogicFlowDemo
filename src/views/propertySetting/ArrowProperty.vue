<template>
  <div>
    <a-form :label-col="{ style: { width: '70px' } }" :model="formData">
      <a-form-item label="旋转角度">
        <a-input-number size="mini" v-model:value="formData.deg" controls-position="right" :min="0" :max="360" />
      </a-form-item>
      <a-form-item label="大小">
        <a-input v-model:value="formData.width" type="number" size="mini" />
      </a-form-item>
      <a-form-item label="背景色">
        <a-input type="color" v-model:value="formData.bgColor" />
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
          width: 60,
          deg: 180,
          bgColor: '#909090',
          anchorsOffset: [
            [0, 0],
            [-30, 30],
            [-30, 0],
            [-30, -30],
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
    },
    methods: {
      onSubmit() {
        console.log(this.$props.nodeData);
        const { id, x, y } = this.$props.nodeData;
        this.$props.lf.setProperties(id, this.formData);
        this.$props.lf.getModelById(id).updateAttributes({
          width: this.formData.width,
          height: this.formData.width,
          anchorsOffset: this.formData.anchorsOffset,
          text: {
            x: x + this.formData.textX,
            y: y + this.formData.textY,
          },
        });
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

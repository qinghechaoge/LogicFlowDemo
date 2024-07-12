<template>
  <div>
    <a-form :label-col="{ style: { width: '100px' } }" :model="formData">
      <a-form-item label="背景色">
        <a-input type="color" show-alpha v-model:value="formData.bgColor" />
      </a-form-item>
      <a-form-item label="类型">
        <a-radio-group v-model:value="formData.type" button-style="solid" @change="changeType">
          <a-radio-button value="horizontal">横线</a-radio-button>
          <a-radio-button value="vertical">竖线</a-radio-button>
        </a-radio-group>
      </a-form-item>
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
        formData: {
          bgColor: '#000000',
          type: 'horizontal',
          width: 100,
          height: 2,
          anchorsOffset: [
            [-50, 0],
            [50, 0],
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
      const { properties, text } = this.$props.nodeData;
      if (properties) {
        this.formData = Object.assign({}, this.$data.formData, properties);
      }
    },
    methods: {
      changeType() {
        let height = this.formData.height;
        let width = this.formData.width;
        let arr = this.formData.anchorsOffset;
        this.formData.width = height;
        this.formData.height = width;
        this.formData.anchorsOffset = [
          [arr[0][1], arr[0][0]],
          [arr[1][1], arr[1][0]],
        ];
      },
      onSubmit() {
        const { id } = this.$props.nodeData;
        this.$props.lf.setProperties(id, this.formData);
        this.$props.lf.getModelById(id).updateAttributes({
          width: this.formData.width,
          height: this.formData.height,
          bgColor: this.formData.bgColor,
          anchorsOffset: this.formData.anchorsOffset,
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

<template>
  <div>
    <a-form :label-col="{ style: { width: '70px' } }" :model="formData">
      <a-form-item label="数据源">
        <a-input v-model:value="formData.sourceCode" size="mini" />
      </a-form-item>
      <a-form-item label="名称">
        <a-input v-model:value="formData.tagText" size="mini" />
      </a-form-item>
      <a-form-item label="标识符">
        <a-input v-model:value="formData.tagLabel" size="mini" />
      </a-form-item>
      <a-form-item label="背景色">
        <a-input type="color" show-alpha v-model:value="formData.tagBg" />
      </a-form-item>
      <a-form-item label="宽度">
        <a-input v-model:value="formData.width" type="number" size="mini" />
      </a-form-item>
      <a-form-item label="内容高度">
        <a-input v-model:value="formData.height" type="number" size="mini" />
      </a-form-item>
      <a-form-item label="底部标签">
        <a-switch size="mini" v-model:checked="formData.isTagAfter" active-color="#13ce66" inactive-color="#909090" />
      </a-form-item>

      <!--      <a-form-item v-if="formData.isTagAfter" label="位号2">-->
      <!--        &lt;!&ndash;        <a-select size="mini" v-model:value="formData.sourceCode2" filterable>&ndash;&gt;-->
      <!--        &lt;!&ndash;          <a-select-option v-for="item in tagList" :key="item.code" :label="item.pointName" :value="item.code" />&ndash;&gt;-->
      <!--        &lt;!&ndash;        </a-select>&ndash;&gt;-->
      <!--        <SelPoint-->
      <!--          v-model:value="formData.sourceCode2"-->
      <!--          :selComPath="SelPointModal"-->
      <!--          :params="{-->
      <!--            facilityId: facilityId,-->
      <!--            facilityType: facilityType,-->
      <!--          }"-->
      <!--          @change="-->
      <!--            (_, row) => {-->
      <!--              row && (formData.tagBeLabel = row.pointName);-->
      <!--            }-->
      <!--          "-->
      <!--          isRadioSelection="true"-->
      <!--          placeholder="请选择采样点"-->
      <!--        />-->
      <!--      </a-form-item>-->
      <a-form-item v-if="formData.isTagAfter" label="底部标签">
        <a-input v-model:value="formData.tagAfLabel" size="mini" />
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
  import SelPointModal from '/@/views/common/bizmodal/facility/selSamplePoint/selTablePoint.vue';
  export default {
    name: '',
    props: {
      nodeData: Object,
      lf: Object || String,
      tagList: Array,
      facilityId: String,
      facilityType: String,
    },
    data() {
      return {
        SelPointModal: SelPointModal,
        formData: {
          sourceCode: '',
          sourceCode2: '',
          tagText: '',
          tagBg: 'rgba(91, 91, 91, 1)',
          tagBeLabel: '',
          tagAfLabel: '',
          tagUnit: '',
          tagBefore: '',
          tagAfter: '',
          tagLabel: '',
          isTagAfter: false,
          width: 100,
          lineNum: 1,
          height: 20,
          anchorsOffset: [
            [50, 0],
            [0, 30],
            [-50, 0],
            [0, -30],
          ],
        },
      };
    },
    computed: {
      SelFormModal() {
        return SelFormModal;
      },
    },
    watch: {
      formData: {
        handler: function () {
          this.onSubmit();
        },
        deep: true,
      },
      'formData.isTagAfter'(val) {
        if (!val) {
          this.formData.sourceCode2 = '';
          this.formData.tagAfLabel = '';
        }
      },
    },
    mounted() {
      const { properties, text } = this.$props.nodeData;
      if (properties) {
        this.formData = Object.assign({}, this.$data.formData, properties);
      }
      if (text && text.value) {
        this.formData.text = text.value;
      }
    },
    methods: {
      /**
       * 提交
       */
      onSubmit() {
        const { id } = this.$props.nodeData;
        this.$props.lf.setProperties(id, this.formData);
        this.$props.lf.getModelById(id).updateAttributes({
          anchorsOffset: this.formData.anchorsOffset,
          sourceCode: this.formData.sourceCode,
          sourceCode2: this.formData.sourceCode2,
          tagText: this.formData.tagText,
          tagBg: this.formData.tagBg,
          tagBeLabel: this.formData.tagBeLabel,
          tagAfLabel: this.formData.tagAfLabel,
          tagUnit: this.formData.tagUnit,
          width: this.formData.width,
          height: this.formData.isTagAfter ? this.formData.height * 3 : this.formData.height * 2,
          tagBefore: '',
          tagAfter: '',
          isTagAfter: this.formData.isTagAfter,
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

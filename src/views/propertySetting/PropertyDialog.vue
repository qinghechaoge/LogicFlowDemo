<template>
  <div class="property-dialog">
    <CommonProperty v-if="type == 'storageTank'" :nodeData="nodeData" :lf="lf" @onClose="handleClose" />
    <TagProperty
      v-if="type == 'tag'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
      :tagList="tagList"
      :facilityId="facilityId"
      :facilityType="facilityType"
    />
    <TagTextProperty
      v-if="type == 'tagText'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
      :tagList="tagList"
      :facilityId="facilityId"
      :facilityType="facilityType"
    />
    <ValveProperty
      v-if="type == 'condition'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
      :tagList="tagList"
      :facilityId="facilityId"
      :facilityType="facilityType"
    />
    <LiqlevPropertyVue
      v-if="type == 'liqlev'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
      :tagList="tagList"
      :facilityId="facilityId"
      :facilityType="facilityType"
    />
    <PumpProertyVue
      v-if="type == 'pump'"
      :nodeData="nodeData"
      :lf="lf"
      @onClose="handleClose"
      :tagList="tagList"
      :facilityId="facilityId"
      :facilityType="facilityType"
    />
    <ArrowProerty v-if="type == 'arrow'" :nodeData="nodeData" :lf="lf" @onClose="handleClose" />
    <CustomLineProerty v-if="type == 'customline'" :nodeData="nodeData" :lf="lf" @onClose="handleClose" />
    <BaseGrap v-if="type == 'cusCircle' || type == 'diamond'" :nodeData="nodeData" :lf="lf" @onClose="handleClose" />
    <VuePropety v-if="type == 'vueNode'" :nodeData="nodeData" :lf="lf" @onClose="handleClose" />
  </div>
</template>

<script>
  import { $emit } from '..//gogocodeTransfer';
  import CommonProperty from './CommonProperty.vue';
  import TagProperty from './TagProperty.vue';
  import TagTextProperty from './TagTextProperty.vue';
  import ValveProperty from './ValveProperty.vue';
  import LiqlevPropertyVue from './LiqlevProperty.vue';
  import PumpProertyVue from './PumpProerty.vue';
  import ArrowProerty from './ArrowProperty.vue';
  import CustomLineProerty from './CustomLineProperty.vue';
  import BaseGrap from './BaseGrap.vue';
  import VuePropety from './VuePropety.vue';
  export default {
    name: 'PropertyDialog',
    components: {
      CommonProperty,
      TagProperty,
      TagTextProperty,
      ValveProperty,
      LiqlevPropertyVue,
      PumpProertyVue,
      ArrowProerty,
      CustomLineProerty,
      BaseGrap,
      VuePropety,
    },
    props: {
      nodeData: Object,
      lf: Object,
      tagList: Array,
      facilityId: String,
      facilityType: String,
    },
    emits: ['setPropertiesFinish'],
    data() {
      return {
        type: '',
      };
    },
    mounted() {
      let reg = /^storageTank|^valve|^equipment|^fan|^building|^boiler|^industrial|^atmoVa|^valvetwo/;
      if (reg.test(this.nodeData.type)) {
        this.type = 'storageTank';
      } else {
        this.type = this.nodeData.type;
      }
    },
    methods: {
      handleClose(val) {
        $emit(this, 'setPropertiesFinish', val);
      },
    },
  };
</script>

<style>
  .property-dialog {
    padding: 2px;
  }
</style>

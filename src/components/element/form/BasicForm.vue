<template>
  <el-form :model="form"  class="form">
    <div v-if="title" class="title">{{ title }}</div>
    <template v-for="item in schemas" :key="item.title">
      <FormGroup :gutter="item.gutter" :title="item.title" :schemaArr="item.includeSchema" :form="form">
        <!-- 插槽的透传 -->
          <template v-slot:[s.prop] v-for="s in allCustom">
            <slot :name="s.prop"></slot>
          </template>
      </FormGroup>
    </template>
    <el-form-item v-if="action">
      <slot name="footer">
        <el-row type="flex" justify="end">
          <el-button >{{action.cancelText || '取消'}}</el-button>
          <el-button @click="confirm" type="primary">{{action.confirmText || '确定'}}</el-button>
        </el-row>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script>
import { defineComponent, ref, unref } from "vue";
import FormGroup from "./FormGroup.vue";
//import _ from 'lodash'
export default defineComponent({
  name: "BasicForm",
  components: {
    FormGroup,
  },
  props: {
    form: {
      type: Object,
      default: () => {return{}},
    },
    rules: {
      type: Object,
      default: () => {},
    },
    schemas: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: "",
    },
    action:{
      type:Object,
      default:()=>{}
    }
  },
  setup(props, { emit }) {
    const form = unref(props).form
    const allCustom = ref([]);
    props.schemas.forEach((item) => {
      item.includeSchema.forEach((item) => {
        item.component == "CUSTOM" && allCustom.value.push(item);
      });
    });

    const confirm = () => {
      emit('submit',form)
    }
    return {
      allCustom,
      confirm,
    };
  },
});
</script>

<style lang="scss">
.form {
  .title {
    font-size: 20px;
    color: #303133;
    padding: 10px 0 10px 0px;
  }
}
</style>

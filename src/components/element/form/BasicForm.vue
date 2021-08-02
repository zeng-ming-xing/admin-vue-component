<template>
  <el-form :model="form"  class="form">
    <div v-if="title" class="title">{{ title }}</div>
    <template v-for="item in schemas" :key="item.title">
      <FormGroup :gutter="item.gutter" :title="item.title" :schemaArr="item.includeSchema" :form="form">
          <template v-slot:[s.prop] v-for="s in allCustom">
            <slot :name="s.prop"></slot>
          </template>
      </FormGroup>
    </template>
  </el-form>
</template>

<script>
import { defineComponent, ref } from "vue";
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
  },
  setup(props) {
    const allCustom = ref([]);
    props.schemas.forEach((item) => {
      item.includeSchema.forEach((item) => {
        item.component == "CUSTOM" && allCustom.value.push(item);
      });
    });
    return {
      allCustom,
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

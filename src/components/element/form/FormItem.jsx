import mapComponent from './mapComponent'
import { defineComponent, computed, unref } from "vue";
export default defineComponent({
  name: "FormItem",
  props: {
    modelValue: {
      type: [String, Boolean, Number, Array, Date],
      default: null,
    },
    type: {
      type: String,
      default: "INPUT",
    },
    componentProps: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, { emit }) {
    const bindValue = computed({
      get: () => {
        return unref(props).modelValue;
      },
      set: (val) => {
        emit("update:modelValue", val);
      },
    });
    const componentProps = unref(props).componentProps;
    const renderComponent = mapComponent[props.type];
    return () => {
      return (
        <renderComponent
          v-model={bindValue.value}
          {...componentProps}
        ></renderComponent>
      );
    };
  },
});


import { defineComponent, toRefs, unref } from 'vue';
import { ElImage } from 'element-plus';

const defineComponentMap = {
  TEXT: (props) => {
    return <span {...unref(props?.componentProps)}>{unref(props.cellData)}</span>;
  },
  IMAGE: (props) => {
    const srcList = [props?.data]
    return <ElImage preview-src-list={srcList}  {...unref(props?.componentProps)} src={unref(props?.cellData)}></ElImage>;
  }
};
export default defineComponent({
  name: "TableCol",
  props: {
    cellData: {
      require: true,
    },
    key: {
      require: true,
    },
    type: {
      require: true,
      default: 'TEXT'
    },
    row: {
      type:Object
    },
    componentProps:{
      type:Object
    }
  },
  setup(props,{ attrs }) {
    const RenderComponent = defineComponentMap[props.type || 'TEXT']
    return () =>  
    {
      const componentProp = {
        ...toRefs(props),
        ...attrs
      }
    return <RenderComponent {...componentProp} />
  }
  },
})


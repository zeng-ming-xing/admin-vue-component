import upload from './components/FileUpload.vue'
export default {
  input: (props) => {
    return <el-input v-model={props.modelValue} {...props} ></el-input>;
  },
  select: (props) => {
    return (
      <el-select v-model={props.modelValue}>
        {props.options.map((item) => {
          return <el-option label={item.label} value={item.value}></el-option>;
        })}
      </el-select>
    );
  },
  image:(props)=>{
    const reviewList = [props.modelValue]
    return (
      <el-image src={props.modelValue} preview-src-list={reviewList}></el-image>
    )
  },
  uploadFile:(props)=>{
    return (<upload v-model={props.modelValue} {...props}></upload>)
  }
};
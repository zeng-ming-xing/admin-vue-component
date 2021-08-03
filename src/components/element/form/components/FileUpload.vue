<template>
  <div class="file-upload">
    <el-upload
      :multiple="isMultiple"
      action=""
      drag
      :http-request="handleRequest"
      :accept="joinUploadType"
      :before-upload="beforeUpload"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :disabled="uploadIng"
    >
      <div v-if="!uploadIng">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__text">只能上传{{ joinUploadType }}文件</div>
      </div>
      <div v-else>
        <div>上传中...</div>
        <el-progress type="circle" :percentage="percentage" />
      </div>
    </el-upload>
    <div>
      <el-input v-if="modelValue" v-model="bindValue" :disabled="true" />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed, unref } from 'vue'
export default defineComponent ({
  name: 'FileUpload',
  props: {
    // 允许传递的文件类型
    uploadType: {
      type: Array,
      default: () => [],
    },
    // 是否可以多选
    isMultiple: {
      type: Boolean,
      default: false,
    },
    // 上传前执行的操作，参数为选中文件
    beforeUploadFunc: {
      type: Function,
      default: () => {},
    },
    // 上传的目录
    uploadDir: {
      type: String,
      default: 'course',
    },
    // 上传之后的url
    modelValue: {
      type: String,
      default: '',
    },
    // 上传时额外配置
    option: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { emit } ){
    //v-model透传
    const bindValue = computed({
      get:()=>{
        return unref(props).modelValue
      },
      set:(val)=>{
        emit('update:modelValue',val)
      }
    })

    const percentage = ref(0)
    const uploadIng = ref(false)
    const joinUploadType = computed(()=>{ return props.uploadType.join(',')})

    // eslint-disable-next-line no-unused-vars
    const handleRequest = (option) => {
      // const mergeOption = {
      //   ...option,
      //   ...this.option,
      // }
      // this.uploadIng = true
      // this.$api
      //   .ossToken(this.uploadDir)
      //   .then(tokenData => {
      //     oss.uploadWithToken(mergeOption, tokenData, percentage => {
      //       this.percentage = percentage
      //     })
      //   })
      //   .catch(error => {
      //     this.$message({
      //       message: error.msg,
      //     })
      //   })
    }

    const beforeUpload = (file) => {
      const fileName = file.name
      const pos = fileName.lastIndexOf('.')
      const lastName = fileName.substring(pos, fileName.length)
      if (props.uploadType.includes(lastName)) {
        props.beforeUploadFunc && props.beforeUploadFunc(file)
      } else {
        return false
      }
    }

    const  uploadSuccess = (response) => {
      emit('update:modelValue', response.url)
      uploadIng.value = false
      percentage.value = 0
    }

    return  {
      percentage,
      uploadIng,
      joinUploadType,
      handleRequest,
      beforeUpload,
      uploadSuccess,
      bindValue,
    }
  },
  // methods: {
   
  //   // handleRequest(option) {
  //   //   const mergeOption = {
  //   //     ...option,
  //   //     ...this.option,
  //   //   }
  //   //   this.uploadIng = true
  //   //   this.$api
  //   //     .ossToken(this.uploadDir)
  //   //     .then(tokenData => {
  //   //       oss.uploadWithToken(mergeOption, tokenData, percentage => {
  //   //         this.percentage = percentage
  //   //       })
  //   //     })
  //   //     .catch(error => {
  //   //       this.$message({
  //   //         message: error.msg,
  //   //       })
  //   //     })
  //   // },
  //   beforeUpload(file) {
  //     const fileName = file.name
  //     const pos = fileName.lastIndexOf('.')
  //     const lastName = fileName.substring(pos, fileName.length)
  //     if (this.uploadType.includes(lastName)) {
  //       this.beforeUploadFunc && this.beforeUploadFunc(file)
  //     } else {
  //       return false
  //     }
  //   },
  //   uploadSuccess(response) {
  //     this.$emit('update:modelValue', response.url)
  //     this.uploadIng = false
  //     this.percentage = 0
  //   },
  // },
})
</script>

<style lang="scss"></style>

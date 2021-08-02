<template>
   <el-row  :gutter="gutter" >
     <el-col v-if="title" class="col-title" ><span class="title"></span>{{title}}</el-col>
    <template v-for="item in schemaArr" :key="item.title">
      <el-col :span='item.span || 24'>
        <el-form-item :prop="item.prop" :label="item.label" :rule="item.rule" :required="item.required">
          <template #default>
           <FormItem v-if="item.component!=='CUSTOM'" :componentProps="item.componentProps" v-model="formData[item.prop]" :type="item.component">
           </FormItem>
           <slot v-else :name="item.prop" :prop="item.prop"></slot>
           </template>
        </el-form-item>
      </el-col>
    </template>
   </el-row>
</template>

<script>
import FormItem from './FormItem'
import { defineComponent,  unref } from 'vue'
export default defineComponent({
 name:'FormGroup',
 components:{
   FormItem
 },
 props:{
   title:{
     type:String,
     default:''
   },
   schemaArr:{
     type:Array,
     default:()=>[]
   },
   form:{
     type:Object,
     default:()=>{
       return {}
     }
   },
   gutter:{
     type:Number,
     default:10
   }
 },
 setup(props){
   const formData = unref(props).form
   return{
     formData
   }
 }
})
</script>

<style lang='scss' scoped>
.title{
  width: 6px;
  height: 1px;
  background: rgb(64, 176, 228);
  display: inline-block;
  vertical-align: middle;
  margin: 10px 0;
  margin-right:10px ;
}
</style>
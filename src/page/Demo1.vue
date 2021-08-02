<template>
  <div>
    <!-- <button @click="changeRouter">
          点我
    </button>
    <button @click="changeCount(0)">点我改变</button>
    <div>{{countAdd}}</div>
    <button @click="asyncCount">点</button>
    <button @click="asyncFunction">点</button> -->
    <div>{{ state.count }}</div>
    <div style="width:50%;margin-left:50%;transform:translateX(-50%)">
      <BasicTable
        v-loading="false"
        v-bind="tableProps"
        style="width:100%"
        empty-text=""
        :data="tableData"
        @selection-change="handleSelect"
      >
        <template #test1="scope"> 我是插槽{{ scope.row.test1 }} </template>
      </BasicTable>
     
      <Demo2></Demo2>
      <div
        v-on="objEvent"
        style="width:100px;height:100px;background:red"
      ></div>
       <BasicForm style="border:1px solid #CCC;padding:20px" :form="formModel" v-bind="fromProps">
        
       </BasicForm>
       <el-button @click="show">点我</el-button>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { state } from "@/store/index1.js";
import Demo2 from "./demo/Demo2.vue";
import BasicTable from "@/components/element/table/BasicTable.vue";
import BasicForm from "@/components/element/form/BasicForm.vue";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { ref } from "vue";

export default {
  name: "Demo1",
  components: {
    BasicTable,
    BasicForm,
    Demo2,
  },
  computed: {
    ...mapGetters(["countAdd"]),
  },
  methods: {
    ...mapMutations(["changeCount"]),
    ...mapActions(["asyncCount", "asyncFunction"]),
  },
  setup() {
    const objEvent = {
      click: () => {
        console.log(1, "click");
        state.count++;
      },
      mousedown: () => {
        console.log(2, "mousedown");
      },
    };
    const changeRouter = () => {
      router.push({ name: "Demo2" });
    };
    const columns = [
      {
        label: "测试1",
        prop: "test1",
        type: "TEXT",
        isCustom: true,
        columnProps: {},
        componentProps: {
          style: "color:red",
        },
      },
      {
        label: "测试2",
        prop: "test2",
        type: "",
        isCustom: false,
        columnProps: {
          headerAlign: "center",
        },
        componentProps: {
          style: "text-align:center",
        },
      },
      {
        label: "测试3",
        prop: "test3",
        isCustom: false,
        columnProps: {},
      },
      {
        label: "测试4",
        prop: "test4",
        isCustom: false,
        columnProps: {},
      },
      {
        label: "测试5",
        prop: "test5",
        isCustom: false,
        columnProps: {},
      },
    ];
    const tableData = [
      {
        test1: "123",
        test2: "123",
        test3: "123",
        test4: "123",
        test5: "123",
        expand: false,
        select: false,
      },
      {
        test1: "123",
        test2: "123",
        test3: "123",
        test4: "123",
        test5: "123",
      },
      {
        test1: "123",
        test2: "123",
        test3: "123",
        test4: "123",
        test5: "123",
      },
      {
        test1: "123",
        test2: "123",
        test3: "123",
        test4: "123",
        test5: "123",
        action: false,
      },
    ];
    const Action = [
      {
        text: "编辑",
        callBack: (row, index) => {
          console.log(row, index);
        },
        columnProps: {
          style: "border-right:1px solid #CCC;padding:5px",
        },
      },
      {
        text: "删除",
        callBack: (row, index) => {
          console.log(row, index);
        },
        actionProps: {
          style: "padding:5px",
        },
      },
    ];
    const tableProps = {
      columns,
      Action,
      isExpand: false,
      border: false,
      isSelection: true,
    };
    const schemas = [
      {
        title:'姓名',
        gutter:20,
        includeSchema:[{
          label:'姓名',
          prop:'name',
          component:'INPUT',
           span:6,
           required:true,
           componentProps:{
             class:'name'
           }

        },
        {
          label:'电话',
          prop:'phone',
          component:'INPUT',
           required:true,
           span:7

        },]
      },
      {
        title:'年纪',
        includeSchema:[{
          label:'年纪',
          prop:'age',
          component:'SELECT',
          componentProps:{
            options:[{
              label:'男',
              value:1
            },
            {
              label:'女',
              value:0
            }]
          }
        }]
      },
      {
        title:'性别',
        includeSchema:[{
          label:'性别',
          prop:'sex',
          component:'INPUT',
          componentProps:{
            type:'textarea',
            autosize:{
               minRows:2
            }
          }
        }]
      },
     
    ];
    const fromProps = {
      schemas,
      title:'表单填写',

    };

    const handleSelect = (data) => {
      console.log(data);
    };

    const formModel = ref({
      name: "111",
      age: "",
      sex: "",
      phone:'099'
    });
   const show = () => {
     console.log(formModel.value)
   }
    const focus = (e, data) => {
      console.log(e, data);
    };

    return {
      changeRouter,
      tableProps,
      tableData,
      handleSelect,
      formModel,
      focus,
      objEvent,
      state,
      fromProps,
      show
    };
  },
};
</script>

<style></style>

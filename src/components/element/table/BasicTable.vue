<template>
  <el-table
    :data="data"
    v-bind="$attrs"
    ref="tableRef"
    :row-class-name="columnIsExpand"
  >
    <el-table-column type="expand" v-if="isExpand">
      <template #default="scope">
        <slot name="expand" :row="scope.row"> </slot>
      </template>
    </el-table-column>
    <el-table-column type="selection" v-if="isSelection">

    </el-table-column>
    <template v-for="item in columns" :key="item.prop">
      <el-table-column
        :label="item.label"
        :prop="item.prop"
        v-bind="item.columnProps"
      >
        <template #default="scope">
          <TableCol
            v-if="!item.isCustom"
            :cellData="scope.row[item.prop]"
            :key="item.prop"
            :row="scope.row"
            :type="item.type"
            :componentProps="item.componentProps"
          >
          </TableCol>
          <slot v-else :name="item.prop" :row="scope.row" :scope="scope">
          </slot>
        </template>
      </el-table-column>
    </template>
    <template v-if="Action.length > 0 || $slot.action">
      <el-table-column label="操作">
        <template #default="scope">
          <div style="text-align:center" v-if="scope.row.action??true">
            <span
              v-for="(item, index) in Action"
              v-bind="item?.actionProps"
              :key="index"
              @click="item.callBack(scope.row, scope.$index)"
            >
              {{ item.text }}
            </span>
            <slot name="action" :row="scope.row" :scope="scope"></slot>
          </div>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script>
import { defineComponent, ref } from "vue";
import TableCol from "./TableCol";
export default defineComponent({
  name: "Table",
  components: {
    TableCol,
  },
  props: {
    /**
     * data 表格的数据
     */
    data: {
      type: Array,
      default: () => [],
      require: true,
    },
    /**
     * columns 操作列以外的定义
     */
    columns: {
      type: Array,
      default: () => [],
      require: true,
    },
    /**
     * columnsAction 操作列的定义
     */
    Action: {
      type: Array,
      default: () => [],
    },
    /**行是否可以展开 */
    isExpand: {
      type: Boolean,
      default: false,
    },
    /**是否可以选中 */
    isSelection: {
      type:Boolean,
      default:false
    }
  },
  setup() {
    const tableRef = ref(null);
    const columnIsExpand = ({ row }) => {
      const select = row.select ?? true
      const expand = row.expand ?? true;
      return `${expand ? "" : "expand"} ${select ? '' : 'select'}`;
    };
    return {
      tableRef,
      columnIsExpand,
    };
  },
});
</script>

<style>
.expand .el-table__expand-column .cell {
  display: none;
}
.select .el-table-column--selection .cell {
  display: none;
}
</style>

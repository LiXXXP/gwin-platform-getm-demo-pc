<template>
  <div class="gwin-platform-tables">
    <el-table
      ref="multipleTable"
      v-loading="loading"
      tooltip-effect="dark"
      class="gwin-platform-tables__table"
      :data="tableData"
      header-cell-class-name="table-header"
    >
      <el-table-column
        v-for="(item, index) in tableColumn"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :align="item.align"
        :width="item.width"
        :show-overflow-tooltip="true"
      >
        <template v-if="item.custom === 'statusType'" #default="scope">
          <p v-if="item.prop === 'status' && scope.row.status === 1">已发货</p>
          <p v-else-if="item.prop === 'status' && scope.row.status === 2">已完成</p>
          <p v-else-if="item.prop === 'goodsStatus' && scope.row.goodsStatus === 1">待确认收货</p>
          <p v-else-if="item.prop === 'goodsStatus' && scope.row.goodsStatus === 2">已确认收货</p>
        </template>
      </el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作" align="center" width="80">
        <template #default="scope">
          <div
            v-for="(childIntem, childIndex) in tableOperation"
            :key="childIndex"
            class="gwin-platform-tables__item"
            @click="onSubmit({ type: 'detail', data: scope.row })"
          >
            详情
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      class="gwin-platform-page-bar"
      layout="prev, pager, next, slot, sizes, jumper"
      :current-page="pageInfo.pageNum"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageInfo.pageSize"
      :total="pageInfo.count"
      @current-change="pageCurrentChange"
      @size-change="pageSizeChange"
    >
      <span></span>
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { DataParams, ColumnParams, PageProps, TableOperateProps } from '../search/interface'

interface TableProps {
  loading: boolean
  tableColumn: ColumnParams[]
  tableData: DataParams[]
  rowKey: string
  checkSelect: boolean
  pageInfo: PageProps
  tableOperation: TableOperateProps[]
}

const props = defineProps<TableProps>()
const emit = defineEmits(['onTableSubmit', 'pageChange'])

watch(props, (newsProps) => {
  if (newsProps.pageInfo.count > 10) {
    document.getElementsByClassName('el-pagination__jump')[0].childNodes[0].nodeValue = '跳至'
  }
})

function pageSizeChange(e: number) {
  emit('pageChange', { type: 'size', data: e })
}
function pageCurrentChange(e: number) {
  emit('pageChange', { type: 'current', data: e })
}
function onSubmit(data: any) {
  emit('onTableSubmit', data)
}
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';

@include b(tables) {
  width: 100%;
  margin-top: 30px;
  // height: calc(100% - 106px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @include e(table) {
    width: 100%;
    overflow: auto;
  }

  @include e(item) {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #3860f4;
    line-height: 20px;
    cursor: pointer;
  }
}

@include b(page-bar) {
  margin-top: 30px;
  text-align: center;
}
</style>

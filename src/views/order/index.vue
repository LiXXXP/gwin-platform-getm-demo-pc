<template>
  <div class="gwin-platform-message-box">
    <div class="gwin-platform-message-box__nav">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>订货单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="gwin-platform-message">
      <search
        :search-form="formInfo.searchForm"
        :search-buttons="formInfo.buttons"
        :table-data="tableInfo.tableData"
        @on-search="onSearch"
      ></search>
      <tables
        :table-data="tableInfo.tableData"
        :loading="tableInfo.tableLoading"
        :table-column="tableInfo.tableColumn"
        :check-select="tableInfo.checkSelect"
        :table-operation="tableInfo.tableOperation"
        :row-key="'1'"
        :page-info="pageInfo"
        @on-table-submit="toDetail"
        @page-change="pageChange"
      ></tables>
    </div>
  </div>
</template>

<script setup lang="ts">
import search from '@/components/search/index.vue'
import tables from '@/components/table/index.vue'
import { onMounted, reactive } from 'vue'
import { FormProps } from '../../components/search/interface'
import OrderApi from '@/api/order'
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

const router = useRouter()

const formInfo = reactive({
  searchForm: [
    {
      type: 'select',
      lable: '全部订单',
      placeholder: '全部消息',
      value: '',
      show: true,
      point: 'status',
      option: [
        {
          label: '全部消息',
          value: '1'
        }
      ]
    },
    {
      type: 'input',
      lable: '',
      placeholder: '请输入订单号/收货人名称',
      value: '',
      show: true,
      point: 'searchParams'
    },
    {
      type: 'daterange',
      lable: '',
      placeholder: '',
      value: '',
      show: true,
      point: 'searchTime'
    }
  ],
  buttons: [
    {
      type: 'success',
      label: '导入',
      prop: 'read'
    },
    {
      type: 'primary',
      label: '导出',
      prop: 'allRead'
    },
    {
      type: 'primary',
      label: '查询',
      prop: 'search'
    }
  ]
})

const tableInfo = reactive({
  tableLoading: false,
  tableData: [],
  tableColumn: [
    {
      label: '订单号',
      prop: 'orderNo',
      align: 'left',
      width: 250,
      custom: ''
    },
    {
      label: '货物名称',
      prop: 'goodsName',
      align: 'left',
      custom: ''
    },
    {
      label: '收货人名称',
      prop: 'userName',
      align: 'left',
      custom: ''
    },
    {
      label: '金额',
      prop: 'amount',
      align: 'left',
      custom: ''
    },
    {
      label: '下单时间',
      prop: 'orderTime',
      align: 'center',
      custom: ''
    },
    {
      label: '状态',
      prop: 'status',
      align: 'center',
      custom: 'statusType'
    },
    {
      label: '收货状态',
      prop: 'goodsStatus',
      align: 'center',
      custom: 'statusType'
    }
  ],
  tableOperation: [
    {
      id: 2,
      label: '详情',
      prop: 'detail',
      type: 'normal',
      isBack: false
    }
  ],
  checkSelect: true
})

const pageInfo = reactive({
  pageNum: 1,
  count: 0,
  pageSize: 10,
  orderBy: '',
  returnCount: true
})

const data = reactive({
  baseInfo: {
    status: '',
    title: ''
  }
})

onMounted(() => {
  getOrderList()
})

function onSearch(formData: FormProps) {
  data.baseInfo = formData
  getOrderList()
}

function pageChange(data: any) {
  if (data.type === 'current') {
    pageInfo.pageNum = data.data
  } else {
    pageInfo.pageSize = data.data
  }
  getOrderList()
}

function toDetail(data: any) {
  router.push({
    name: 'OrderDetail',
    query: {
      item: encodeURI(JSON.stringify(data.data))
    }
  })
}

async function getOrderList() {
  const res = await OrderApi.getOrderList({})
  if (res.status.success) {
    tableInfo.tableData = res.body.dataList
    pageInfo.count = res.body.page.count
  }
}
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';

@include b(message-box) {
  width: 100%;
  height: 100%;

  @include e(nav) {
    width: 100%;
    height: 40px;
    background: #ffffff;
    box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
    padding: 0 20px;
    display: flex;
    align-items: center;
  }
}

@include b(message) {
  margin: 20px;
  height: calc(100% - 80px);
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
  padding: 20px;
  overflow: auto;

  @include e(title) {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1a2234;
    border-left: 4px solid #3860f4;
    padding-left: 10px;
    line-height: 16px;
  }
}
</style>

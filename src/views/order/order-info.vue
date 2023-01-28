<template>
  <div class="gwin-platform-info">
    <div class="gwin-platform-info__order-status">
      <img v-if="detailInfo.status === 1" class="gwin-platform-info__status-img" :src="iconDeliver" />
      <img v-else class="gwin-platform-info__status-img" :src="iconComplete" />
      <div class="gwin-platform-info__status-txt">
        <span v-if="detailInfo.status === 1">已发货</span>
        <span v-else>已完成</span>
      </div>
      <div class="gwin-platform-info__order-no">订单号：{{ detailInfo.orderNo }}</div>
    </div>
    <el-table
      :data="tableData"
      tooltip-effect="dark"
      class="gwin-platform-info__table"
      header-cell-class-name="table-header"
      :header-cell-style="{
        'border-right': 'none'
      }"
      :cell-style="{
        'border-right': 'none'
      }"
      border
    >
      <el-table-column prop="orderNo" label="货物编号" />
      <el-table-column prop="goodsName" label="货物名称" />
      <el-table-column prop="weight" label="货物重量" />
      <el-table-column prop="unit" label="单位" />
      <el-table-column prop="count" label="数量" />
      <el-table-column prop="price" label="单价" width="150" />
      <el-table-column prop="amount" label="金额小计" width="200" />
      <el-table-column prop="remark" label="备注" width="150" />
    </el-table>
    <div class="gwin-platform-info__table-item">
      <p style="width: 200px; text-align: left; padding-left: 10px">合计金额：{{ detailInfo.amount }}</p>
    </div>
    <div class="gwin-platform-info__table-item">
      <p style="width: 200px; text-align: left; padding-left: 10px">
        实付金额：<span style="color: #3860f4">{{ detailInfo.amount }}</span>
      </p>
    </div>
    <div class="gwin-platform-info__title">发货信息</div>
    <div class="gwin-platform-info__content">
      <div class="gwin-platform-info__content-item">
        <span class="gwin-platform-info__item-label">发货人：</span>
        <div class="gwin-platform-info__item-txt">李萌萌</div>
      </div>
      <div class="gwin-platform-info__content-item">
        <span class="gwin-platform-info__item-label">发货人电话：</span>
        <div class="gwin-platform-info__item-txt gwin-platform-info__item-number">13810231111</div>
      </div>
      <div class="gwin-platform-info__content-item">
        <span class="gwin-platform-info__item-label">发货地址：</span>
        <div class="gwin-platform-info__item-txt">北京市南苑机场集货中心</div>
      </div>
      <div class="gwin-platform-info__content-item">
        <span class="gwin-platform-info__item-label">收货人：</span>
        <div class="gwin-platform-info__item-txt">张强</div>
      </div>
      <div class="gwin-platform-info__content-item">
        <span class="gwin-platform-info__item-label">收货人电话：</span>
        <div class="gwin-platform-info__item-txt gwin-platform-info__item-number">18910231411</div>
      </div>
      <div class="gwin-platform-info__content-item">
        <span class="gwin-platform-info__item-label">收货地址：</span>
        <div class="gwin-platform-info__item-txt">天津市滨海机场货物区</div>
      </div>
    </div>
    <div class="gwin-platform-info__title">发票信息</div>
    <div class="gwin-platform-info__content">
      <div class="gwin-platform-info__content-item">
        <span class="gwin-platform-info__item-label">发票类型：</span>
        <div class="gwin-platform-info__item-txt">电子发票</div>
      </div>
      <div class="gwin-platform-info__content-item">
        <span class="gwin-platform-info__item-label">发票抬头：</span>
        <div class="gwin-platform-info__item-txt">张强</div>
      </div>
      <div class="gwin-platform-info__content-item"></div>
      <div class="gwin-platform-info__content-item">
        <span class="gwin-platform-info__item-label">发票内容：</span>
        <div class="gwin-platform-info__item-txt">商品明细</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import iconComplete from '../../assets/img/icon-complete.png'
import iconDeliver from '../../assets/img/icon-order-deliver.png'

interface DetailProps {
  orderNo: string
  id: number
  orderTime: string
  goodsName: string
  status: number
  amount: string
  goodsStatus: number
  userName: string
  count: number
  unit: string
  remark: string
}

interface Props {
  detailInfo: DetailProps
}

const props = defineProps<Props>()

const tableData: DetailProps[] = reactive([])

onMounted(() => {
  tableData.push(props.detailInfo)
})
</script>

<style scoped lang="scss">
@import '../../styles/mixin.scss';

@include b(info) {
  padding: 20px;

  @include e(order-status) {
    display: flex;
    align-items: center;
  }

  @include e(status-img) {
    width: 20px;
    height: 20px;
  }

  @include e(status-txt) {
    margin-left: 6px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #74c041;
  }

  @include e(order-no) {
    margin-left: 30px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 400;
    color: #1a2234;
  }

  @include e(table) {
    width: 100%;
    margin-top: 20px;
    overflow: auto;
  }

  @include e(table-item) {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 52px;
    border-left: 1px solid #ebeef5;
    border-bottom: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    padding-right: 150px;
    line-height: 52px;
    font-size: 14px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #606a78;
    text-align: right;
  }

  @include e(title) {
    margin-top: 20px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #1a2234;
    position: relative;
    padding-left: 12px;
    line-height: 20px;

    &::before {
      position: absolute;
      left: 0;
      top: 8px;
      content: '';
      width: 4px;
      height: 4px;
      background: #3860f4;
      border-radius: 2px;
      right: 24px;
    }
  }

  @include e(content) {
    margin-top: 10px;
    width: 100%;
    background: rgba(60, 125, 255, 0.04);
    padding: 20px 20px 0 20px;
    display: flex;
    flex-wrap: wrap;
  }

  @include e(content-item) {
    width: calc(100% / 3);
    display: flex;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  @include e(item-label) {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606a78;
  }

  @include e(item-txt) {
    margin-left: 44px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606a78;
  }

  @include e(item-number) {
    font-family: Roboto-Regular, Roboto;
  }
}
</style>

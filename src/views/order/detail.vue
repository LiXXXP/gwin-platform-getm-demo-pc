<template>
  <div class="gwin-platform-detail-box">
    <div class="gwin-platform-detail-box__nav">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/' }">订货单</el-breadcrumb-item>
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="gwin-platform-detail">
      <el-tabs v-model="activeIndex" style="height: 100%">
        <el-tab-pane label="订单详情" name="detail"><OrderInfo :detail-info="data"></OrderInfo></el-tab-pane>
        <el-tab-pane :lazy="true" style="height: 100%" :label="trajectoryLabel" name="trajectory">
          <Trajectory :status="data.status"></Trajectory
        ></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import Trajectory from './trajectory.vue'
import OrderInfo from './order-info.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

const route = useRoute()
const data: any = JSON.parse(decodeURI(route.query.item as string))
const trajectoryLabel = ref('')

const activeIndex = ref('detail')

onMounted(() => {
  if (data !== null) {
    if (data.status === 1) {
      trajectoryLabel.value = '在途运单轨迹查看'
    } else {
      trajectoryLabel.value = '历史运单轨迹查看'
    }
  }
})
</script>

<style scoped lang="scss">
@import '../../styles/mixin.scss';

@include b(detail-box) {
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
    box-sizing: border-box;
  }
}

@include b(detail) {
  margin: 20px;
  height: calc(100% - 80px);
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
  overflow: auto;
}
</style>

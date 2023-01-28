<template>
  <div class="gwin-platform-table-box" :style="{ height: `${tableHeight}px` }">
    <div class="gwin-platform-table-box__data-table">
      <div class="gwin-platform-table-box__table-title">
        <span
          v-for="(item, index) in tableHeader"
          :key="index"
          class="gwin-platform-table-box__table-header"
          :style="{ width: `${item.width}px` }"
          >{{ item.title }}</span
        >
      </div>
      <div v-show="carList.length !== 0" ref="tableRef" class="gwin-platform-table-box__data-body">
        <div style="height: 1px">
          <div
            v-for="(item, index) in carList"
            :key="index"
            :class="[
              'gwin-platform-table-box__item-box',
              { 'gwin-platform-table-box__deep-color': Number(index) % 2 === 0 }
            ]"
          >
            <div
              v-for="(childItem, childIndex) in tableHeader"
              :key="childIndex"
              class="gwin-platform-table-box__item"
              :style="{ width: `${childItem.width}px` }"
            >
              <span v-if="childItem.key === 'status' && item[childItem.key] === 1">运输中</span>
              <span v-else-if="childItem.key === 'status' && item[childItem.key] === 2">已送达</span>
              <span v-else-if="childItem.key === 'status' && item[childItem.key] === 4">已结束</span>
              <span v-else-if="childItem.key === 'plateNo' && item.plateColor === 1"
                >{{ item[childItem.key] }} · 蓝</span
              >
              <span v-else-if="childItem.key === 'plateNo' && item.plateColor === 2"
                >{{ item[childItem.key] }} · 黄</span
              >
              <span v-else-if="childItem.key === 'plateNo' && item.plateColor === 4"
                >{{ item[childItem.key] }} · 黄绿</span
              >
              <span v-else-if="childItem.key === 'beginTime'">{{ formatDate1(item[childItem.key], 1) }}</span>
              <span v-else>{{ item[childItem.key] }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="carList.length === 0" class="gwin-platform-no-data">暂无数据</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { formatDate1 } from '../../../../utils/index'

const tableHeader = [
  {
    title: '监控开始时间',
    width: 150,
    key: 'beginTime'
  },
  {
    title: '运输状态',
    key: 'status',
    width: 150
  },
  {
    title: '车牌号',
    key: 'plateNo',
    width: 150
  },
  {
    title: '承运人',
    key: 'driverName',
    width: 100
  },
  {
    title: '承运人电话',
    key: 'driverMobile',
    width: 140
  },
  {
    title: '运单运输吨数',
    key: 'weight',
    width: 140
  },
  {
    title: '运单货物金额(元)',
    key: 'price',
    width: 140
  },
  {
    title: '供应商',
    key: 'supplier',
    width: 160
  },
  {
    title: '当前位置',
    key: 'detailAddress',
    width: 150
  },
  {
    title: '发货地址',
    key: 'departureAddress',
    width: 260
  },
  {
    title: '收货地址',
    key: 'destinationAddress',
    width: 260
  }
]

const tableRef = ref()
const scrollFlag = ref<boolean>(false)
const scrollStep = ref(2)
const oldPos = ref(0)
const tableHeight = ref(272)
let scrollTime: NodeJS.Timer | null = null
let timer: NodeJS.Timer | null = null
let firstTimer: NodeJS.Timer | null = null

interface Props {
  carList: Record<string, any>[]
}

const props = defineProps<Props>()

watch(props, () => {
  if (tableRef.value && props.carList.length > 5) {
    // if (scrollTime) {
    //   clearInterval(scrollTime)
    // }
    oldPos.value = 0
    tableRef.value.scrollTop = 2
  }
})

onMounted(() => {
  tableScroll()
})

function tableScroll() {
  tableRef.value.onscroll = function () {
    const distance = tableRef.value.scrollTop - oldPos.value
    if (distance !== scrollStep.value) {
      if (scrollTime) {
        clearInterval(scrollTime)
      }
    }
    oldPos.value = tableRef.value.scrollTop
    if (timer) {
      clearTimeout(timer)
    }

    if (firstTimer) {
      clearTimeout(firstTimer)
    }

    timer = setTimeout(function () {
      autoScroll()
    }, 5000)
  }
  firstTimer = setTimeout(function () {
    autoScroll()
  }, 1000)
}

onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }

  if (scrollTime) {
    clearInterval(scrollTime)
  }
})

function autoScroll() {
  let h = 1
  const sIn2 = tableRef.value
  scrollTime = setInterval(function () {
    scrollFlag.value = true
    // 获取当前滚动条高度
    const current = sIn2.scrollTop

    if (current === sIn2.scrollHeight - tableHeight.value - 66) {
      h = 1
      oldPos.value = 0
      sIn2.scrollTop = h + 1
    } else {
      sIn2.scrollTop = current + scrollStep.value
      // sIn2.scrollTo({
      //   top: current + scrollStep.value,
      //   behavior: 'smooth'
      // })
    }
  }, 100)
}
</script>

<style scoped lang="scss">
@import '../../../../styles/mixin.scss';

@include b(table-box) {
  width: calc(100% - 60px);
  height: 205px;
  padding: 0 10px 20px 10px;
  box-sizing: border-box;
  position: absolute;
  bottom: 10px;
  z-index: 999;

  @include e(data-table) {
    width: 100%;
    height: 100%;
    background: #040711;
    border-radius: 20px;
    border: 1px solid #082552;
    box-sizing: border-box;
    overflow-x: auto;
  }

  @include e(table-title) {
    width: 100%;
    min-width: 1835px;
    height: 40px;
    background: rgba(8, 38, 82, 0.5);
    display: flex;
    justify-content: space-between;
    border-radius: 20px 20px 0 0;
  }

  @include e(data-body) {
    width: 100%;
    min-width: 1835px;
    height: calc(100% - 40px);
    border-radius: 0 0 20px 20px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  @include e(table-header) {
    min-width: 100px;
    max-width: 274px;
    height: 40px;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 40px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    flex-shrink: 0;
  }

  @include e(item-box) {
    width: 100%;
    height: 35px;
    background: rgba(10, 27, 53, 0.5);
    display: flex;
    justify-content: space-between;
  }

  @include e(deep-color) {
    background: #040711;
  }

  @include e(item) {
    overflow: hidden;
    text-overflow: ellipsis;
    flex-shrink: 0;
    text-align: center;
    font-size: 12px;
    font-family: Roboto-Regular;
    font-weight: 400;
    color: #00ffff;
    line-height: 35px;
  }
}

@include b(no-data) {
  margin: 80px auto 0;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #00ffff;
  text-align: center;
}
</style>

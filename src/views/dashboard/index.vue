<template>
  <div class="gwin-platform-dashboard">
    <div class="gwin-platform-dashboard__nav">
      <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item>大屏监控</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="gwin-platform-dashboard-content">
      <div ref="dashboardRef" class="gwin-platform-index">
        <Header :is-full="isFull" @dashboard-open="toggleFullscreen"></Header>
        <div class="gwin-platform-content">
          <div id="mapL" class="gwin-platform-map"></div>
          <div class="gwin-platform-index__left">
            <div class="gwin-platform-index__item-box" style="height: 338px">
              <Titles title="今日监控数据"></Titles>
              <div class="gwin-platform-index__item">
                <Numbers
                  title="新增运单量"
                  :value="valueFormat(monitorData.monitorInfo.waybillQuantity)"
                  :unit="monitorData.monitorInfo.waybillQuantity < 10000 ? '单' : '万单'"
                  color="#3AEF4B"
                ></Numbers>
                <Numbers
                  title="监控车辆数"
                  :value="valueFormat(monitorData.monitorInfo.truckQuantity)"
                  :unit="monitorData.monitorInfo.truckQuantity < 10000 ? '车' : '万车'"
                  color="#007BFF"
                ></Numbers>
                <Numbers
                  title="新增运输吨数"
                  :value="valueFormat(monitorData.monitorInfo.weight)"
                  :unit="monitorData.monitorInfo.weight < 10000 ? '吨' : '万吨'"
                  color="#3AEF4B"
                ></Numbers>
                <Numbers
                  title="当前运输中"
                  :value="valueFormat(monitorData.monitorInfo.enRouteTruckQuantity)"
                  :unit="monitorData.monitorInfo.enRouteTruckQuantity < 10000 ? '车' : '万车'"
                  color="#007BFF"
                ></Numbers>
                <Numbers
                  title="新增货物金额"
                  :value="valueFormat(monitorData.monitorInfo.price)"
                  :unit="monitorData.monitorInfo.price < 10000 ? '元' : '万元'"
                  color="#3AEF4B"
                ></Numbers>
                <Numbers
                  title="已完成运输"
                  :value="valueFormat(monitorData.monitorInfo.stopTruckQuantity)"
                  :unit="monitorData.monitorInfo.stopTruckQuantity < 10000 ? '车次' : '万车次'"
                  color="#007BFF"
                ></Numbers>
              </div>
            </div>
            <div class="gwin-platform-index__item-box">
              <Titles title="今日监控未入网车辆"></Titles>
              <div class="gwin-platform-index__car-box">
                <div ref="unavailable" class="gwin-platform-index__box">
                  <div v-for="(item, index) in carUnavailableList" :key="index" class="gwin-platform-index__car-item">
                    <p class="gwin-platform-index__car-no">{{ index + 1 }}. {{ item.plateNo }}</p>
                    <p
                      :class="[
                        'gwin-platform-index__car-no',
                        {
                          'gwin-platform-index__car-blue': item.plateColor === 1,
                          'gwin-platform-index__car-yellow': item.plateColor === 2,
                          'gwin-platform-index__car-green': item.plateColor === 4
                        }
                      ]"
                    >
                      <span v-if="item.plateColor === 1">蓝</span>
                      <span v-if="item.plateColor === 2">黄</span>
                      <span v-if="item.plateColor === 4">黄绿</span>
                    </p>
                  </div>
                  <div v-if="carUnavailableList.length === 0" class="gwin-platform-no-data">无未入网车辆</div>
                </div>
              </div>
            </div>
          </div>
          <div class="gwin-platform-index__right">
            <Titles title="近30天运输趋势"></Titles>
            <div class="gwin-platform-index__car-data">
              <Numbers
                title="新增运单量"
                :value="valueFormat(data.totalWaybillQuantity)"
                :unit="data.totalWaybillQuantity < 10000 ? '单' : '万单'"
                color="#00FFFF"
              ></Numbers>
              <Numbers
                title="监控车天数"
                :value="valueFormat(data.totalTruckQuantity)"
                :unit="data.totalTruckQuantity < 10000 ? '车天' : '万车天'"
                color="#00FFFF"
              ></Numbers>
            </div>
            <div class="gwin-platform-echarts-box">
              <div class="gwin-platform-echarts-box__title">
                <img class="gwin-platform-echarts-box__title-icon" :src="iconMarkers" />
                <p class="gwin-platform-echarts-box__txt">新增运单量和监控车辆数趋势</p>
              </div>
              <div class="gwin-platform-echarts-box__echarts">
                <LineCharts
                  :x-data="data.xData"
                  :legend-data="data.legendData"
                  :series-data="data.seriesData"
                ></LineCharts>
              </div>
              <div class="gwin-platform-echarts-box__echarts-hr"></div>
              <div class="gwin-platform-index__car-data">
                <Numbers
                  title="新增运输吨数"
                  :value="valueFormat(data.totalWeight)"
                  :unit="data.totalWeight < 10000 ? '吨' : '万吨'"
                  top="25"
                  color="#00FFFF"
                ></Numbers>
                <Numbers
                  title="新增货物金额"
                  :value="valueFormat(data.totalPrice)"
                  :unit="data.totalPrice < 10000 ? '元' : '万元'"
                  top="25"
                  color="#00FFFF"
                ></Numbers>
                <Numbers
                  title="平均每日新增运单"
                  :value="valueFormat(data.averageWaybillQuantity)"
                  :unit="data.averageWaybillQuantity < 10000 ? '单' : '万单'"
                  top="25"
                  color="#00FFFF"
                ></Numbers>
                <Times
                  title="平均每单运输时长"
                  :value="timeLenghtArr(data.averageTime)"
                  top="25"
                  color="#00FFFF"
                ></Times>
              </div>
            </div>
          </div>
          <img class="gwin-platform-init" :src="iconInit" @click="initView" />
          <Tables :car-list="tableData.carLiat"></Tables>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { onMounted, onUnmounted, reactive } from 'vue'
import Header from './header.vue'
import Tables from './component/table/index.vue'
import Titles from './component/title/index.vue'
import Numbers from './component/number/index.vue'
import Times from './component/number/time.vue'
import iconMarkers from '../../assets/img/icon-marker.png'
import LineCharts from './component/echarts/line-charts.vue'
import { styles } from './index.config'
import { ref } from 'vue'
import * as echarts from 'echarts'
import iconCar from '../../assets/img/icon-map-car.png'
import iconHoverCar from '../../assets/img/car-hover.png'
import iconInit from '../../assets/img/init.png'
import { valueFormat, formatDate1, timeLenghtArr, timeLenght } from '../../utils/index'
import CarInfoApi from '../../api/map'
import { useRouter } from 'vue-router'

declare let LKMap: any
let map: any
let markerClusterObj: any = null
let inforWindow: any = ''
let content: string[] = []
let oldMarker: any
let curMarkerRotation: number
let inforWindowTitle = ''
let carId: string | undefined
let unavailableTime: NodeJS.Timer | null = null
let unavailableTimer: NodeJS.Timer | null = null

const unavailable = ref()
const scrollStep = ref(2)
const oldPos = ref(0)
const router = useRouter()
const color = ['#E33AA3', '#439AFF']
const isFitView = ref(true)
let markerArr: any = []
const iconSingle = new LKMap.Icon({
  size: new LKMap.Size(24, 47),
  image: iconCar,
  imageSize: new LKMap.Size(24, 47)
})

const markerHover = new LKMap.Icon({
  size: new LKMap.Size(81, 62),
  image: iconHoverCar,
  imageSize: new LKMap.Size(81, 62)
  // offset: new LKMap.Pixel(0, 40)
})

const dashboardRef = ref()
const isFull = ref(false)

const data = reactive<Record<string, any>>({
  legendData: [],
  xData: [],
  seriesData: [
    {
      name: '新增运单量',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 2,
        color: '#E33AA3'
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(243 108 208 / 50%)'
          },
          {
            offset: 1,
            color: 'transparent'
          }
        ])
      },
      data: []
    },
    {
      name: '监控车辆',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 2,
        color: '#439AFF'
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: 'rgb(67 154 255 / 50%)'
          },
          {
            offset: 1,
            color: 'transparent'
          }
        ])
      },
      data: []
    }
  ],
  averageTime: 0,
  averageWaybillQuantity: 0,
  totalPrice: 0,
  totalTruckQuantity: 0,
  totalWaybillQuantity: 0,
  totalWeight: 0
})

const monitorData = reactive({
  monitorInfo: {
    enRouteTruckQuantity: 0, // 当前运输中
    price: 0, // 货物金额
    stopTruckQuantity: 0, // 已完成运输
    truckQuantity: 0, // 监控车天数
    waybillQuantity: 0, // 新增运单量
    weight: 0 // 新增运输吨数
  }
})

const tableData = reactive({
  carLiat: []
})

interface CarUnavailableProps {
  plateColor: number
  plateNo: string
}

const carUnavailableList = ref<CarUnavailableProps[]>([])

onMounted(() => {
  initMap()
  getLastCarInfo()
  getCarMonitorInfo()
  getCarUnavailableInfo()
  getCarMonthInfo()
  getDashboardCarInfo()
  tableScroll()
})

onUnmounted(() => {
  if (unavailableTime) {
    clearTimeout(unavailableTime)
  }

  if (unavailableTimer) {
    clearInterval(unavailableTimer)
  }

  map.clearMap()
  map.destroy()
})

async function getLastCarInfo() {
  CarInfoApi.getLastCarInfo()
    .then((res) => {
      tableData.carLiat = res.body.dataList
    })
    .catch((err) => {
      if (err.response.status.errorCode === '1') {
        router.push({
          name: 'not-found',
          query: {
            txt: err.response.status.replyText
          }
        })
      }
    })
}

async function getDashboardCarInfo() {
  CarInfoApi.getDashboardCarInfo()
    .then((res) => {
      if (res.body.dataList !== null) {
        initIcon()
        if (oldMarker) {
          oldMarker = ''
        }
        if (markerClusterObj) {
          markerClusterObj.clearAllMarkers()
        }
        for (let i = 0; i < markerArr.length; i++) {
          markerArr[i].remove()
        }
        markerArr = []

        if (carId) {
          const car = res.body.dataList.find((item: any) => item.waybillTruckId === carId)
          if (car) {
            const pos = new LKMap.LngLat(car.location[0], car.location[1])
            map.setCenter(pos)
          } else {
            carId = undefined
            isFitView.value = true
            initView()
          }
        }

        addMarkerClusterer(res.body.dataList)
      }
    })
    .catch((err) => {
      if (err.response.status.errorCode === '1') {
        router.push({
          name: 'not-found',
          query: {
            txt: err.response.status.replyText
          }
        })
      }
    })
}

async function getCarMonitorInfo() {
  CarInfoApi.getCarMonitorInfo()
    .then((res) => {
      monitorData.monitorInfo = res.body
    })
    .catch((err) => {
      if (err.response.status.errorCode === '1') {
        router.push({
          name: 'not-found',
          query: {
            txt: err.response.status.replyText
          }
        })
      }
    })
}

async function getCarUnavailableInfo() {
  CarInfoApi.getCarUnavailableInfo()
    .then((res) => {
      if (res.body.dataList !== null) {
        carUnavailableList.value = res.body.dataList
        if (!unavailableTime) {
          scrollUnavailable()
        }
      } else {
        carUnavailableList.value = []
      }
    })
    .catch((err) => {
      if (err.response.status.errorCode === '1') {
        router.push({
          name: 'not-found',
          query: {
            txt: err.response.status.replyText
          }
        })
      }
    })
}

async function getCarMonthInfo() {
  CarInfoApi.getCarMonthInfo()
    .then((res) => {
      data.averageWaybillQuantity = res.body.averageWaybillQuantity
      data.averageTime = res.body.averageTime
      data.totalPrice = res.body.totalPrice
      data.totalTruckQuantity = res.body.totalTruckQuantity
      data.totalWaybillQuantity = res.body.totalWaybillQuantity
      data.totalWeight = res.body.totalWeight
      data.xData = []
      const truckQuantityData = []
      const waybillQuantityData = []
      data.legendData = [
        {
          name: '新增运单量',
          itemStyle: {
            color: color[0]
          }
        },
        {
          name: '监控车辆',
          itemStyle: {
            color: color[1]
          }
        }
      ]
      if (res.body.dataList !== null) {
        for (let i = 0; i < res.body.dataList.length; i++) {
          data.xData.push(formatDate1(res.body.dataList[i].createAt, 4))
          truckQuantityData.push(res.body.dataList[i].truckQuantity)
          waybillQuantityData.push(res.body.dataList[i].waybillQuantity)
        }
      }

      data.seriesData[0].data = waybillQuantityData
      data.seriesData[1].data = truckQuantityData
    })
    .catch((err) => {
      if (err.response.status.errorCode === '1') {
        router.push({
          name: 'not-found',
          query: {
            txt: err.response.status.replyText
          }
        })
      }
    })
}

async function getCarDetailInfo(waybillTruckId: number) {
  CarInfoApi.getCarDetailInfo(waybillTruckId)
    .then((res) => {
      let plateColor = ''

      if (res.body.plateColor === 1) {
        plateColor = '蓝牌'
      } else if (res.body.plateColor === 2) {
        plateColor = '黄牌'
      } else if (res.body.plateColor === 4) {
        plateColor = '黄绿牌'
      }
      inforWindowTitle = res.body.plateNo + '·' + plateColor
      content = []
      content.push(
        '<div class="gwin-platform-dashboard-content-item">' +
          res.body.driverName +
          ' ｜ ' +
          res.body.driverMobile +
          '</div>'
      )
      content.push(
        '<div class="gwin-platform-dashboard-content-item">还需' + timeLenght(res.body.remainingTime) + '</div>'
      )
      content.push('<div class="gwin-platform-dashboard-content-item">运单吨数：' + res.body.weight + '吨</div>')
      content.push('<div class="gwin-platform-dashboard-content-item">运单金额：' + res.body.price + '元</div>')
      content.push(
        '<div class="gwin-platform-dashboard-content-item">发货地址：' + res.body.departureAddress + '</div>'
      )
      content.push(
        '<div class="gwin-platform-dashboard-content-item">收货地址：' + res.body.destinationAddress + '</div>'
      )

      inforWindow && inforWindow.remove()
      inforWindow = new LKMap.InfoWindow({
        anchor: 'bottom',
        className: 'customClassName',
        content: createInfoWindow(content.join('')),
        isCustom: true, // 使用自定义窗体
        closeButton: false,
        offset: new LKMap.Pixel(0, -60)
      })
      const infoWindowPos = new LKMap.LngLat(oldMarker.options.position[0], oldMarker.options.position[1])
      inforWindow.open(map, infoWindowPos)
    })
    .catch((err) => {
      if (err.response.status.errorCode === '1') {
        router.push({
          name: 'not-found',
          query: {
            txt: err.response.status.replyText
          }
        })
      }
    })
}

function addMarkerClusterer(data: any) {
  for (var i in data) {
    var coordinates = data[i].location
    markerArr[i] = new LKMap.Marker({
      position: coordinates,
      icon: iconSingle,
      anchor: 'center',
      iconAnchor: 'center',
      offset: new LKMap.Pixel(0, 31),
      bubble: false,
      rotation: data[i].direction,
      extData: {
        id: data[i].waybillTruckId
      }
    })
  }
  map.plugin(['MarkerClusterer'], function () {
    markerClusterObj = new LKMap.MarkerClusterer({
      map: map,
      markers: markerArr,
      styles: styles
    })

    markerClusterObj.on('click', function (marker: any) {
      isFitView.value = false
      if (!marker.hasOwnProperty('markers')) {
        if (oldMarker) {
          if (curMarkerRotation !== undefined) {
            oldMarker.setRotation(curMarkerRotation)
          }
          oldMarker.setIcon(iconSingle)
        }
        curMarkerRotation = marker.target.options.rotation
        marker.target.setRotation(0)
        marker.target.setIcon(markerHover)
        oldMarker = marker.target

        carId = marker.target.extData.id
        getCarDetailInfo(marker.target.extData.id)
        // map.setCenter(infoWindowPos)
      } else {
        const lnglatId = marker.markers[0].properties.lnglatId
        const car = data.find((item: any) => item.location.toString() === lnglatId)
        carId = car ? car.waybillTruckId : undefined
        initIcon()
      }
    })
  })
  if (isFitView.value) {
    map.setFitView(markerArr, {
      padding: {
        top: 150,
        bottom: 320,
        left: 400,
        right: 400
      }
    })
  }
}

function initView() {
  isFitView.value = true
  carId = undefined
  map.setFitView(markerArr, {
    padding: {
      top: 150,
      bottom: 320,
      left: 400,
      right: 400
    }
  })
}

function initMap() {
  map = new LKMap.Map('mapL', {
    style: 'lkmap://styles/53c102f731d64526a54563694cf8d899', // 地图样式
    maxZoom: 19
  })

  map.on('zoomstart', function () {
    // const newIndex = map.getZoom()
    // if (newIndex < zoomIndex) {
    //   inforWindow && inforWindow.remove()
    //   if (oldMarker) {
    //     oldMarker.setIcon(iconSingle)
    //     oldMarker = ''
    //   }
    // }
    // zoomIndex = newIndex
    initIcon()
  })

  map.on('zoom', function () {
    isFitView.value = false
  })

  map.on('drag', function () {
    isFitView.value = false
  })

  map.on('click', function () {
    initIcon()
  })
}

function initIcon() {
  inforWindow && inforWindow.remove()
  if (oldMarker) {
    if (curMarkerRotation !== undefined) {
      oldMarker.setRotation(curMarkerRotation)
    }
    oldMarker.setIcon(iconSingle)
    oldMarker = ''
  }
}

// 信息框
function createInfoWindow(content: any) {
  var info = document.createElement('div')
  info.className = 'gwin-platform-dashboard-custom-info'

  // title
  const title = document.createElement('div')
  title.className = 'gwin-platform-dashboard-title'
  title.innerText = inforWindowTitle

  const hr = document.createElement('div')
  hr.className = 'gwin-platform-dashboard-title-hr'
  title.appendChild(hr)
  info.appendChild(title)
  // 定义中部内容
  const middle = document.createElement('div')
  middle.className = 'gwin-platform-dashboard-content-box'
  middle.innerHTML = content
  info.appendChild(middle)
  return info
}

function toggleFullscreen() {
  const el = dashboardRef.value
  if (document.fullscreenElement === null) {
    isFull.value = true
    openFullscreen(el)
  } else {
    quitFullscreen()
    isFull.value = false
  }
}

function openFullscreen(element: any) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    // IE11
    element.msRequestFullscreen()
  }
}

function quitFullscreen() {
  const el: any = document
  if (el.exitFullscreen) {
    el.exitFullscreen()
  } else if (el.webkitCancelFullScreen) {
    el.webkitCancelFullScreen()
  } else if (el.mozCancelFullScreen) {
    el.mozCancelFullScreen()
  } else if (el.msExitFullscreen) {
    el.msExitFullscreen()
  }
}

function scrollUnavailable() {
  let h = 1
  const sIn2 = unavailable.value
  unavailableTime = setInterval(function () {
    // 获取当前滚动条高度
    const current = sIn2.scrollTop

    if (current === sIn2.scrollHeight - 117) {
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

function tableScroll() {
  unavailable.value.onscroll = function () {
    const distance = unavailable.value.scrollTop - oldPos.value
    if (distance !== scrollStep.value) {
      if (unavailableTime) {
        clearInterval(unavailableTime)
      }
    }
    oldPos.value = unavailable.value.scrollTop
    if (unavailableTimer) {
      clearTimeout(unavailableTimer)
    }

    unavailableTimer = setTimeout(function () {
      scrollUnavailable()
    }, 3000)
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/mixin.scss';

@include b(dashboard) {
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

@include b(dashboard-content) {
  margin: 20px;
  height: calc(100% - 80px);
  box-sizing: border-box;
  background: #ffffff;
  box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.06);
  overflow: auto;
}

@include b(index) {
  width: 100%;
  height: 100%;
  min-height: 1000px;
  background-image: url('../../assets/img/bg.png');
  background-size: 100% 100%;
  overflow: hidden;
  position: relative;

  @include e(left) {
    position: absolute;
    top: 10px;
    left: 40px;
    width: 297px;
    z-index: 999;
  }

  @include e(item-box) {
    width: 100%;
    background: rgba(4, 7, 17, 0.8);
    margin-top: 10px;
    border-radius: 20px;

    &:first-child {
      margin-top: 0;
    }
  }

  @include e(item) {
    width: 100%;
    padding: 0 0 20px 0;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    overflow-y: auto;
  }

  @include e(car-box) {
    padding: 30px 0 27px 0;
    box-sizing: border-box;
    width: 100%;
  }

  @include e(box) {
    width: 100%;
    height: 117px;
    padding: 0 60px 0 50px;
    overflow-y: auto;
  }

  @include e(car-item) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    &:first-child {
      margin-top: 0;
    }
  }

  @include e(car-no) {
    font-size: 14px;
    font-family: Roboto-Medium;
    font-weight: 500;
    color: #ffffff;
    line-height: 14px;
  }

  @include e(car-yellow) {
    color: #ffcf5f;
  }

  @include e(car-blue) {
    color: #5fddff;
  }

  @include e(car-green) {
    color: #c5ff5f;
  }

  @include e(right) {
    width: 330px;
    height: 570px;
    background: rgba(4, 7, 17, 0.8);
    position: absolute;
    right: 40px;
    top: 10px;
    border-radius: 20px;
    z-index: 999;
  }

  @include e(car-data) {
    padding: 0 10px;
    display: flex;
    flex-wrap: wrap;
  }
}

@include b(content) {
  width: 100%;
  height: calc(100% - 120px);
  padding: 0 30px 30px;
  margin-top: 120px;
  box-sizing: border-box;
  position: relative;
  overflow: auto;
}

@include b(map) {
  width: 100%;
  height: 100%;
}

@include b(echarts-box) {
  margin-top: 20px;

  @include e(title) {
    display: flex;
    align-items: center;
    margin-left: 27px;
  }

  @include e(title-icon) {
    width: 16px;
    height: 16px;
  }

  @include e(txt) {
    margin-left: 4px;
    font-size: 14px;
    font-family: Roboto-Bold;
    font-weight: bold;
    color: #00ffff;
  }

  @include e(echarts) {
    padding: 10px 22px 20px 30px;
    width: 100%;
    height: 207px;
  }

  @include e(echarts-hr) {
    width: 331px;
    opacity: 0.5;
    border: 1px dashed #00ffff;
  }
}

@include b(no-data) {
  margin: 40px auto 0;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #00ffff;
  text-align: center;
}

@include b(init) {
  position: absolute;
  right: 400px;
  top: 540px;
  width: 40px;
  height: 40px;
  cursor: pointer;
}
</style>

<template>
  <div class="gwin-platform-index">
    <div id="mapL" class="gwin-platform-map"></div>
    <div class="gwin-platform-index__panel">
      <div class="gwin-platform-index__panel-content">
        <div class="gwin-platform-order-title">订单详情</div>
        <div class="gwin-platform-order">
          <div class="gwin-platform-order__line">
            <span class="gwin-platform-order__label">运单编号：</span>
            <p class="gwin-platform-order__txt">{{ data.orderInfo.waybillNo }}</p>
          </div>
          <div class="gwin-platform-order__line">
            <span class="gwin-platform-order__label">发货地址：</span>
            <p class="gwin-platform-order__txt">{{ data.orderInfo.departureAddress }}</p>
          </div>
          <div class="gwin-platform-order__line">
            <span class="gwin-platform-order__label">收货地址：</span>
            <p class="gwin-platform-order__txt">{{ data.orderInfo.destinationAddress }}</p>
          </div>
        </div>
      </div>
      <div class="gwin-platform-car-box">
        <div>
          <div class="gwin-platform-car-box__title-box">
            <p class="gwin-platform-car-box__title">
              {{ data.carInfo[0].plateNo }}· <span v-if="data.carInfo[0].plateColor === 1">蓝</span
              ><span v-else-if="data.carInfo[0].plateColor === 2">黄</span
              ><span v-else-if="data.carInfo[0].plateColor === 4">黄绿</span>牌
            </p>
            <div
              :class="[
                'gwin-platform-car-box__status',
                {
                  'gwin-platform-car-box__route': data.carInfo[0].status === 1,
                  'gwin-platform-car-box__arrive': data.carInfo[0].status === 2,
                  'gwin-platform-car-box__finish': data.carInfo[0].status === 4
                }
              ]"
            >
              <span v-if="data.carInfo[0].status === 1">运输中</span>
              <span v-else-if="data.carInfo[0].status === 2">已送达</span>
              <span v-else-if="data.carInfo[0].status === 4">已结束</span>
            </div>
          </div>
          <div class="gwin-platform-car-box__person-box">
            <p class="gwin-platform-car-box__person">{{ data.carInfo[0].driverName }}</p>
            <div class="gwin-platform-car-box__hr"></div>
            <p class="gwin-platform-car-box__person">{{ data.carInfo[0].driverMobile }}</p>
          </div>
        </div>
        <img class="gwin-platform-car-box__car-img" :src="carImg" />
      </div>
    </div>
    <div class="gwin-platform-init-box">
      <div class="gwin-platform-init-box__zIndex-box">
        <div class="gwin-platform-init-box__zIndex-item" @click="enlargeZoom">+</div>
        <div class="gwin-platform-init-box__hr"></div>
        <div class="gwin-platform-init-box__zIndex-item" @click="narrowZoom">—</div>
      </div>
      <div class="gwin-platform-init-box__init" @click="mapInit"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted, onUnmounted, watch } from 'vue'
import carImg from '../../assets/img/icon-card-car.png'
import startIcon from '../../assets/img/icon-deliver.png'
import endIcon from '../../assets/img/icon-receiving.png'
import carIcon from '../../assets/img/icon-map-car.png'
import MapInfo from '../../api/map'
import { useRouter, useRoute } from 'vue-router'
import { formatDate, timeLenght } from '../../utils'

const router = useRouter()
const route = useRoute()

declare let LKMap: any

const data = reactive({
  orderInfo: {
    waybillNo: '',
    departureAddress: '',
    destinationAddress: ''
  },
  routeInfo: [
    {
      historyRoute: [],
      planRoute: [],
      direction: 0
    }
  ],
  carInfo: [
    {
      driverMobile: '',
      driverName: '',
      plateNo: '',
      plateColor: 0,
      status: 0,
      abnormalReason: ''
    }
  ]
})

let polyLineArr: any = []
let carMarkers: any = []
const markers: any[] = reactive([])

let map: any
let inforWindow: any = ''
let infoWindowPos: any = ''
let content: string[] = []
let labelStatus = ''
let labelDistance = ''
let labelAddress = ''
let positionStart: any
let positionEnd: any

onMounted(() => {
  init()
})

onUnmounted(() => {
  console.log('注销')
  map.clearMap()
  map.destroy()
})

interface Props {
  status: number
}

const props = defineProps<Props>()

function init() {
  map = new LKMap.Map('mapL', {
    style: 'lkmap://styles/858c3f4b530a4dec82d76f22f68b13f0' // 地图样式
  })

  getOrderInfo()
}

async function getOrderInfo() {
  MapInfo.getOrderInfo({})
    .then((res) => {
      data.orderInfo = res.body
      if (markers.length > 0) {
        for (const i in markers) {
          markers[i].remove()
        }
        markers.length = 0
      }
      positionStart = new LKMap.LngLat(res.body.departureLng, res.body.departureLat)
      positionEnd = new LKMap.LngLat(res.body.destinationLng, res.body.destinationLat)
      addIcon()
      if (props.status === 1) {
        data.orderInfo.waybillNo = 'YS00000000000001'
        getCarInfo1()
      } else {
        data.orderInfo.waybillNo = 'YS00000000000002'
        getCarInfo()
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

async function getRouteInfo() {
  MapInfo.getRouteInfo({})
    .then((res) => {
      const carPos = res.body.dataList[0].historyRoute
      data.routeInfo = res.body.dataList

      if (carPos !== null) {
        infoWindowPos = new LKMap.LngLat(carPos[carPos.length - 1][0], carPos[carPos.length - 1][1])
        if (data.carInfo[0].status === 1) {
          labelStatus = '预计' + formatDate(res.body.dataList[0].arrivalTime) + '送达'
          labelDistance = '剩余' + res.body.dataList[0].remainedDistance + 'km'
          labelAddress = '当前在' + res.body.dataList[0].detailAddress
        } else {
          labelStatus = data.carInfo[0].status === 2 ? '已送达' : '已结束（' + data.carInfo[0].abnormalReason + ')'
          labelDistance = '运输里程' + res.body.dataList[0].totalDistance + 'km'
          labelAddress = '运输时长：' + timeLenght(res.body.dataList[0].totalTime)
        }

        inforWindow && inforWindow.remove()
        content = []
        content.push('<div>' + labelStatus + '</div>')
        content.push('<div>' + labelDistance + '</div>')
        content.push('<div>' + labelAddress + '</div>')
      }

      if (carMarkers.length > 0) {
        for (const i in carMarkers) {
          carMarkers[i].remove()
        }
        carMarkers = []
      }

      if (polyLineArr.length > 0) {
        for (const i in polyLineArr) {
          polyLineArr[i].remove()
        }

        polyLineArr = []
      }

      drawRoute()
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

async function getRouteInfo1() {
  MapInfo.getRouteInfo1({})
    .then((res) => {
      const carPos = res.body.dataList[0].historyRoute
      data.routeInfo = res.body.dataList

      if (carPos !== null) {
        infoWindowPos = new LKMap.LngLat(carPos[carPos.length - 1][0], carPos[carPos.length - 1][1])
        if (data.carInfo[0].status === 1) {
          labelStatus = '预计' + formatDate(res.body.dataList[0].arrivalTime) + '送达'
          labelDistance = '剩余' + res.body.dataList[0].remainedDistance + 'km'
          labelAddress = '当前在' + res.body.dataList[0].detailAddress
        } else {
          labelStatus = data.carInfo[0].status === 2 ? '已送达' : '已结束（' + data.carInfo[0].abnormalReason + ')'
          labelDistance = '运输里程' + res.body.dataList[0].totalDistance + 'km'
          labelAddress = '运输时长：' + timeLenght(res.body.dataList[0].totalTime)
        }

        inforWindow && inforWindow.remove()
        content = []
        content.push('<div>' + labelStatus + '</div>')
        content.push('<div>' + labelDistance + '</div>')
        content.push('<div>' + labelAddress + '</div>')
      }

      if (carMarkers.length > 0) {
        for (const i in carMarkers) {
          carMarkers[i].remove()
        }
        carMarkers = []
      }

      if (polyLineArr.length > 0) {
        for (const i in polyLineArr) {
          polyLineArr[i].remove()
        }

        polyLineArr = []
      }

      drawRoute()
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

// 历史车辆
async function getCarInfo() {
  MapInfo.getcCarInfo({
    waybillNo: route.query.waybillNo as string
  })
    .then((res) => {
      if (res.body.dataList !== null) {
        data.carInfo = res.body.dataList
        getRouteInfo1()
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

// 在途车辆信息
async function getCarInfo1() {
  MapInfo.getcCarInfo1({
    waybillNo: route.query.waybillNo as string
  })
    .then((res) => {
      if (res.body.dataList !== null) {
        data.carInfo = res.body.dataList
        getRouteInfo()
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

function drawRoute() {
  for (let i = 0; i < data.routeInfo.length; i++) {
    addCarIcon(i)
    inforWindow = new LKMap.InfoWindow({
      anchor: 'bottom',
      className: 'customClassName',
      content: createInfoWindow(content.join('')),
      isCustom: true, // 使用自定义窗体
      closeButton: false,
      offset: new LKMap.Pixel(25, -65)
    })
    inforWindow.open(map, infoWindowPos)

    if (i === 0) {
      addIcon()

      if (data.carInfo[0].status === 1) {
        showLine(data.routeInfo[i].planRoute, '#BFDCC3')
      }
      currentPositionLine(data.routeInfo[i].historyRoute, '#66AE35')
    } else {
      if (data.carInfo[0].status === 1) {
        showLine(data.routeInfo[i].planRoute, '#BFDCC3')
      }
      currentPositionLine(data.routeInfo[i].historyRoute, '#66AE35')
    }
  }
}

function mapInit() {
  map.setFitView(null, {
    padding: {
      top: 200,
      bottom: 100,
      left: 50,
      right: 50
    }
  })
}

function enlargeZoom() {
  const zIndex = map.getZoom() + 1
  map.setZoom(zIndex)
}

function narrowZoom() {
  const zIndex = map.getZoom() - 1
  map.setZoom(zIndex)
}

function showLine(result: any, color: string) {
  let polyline: any = ''
  polyline = new LKMap.Polyline({
    path: result,
    strokeWeight: 8,
    strokeColor: color,
    showDir: true
  })
  polyline.setMap(map)
  polyLineArr.push(polyline)

  map.setFitView(markers, {
    padding: {
      top: 200,
      bottom: 100,
      left: 50,
      right: 50
    }
  })
}

// 添加起点终点
function addIcon() {
  const fillStartColor = '#66AE35'

  let circleStart: any = ''
  let circleEnd: any = ''
  let fillEndColor = '#BFDCC3'

  const iconStart = new LKMap.Icon({
    size: new LKMap.Size(46, 46),
    image: startIcon,
    imageSize: new LKMap.Size(46, 46)
  })
  const iconEnd = new LKMap.Icon({
    size: new LKMap.Size(46, 46),
    image: endIcon,
    imageSize: new LKMap.Size(46, 46)
  })

  if (data.carInfo[0].status === 1 || data.carInfo[0].status === 4) {
    fillEndColor = '#BFDCC3'
  } else {
    fillEndColor = '#66AE35'
  }

  markers[0] = new LKMap.Marker({
    position: positionStart,
    icon: iconStart,
    anchor: 'bottom'
  })
  markers[0].setMap(map)

  circleStart = new LKMap.CircleMarker({
    center: positionStart,
    fillColor: fillStartColor,
    radius: 8 // 半径，单位：px
  })

  circleStart.setMap(map)

  markers[1] = new LKMap.Marker({
    position: positionEnd,
    icon: iconEnd,
    anchor: 'bottom'
  })
  markers[1].setMap(map)

  circleEnd = new LKMap.CircleMarker({
    center: positionEnd,
    fillColor: fillEndColor,
    radius: 8 // 半径，单位：px
  })

  circleEnd.setMap(map)

  map.setFitView(markers, {
    padding: {
      top: 200,
      bottom: 100,
      left: 50,
      right: 50
    }
  })
}

// 添加车辆图标
function addCarIcon(index: number) {
  for (let i = 0; i < data.routeInfo.length; i++) {
    const endPlace = data.routeInfo[0].historyRoute
    const iconCar = new LKMap.Icon({
      size: new LKMap.Size(24, 47),
      image: carIcon,
      imageSize: new LKMap.Size(24, 47),
      imageOffset: new LKMap.Pixel(0, 23)
    })
    const positionCar = new LKMap.LngLat(endPlace[endPlace.length - 1][0], endPlace[endPlace.length - 1][1])
    carMarkers[i] = new LKMap.Marker({
      position: positionCar,
      icon: iconCar,
      anchor: 'bottom',
      rotation: data.routeInfo[0].direction
    })
    carMarkers[i].setMap(map)
    if (index === 0) {
      inforWindow = new LKMap.InfoWindow({
        anchor: 'bottom',
        className: 'customClassName',
        content: createInfoWindow(content.join('')),
        isCustom: true, // 使用自定义窗体
        closeButton: false,
        offset: new LKMap.Pixel(50, -25)
      })
      inforWindow.open(map, positionCar)
    }
  }
}

function currentPositionLine(result: any, color: string) {
  let polyline: any = ''
  polyline = new LKMap.Polyline({
    path: result,
    strokeWeight: 8,
    lineJoin: 'round',
    lineCap: 'round',
    strokeColor: color,
    showDir: true
  })
  polyline.setMap(map)
  polyLineArr.push(polyline)

  map.setFitView(markers, {
    padding: {
      top: 200,
      bottom: 100,
      left: 50,
      right: 50
    }
  })
}

// 信息框
function createInfoWindow(content: any) {
  var info = document.createElement('div')
  info.className = 'gwin-platform-custom-info'
  // 定义中部内容
  var middle = document.createElement('div')
  middle.className = 'gwin-platform-info-content'
  middle.innerHTML = content
  info.appendChild(middle)
  return info
}

function touchDisable(e: Event) {
  e.preventDefault()
}
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';

@include b(index) {
  width: 100%;
  height: 100%;
  position: relative;

  @include e(panel) {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 999;
  }

  @include e(panel-content) {
    width: 320px;
    height: 212px;
    background: #ffffff;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
}

@include b(init-box) {
  position: fixed;
  right: 40px;
  bottom: 40px;
  z-index: 9999;

  @include e(zIndex-box) {
    width: 40px;
    height: 81px;
    background: #ffffff;
    box-shadow: 0px 3px 13px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  @include e(zIndex-item) {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    font-size: 24px;
    color: #000000;
    line-height: 40px;
    font-family: Roboto-Bold, Roboto;
    text-align: center;
    cursor: pointer;
  }

  @include e(hr) {
    width: 30px;
    height: 1px;
    opacity: 0.5;
    background-color: #e1e5f5;
    margin: 0 auto;
  }

  @include e(init) {
    margin-top: 12px;
    background-image: url('../../assets/img/icon-init.png');
    background-size: 100%;
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
}
@include b(map) {
  width: 100%;
  height: 100%;
}

@include b(car-box) {
  margin-top: 20px;
  width: 320px;
  height: 94px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px 20px;
  background-image: url('../../assets/img/card-bg.png');
  background-size: 100% 100%;
  background-color: #ffffff;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  box-sizing: border-box;

  @include e(car-img) {
    width: 60px;
    height: 60px;
  }

  @include e(title-box) {
    display: flex;
    align-items: center;
  }

  @include e(title) {
    font-size: 18px;
    font-family: Roboto-Bold, Roboto;
    font-weight: bold;
    color: #1a2234;
    flex-shrink: 0;
  }

  @include e(status) {
    margin-left: 10px;
    width: 48px;
    height: 20px;
    border-radius: 8px 0px 8px 0px;
    text-align: center;
    font-size: 12px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
  }

  @include e(route) {
    border: 1px solid transparent;
    color: #ffffff;
    background: linear-gradient(180deg, #8bb2ff 0%, #4785ff 100%);
    text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.2);
  }

  @include e(arrive) {
    border: 1px solid #4785ff;
    color: #4785ff;
  }

  @include e(finish) {
    border-radius: 8px 0px 8px 0px;
    border: 1px solid #999999;
    color: #999999;
  }

  @include e(person-box) {
    display: flex;
    align-items: center;
    margin-top: 8px;
  }

  @include e(person) {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #1a2234;
  }

  @include e(hr) {
    width: 1px;
    height: 10px;
    background-color: #999999;
    margin: 0 10px;
  }
}

@include b(order-title) {
  padding: 0 20px;
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #1a2234;
  border-bottom: 1px solid rgba(225, 229, 245, 0.5);
}

@include b(order) {
  width: 100%;
  height: calc(100% - 68px);
  padding: 20px 10px 0 20px;
  box-sizing: border-box;
  overflow: auto;

  @include e(line) {
    display: flex;
    margin-top: 12px;
    align-items: flex-start;

    &:first-child {
      margin-top: 0;
    }
  }

  @include e(label) {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #606a78;
    flex-shrink: 0;
  }

  @include e(txt) {
    margin-left: 10px;
    font-size: 14px;
    font-family: Roboto-Regular, Roboto;
    font-weight: 400;
    color: #606a78;
    line-height: 20px;
  }
}
</style>

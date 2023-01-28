<template>
  <div ref="myChart" class="gwin-platform-linechart"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, markRaw, onMounted, watch } from 'vue'
import { LegendProp, SeriesDateProp } from './interface'

const myChart = ref<any>()

interface EchartsProp {
  xData: string[]
  legendData: LegendProp[]
  seriesData: SeriesDateProp[]
}

const props = defineProps<EchartsProp>()
const color = ['#E33AA3', '#439AFF']

watch(props, (newProps) => {
  setOptions()
})

onMounted(() => {
  initEcharts()
})

function initEcharts() {
  myChart.value = markRaw(echarts.init(myChart.value))
  setOptions()
}

function setOptions() {
  myChart.value.setOption({
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        let str = params[0].name + '<br />'
        params.forEach((item: any, index: number) => {
          str +=
            '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' +
            color[index] +
            '"></span>' +
            item.seriesName +
            ' : ' +
            item.value +
            '<br />'
        })
        return str
      }
    },
    grid: {
      top: '10',
      left: '3%',
      right: '20',
      bottom: '30',
      containLabel: true
    },
    legend: {
      icon: 'roundRect',
      bottom: 0,
      itemWidth: 16,
      itemHeight: 3,
      itemGap: 20,
      cap: 'round',
      textStyle: {
        color: '#FFFFFF',
        padding: [0, 0, 0, 5]
      },
      data: props.legendData
    },
    xAxis: {
      boundaryGap: false,
      axisLabel: {
        show: true,
        textStyle: {
          color: 'rgb(255 255 255 / 80%)',
          fontWeight: '500'
        },
        margin: 15
      },
      axisTick: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#39456A'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#39456A',
          type: 'dashed'
        }
      },
      data: props.xData
    },
    yAxis: {
      axisLabel: {
        show: true,
        textStyle: {
          color: 'rgb(255 255 255 / 80%)',
          fontWeight: '500'
        },
        margin: 9
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#39456A'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#39456A',
          type: 'dashed'
        }
      }
    },
    series: props.seriesData
  })
}
</script>

<style lang="scss" scoped>
@import '../../../../styles/mixin.scss';

@include b(linechart) {
  width: 100%;
  height: 100%;
}
</style>

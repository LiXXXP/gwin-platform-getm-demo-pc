<template>
  <div class="gwin-platform-number">
    <div class="gwin-platform-number-title" :style="{ marginTop: `${top}px` }">{{ title }}</div>
    <div class="gwin-platform-number-box">
      <div ref="numberRef" class="gwin-platform-number-box__number" :style="{ color: `${color}` }">
        {{ data.value }}
      </div>
      <div class="gwin-platform-number-box__unit">{{ unit }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { TweenLite } from 'gsap'
import { reactive, ref, watch } from 'vue'
interface NumberProps {
  title?: string
  value: string
  unit?: string
  top?: string
  color?: string
}

const props = defineProps<NumberProps>()
const numberRef = ref()

const data = reactive({
  value: 0
})
watch(props, () => {
  TweenLite.to(data, 2, {
    value: props.value,
    onUpdate: showScore
  })
})

function showScore() {
  const index = props.value.toString().indexOf('.')
  if (index > -1) {
    data.value = Number(data.value.toFixed(2))
  } else {
    data.value = Number(data.value.toFixed(0))
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../styles/mixin.scss';

@include b(number) {
  padding-left: 30px;
  width: 50%;
}

@include b(number-title) {
  margin-top: 30px;
  font-size: 14px;
  font-family: Roboto-Medium;
  font-weight: 500;
  color: #ffffff;
}

@include b(number-box) {
  display: flex;
  align-items: flex-end;
  margin-top: 10px;

  @include e(number) {
    font-size: 30px;
    font-family: Roboto-Bold;
    font-weight: bold;
    color: #3aef4b;
    line-height: 30px;
  }

  @include e(unit) {
    font-size: 12px;
    font-family: Roboto-Bold;
    font-weight: bold;
    color: #ffffff;
    margin-left: 8px;
  }
}
</style>

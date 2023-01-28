<template>
  <div class="gwin-platform-number">
    <div class="gwin-platform-number-title" :style="{ marginTop: `${top}px` }">{{ title }}</div>
    <div class="gwin-platform-number-box">
      <div v-for="(item, index) in value" :key="index" class="gwin-platform-number-box__time">
        <div class="gwin-platform-number-box__number" :style="{ color: `${color}` }">{{ item }}</div>
        <div v-if="item !== ''" class="gwin-platform-number-box__unit" :style="{ color: `${color}` }">
          {{ timeTxt[index] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface NumberProps {
  title?: string
  value: string[]
  top?: string
  color?: string
}

const timeTxt = ['小时', '分钟']

defineProps<NumberProps>()
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
    margin-left: 2px;
  }

  @include e(time) {
    display: flex;
    align-items: flex-end;
  }
}
</style>

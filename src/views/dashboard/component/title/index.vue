<template>
  <div class="gwin-platform-title-box">
    {{ title }}
    <div class="gwin-platform-title-box__hr"></div>
  </div>
</template>

<script setup lang="ts">
interface TitleProps {
  title: string
}

defineProps<TitleProps>()
</script>

<style lang="scss" scoped>
@import '../../../../styles/mixin.scss';

@include b(title-box) {
  height: 48px;
  background: radial-gradient(circle, rgba(1, 67, 133, 0.2) 0%, rgba(216, 216, 216, 0) 80%);
  text-align: center;
  line-height: 48px;
  font-size: 22px;
  font-family: Roboto-Bold;
  font-weight: bold;
  color: #00ffff;

  @include e(hr) {
    width: 294px;
    height: 1px;
    background: radial-gradient(circle, #29abe2 0%, rgba(255, 255, 255, 0) 100%);
    margin: 0 auto;
  }
}
</style>

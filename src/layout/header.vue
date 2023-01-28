<template>
  <div class="gwin-platform-header-box">
    <!-- <console-base /> -->
    <div class="gwin-platform-header-box__left">
      <div class="gwin-platform-header-box__more-img">
        <img class="gwin-platform-header-box__icon" :src="iconMore" />
      </div>
      <img class="gwin-platform-header-box__logo" :src="logo" />
    </div>
    <img class="gwin-platform-header-box__user" :src="iconDefault" />
  </div>
</template>

<script setup lang="ts">
import iconMore from '../assets/img/icon-more.png'
import logo from '../assets/img/logo.png'
import iconDefault from '../assets/img/icon-default-user.png'
</script>

<style lang="scss" scoped>
@import '../styles/mixin.scss';

@include b(header-box) {
  position: absolute;
  width: 100%;
  height: 50px;
  display: flex;
  background-color: #2a2f37;
  align-items: center;
  justify-content: space-between;

  @include e(left) {
    display: flex;
    align-items: center;
  }

  @include e(more-img) {
    width: 50px;
    height: 50px;
    background: #39404c;
    padding: 15px;
    box-sizing: border-box;
  }

  @include e(icon) {
    width: 20px;
    height: 20px;
  }

  @include e(logo) {
    margin-left: 24px;
    width: 140px;
    height: 36px;
  }

  @include e(user) {
    margin-right: 30px;
    width: 30px;
    height: 30px;
  }
}
</style>

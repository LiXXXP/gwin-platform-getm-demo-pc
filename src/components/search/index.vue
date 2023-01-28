<template>
  <div class="gwin-platform-form">
    <el-form :inline="true" class="gwin-platform-form__box">
      <div>
        <el-form-item v-for="(item, index) in searchForm" :key="index" class="gwin-platform-form__item-margin">
          <el-input
            v-if="item.type === 'input'"
            v-model="item.value"
            :placeholder="item.placeholder"
            style="width: 220px"
            autocomplete="off"
          >
          </el-input>
          <el-select
            v-if="item.type === 'select'"
            v-model="item.value"
            :placeholder="item.placeholder"
            style="width: 180px"
          >
            <el-option
              v-for="(child, chiidIndex) in item.option"
              :key="chiidIndex"
              :label="child.label"
              :value="child.value"
            ></el-option>
          </el-select>
          <el-date-picker
            v-if="item.type === 'daterange'"
            v-model="item.value"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            style="width: 230px"
          >
          </el-date-picker>
        </el-form-item>
      </div>
      <div v-if="searchButtons.length > 0">
        <el-form-item v-for="(item, index) in searchButtons" :key="index" class="gwin-platform-form__item-margin">
          <el-button
            :class="['gwin-platform-form__operate', { 'gwin-platform-form__active': item.prop === 'search' }]"
            @click="onClick(item.prop)"
            >{{ item.label }}</el-button
          >
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { SearchProps, SearchButtonProps, FormProps, DataParams } from './interface'

interface Props {
  searchForm: SearchProps[]
  searchButtons: SearchButtonProps[]
  tableData: DataParams[]
}

const props = defineProps<Props>()
const emit = defineEmits(['onSearch', 'tableButton'])

const formInfo = {}

function onSearch() {
  const searchForm = props.searchForm
  if (searchForm) {
    searchForm.forEach((item: SearchProps) => {
      ;(<FormProps>formInfo)[item.point] = item.value
    })
    emit('onSearch', formInfo)
  }
}

function onClick(type: string) {
  if (props.tableData.length === 0) {
    return
  }
  emit('tableButton', type)
}
</script>

<style lang="scss" scoped>
@import '../../styles/mixin.scss';

@include b(form) {
  width: 100%;

  @include e(box) {
    display: flex;
    justify-content: space-between;
  }

  @include e(item-margin) {
    margin: 0 20px 0 0;
  }

  @include e(buttons) {
    display: flex;
  }

  @include e(search) {
    width: 70px;
    height: 40px;
    background: #3860f4;
    border-radius: 0px 4px 4px 0px;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    margin-right: -5px;
    letter-spacing: 5px;
  }

  @include e(active) {
    background: #3860f4;
    color: #ffffff !important;
  }

  @include e(operate) {
    width: 84px;
    height: 38px;
    min-height: 38px;
    border-radius: 4px;
    border: 1px solid #3860f4;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    text-align: center;
    padding: 0;
    color: #3860f4;
  }
}
</style>

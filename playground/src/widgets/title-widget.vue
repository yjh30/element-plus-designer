<template>
<div class="page-title-container">
  <img src="./logo.png" />
  <span>{{title}}</span>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { bizInstance } from '../service/biz'

export default defineComponent({
  setup() {
    return {
      title: bizInstance.pageTitle
    }
  }
});
</script>

<style scoped lang="less">
.page-title-container {
  font-size: 16px;
  display: flex;
  align-items: center;
  img {
    width: 30px;
    margin-right: 10px;
  }
}
</style>

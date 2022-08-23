<template>
<div class="page-title-container">
  {{title}}
</div>
</template>

<script>
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
}
</style>
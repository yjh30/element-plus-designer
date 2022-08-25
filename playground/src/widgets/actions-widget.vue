<template>
  <div class="dn-actions-widget">
    <el-button
      @click="handleSaveSchema"
      type="primary"
    >
      {{buttonText}}
    </el-button>

    <el-button @click="onClosePage">关闭页面</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import { loadInitialSchema, saveSchema } from '../service'
import { bizInstance } from '../service/biz'
import { GlobalRegistry } from '@designable/core'
import { useDesigner } from '@formily/element-plus-prototypes'

function useI18n() {
  const language = ref(
    String.prototype.toLocaleLowerCase.call(
      GlobalRegistry.getDesignerLanguage()
    )
  )
  function handleChangeLanguage(value: string) {
    language.value = value
    GlobalRegistry.setDesignerLanguage(value)
  }
  return { language, handleChangeLanguage }
}

export default defineComponent({
  setup() {
    const designerRef = useDesigner()
    // // TODO::tree node has reaction problems

    onMounted(() => {
      loadInitialSchema(designerRef.value)
    })

    function handleSaveSchema() {
      saveSchema(designerRef.value)
    }

    function onClosePage() {
      history.back();
    }

    return { ...useI18n(), handleSaveSchema, onClosePage, buttonText: bizInstance.buttonText }
  },
})
</script>

<style scoped lang="less">
.dn-actions-widget {
  display: flex;
  align-items: center;
}
</style>
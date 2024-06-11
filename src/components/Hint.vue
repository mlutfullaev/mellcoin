<script lang="ts" setup="">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="hint">
    <i v-tooltip.left="{
        value: text,
        pt: { arrow: { style: { display: 'none' } } }
      }"
      class="pi pi-info"
    ></i>
  </div>
</template>

<style lang="scss" scoped>

</style>
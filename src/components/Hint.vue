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
.hint {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #9C9E9B;
  display: flex;
  justify-content: center;
  align-items: center;

  i {
    color: #222;
    font-size: 8px;
  }
}
</style>
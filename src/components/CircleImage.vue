<script lang="ts" setup="">

defineProps<{
  size: number,
  firstColor: string,
  secondColor: string,
  image: string,
}>()
</script>

<template>
<div
  class="circle-image"
  :style="{
    width: size + 'px',
    height: size + 'px',
    backgroundColor: firstColor
  }">
  <div :style="{width: size - 20 + 'px', height: size - 20 + 'px', backgroundColor: secondColor}">
    <div :style="{
      width: size - 40 + 'px',
      height: size - 40 + 'px',
      backgroundImage: `url('${image}')`
    }" />
  </div>
</div>
</template>

<style lang="scss" scoped>
.circle-image {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;

  @media (max-width: 320px) {
    width: 120px !important;
    height: 120px !important;
  }
  > div {
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 320px) {
      width: 100px !important;
      height: 100px !important;
    }
    > div {
      border-radius: 50%;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;

      @media (max-width: 320px) {
        width: 80px !important;
        height: 80px !important;
      }
    }
  }
}
</style>
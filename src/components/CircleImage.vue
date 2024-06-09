<script lang="ts" setup="">
defineProps<{
  size: number,
  firstColor: string,
  secondColor: string,
  image: string,
}>()
</script>

<template>
 <div class="circle-image" :style="{width: size + 'px', height: size + 'px', backgroundColor: firstColor}">
   <div :style="{
     width: size - 20 + 'px',
     height: size - 20 + 'px',
     borderColor: secondColor,
     backgroundImage: `url('${image}')`
   }" />
 </div>
</template>

<style lang="scss" scoped>
.circle-image {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;

  > div {
    border-width: 10px;
    border-style: solid;
    border-radius: 50%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
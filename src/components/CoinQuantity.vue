<script lang="ts" setup="">
import {computed} from "vue";

const props = defineProps<{
  value: number
}>()
const formattedValue = computed(() => {
  return props.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
})
</script>

<template>
<div class="coin-quantity">
  <img src="@/assets/icons/bitcoin.svg" alt="coin">
  <h1>{{ formattedValue }}</h1>
</div>
</template>

<style lang="scss" scoped>
.coin-quantity {
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;

  h1 {
    font-weight: 700;
    font-size: 48px;
    color: white
  }
}
</style>
<script lang="ts" setup="">
import {formatCoin} from "../assets/helpers.ts";

defineProps<{
  value?: number
  lvl?: number
}>()
</script>

<template>
<div class="coin-quantity">
  <img src="@/assets/icons/bitcoin.svg" alt="coin">
  <h1>{{ formatCoin(value || 0) }}<span v-if="lvl"> • {{lvl}} lvl</span></h1>
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
    color: white;

    span {
      color: #9C9E9B;
    }
  }
}
</style>
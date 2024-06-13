<script lang="ts" setup="">
import {ref} from "vue";
import {formatCoin} from "@/assets/helpers.ts";

const amounts = [
  1000,
  3000,
  5000,
]

const activeAmount = ref(0)
</script>

<template>
 <div class="coins">
    <button
      v-for="(amount, index) in amounts"
      :class="['btn', activeAmount === index ? 'active' : '']"
      @click="activeAmount = index"
    >
      <img src="@/assets/icons/bitcoin.svg" alt="coin">
      {{ formatCoin(amount) }}
    </button>
 </div>
  <button class="btn">
    <img src="@/assets/icons/twist.svg" alt="twist">
    Twist
  </button>
</template>

<style lang="scss" scoped>
.coins {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 20px 0;

  button {
    background: #090327;
    border: none;

    img {
      width: 20px;
    }
    &.active {
      background: #B282FA;
      color: #fff;
    }
  }
}
</style>
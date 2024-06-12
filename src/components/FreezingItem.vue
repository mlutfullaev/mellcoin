<script lang="ts" setup="">
import {FreezeI} from "@/assets/types.ts";

defineProps<{
  freeze: FreezeI,
  index: number,
}>()
defineEmits<{
  (event: 'on-freeze', index: number): void
}>()
</script>

<template>
  <div class="staking-card">
    <div class="staking-card-content">
      <img :src="freeze.img" alt="freezing">
      <p class="subtitle bold">{{freeze.title}}</p>
      <span class="grey">Freeze under</span>
      <p class="subtitle bold pink">
        <img src="@/assets/img/discount.png" alt="discount">
        {{freeze.percent}}%
      </p>
    </div>
    <button @click="$emit('on-freeze', index)" class="staking-card-button">Activate</button>
  </div>
</template>

<style lang="scss" scoped>
.staking-card {
  padding: 16px 20px;
  background: #090327;
  border-radius: 12px;

  &-content {
    padding-bottom: 10px;
    display: grid;
    grid-template-columns: 40px 1fr;
    grid-column-gap: 10px;
    border-bottom: 1px solid #5F507E;
    align-items: center;

    img {
      grid-row: 1 / 4;
    }
    span {
      font-size: 8px;
      padding: 4px 0;
    }
    p {
      display: grid;
      grid-template-columns: 16px 1fr;
      gap: 4px
    }
  }
  &-button {
    border: 1px solid #B282FA;
    padding: 4px 8px;
    border-radius: 8px;
    margin-top: 10px;
    width: 100%;
  }
}
</style>
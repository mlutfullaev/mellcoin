<script lang="ts" setup="">
import {IStake} from "@/assets/types.ts";

defineProps<{
  stake: IStake,
  activated: boolean,
}>()
defineEmits<{
  (event: 'on-freeze'): void
}>()
</script>

<template>
  <div class="staking-card">
    <div class="staking-card-content">
      <img :src="stake.image" alt="staking">
      <p class="text bold">{{stake.name}}</p>
      <span class="grey">Заморозить под</span>
      <p class="text bold pink">
        <img src="@/assets/icons/discount.svg" alt="discount">
        {{stake.percent}}%
      </p>
    </div>
    <button
      @click="$emit('on-freeze')"
      class="staking-card-button"
      :class="{active: activated}"
    >{{ activated ? 'Уже активирован' : 'Активировать' }}</button>
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
    font-size: 12px;

    &.active {
      background: rgba(178, 130, 250, 0.4);
      border: none;
      color: #fff;
    }
  }
}
</style>
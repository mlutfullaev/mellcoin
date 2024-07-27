<script lang="ts" setup>
import airdrop from '@/assets/img/airdrop.jpeg'
import checked from '@/assets/icons/checked.svg'
import notChecked from '@/assets/icons/notChecked.svg'
import CircleImage from "@/components/CircleImage.vue";

const features = [
  {
    name: 'Exchanges negotiations',
    status: true
  },
  {
    name: 'Market maker negotiations',
    status: true
  },
  {
    name: 'Key partnerships are coming',
    status: true
  },
  {
    name: 'Airdrop task list',
    status: false
  },
]
</script>

<template>
<div class="airdrop-page">
  <CircleImage
    :image="airdrop"
    :size="160"
    second-color="#26154A"
    first-color="#B282FA1A"
  />
  <h2 class="title py-2">Get ready, Airdrop is coming soon!</h2>
  <p
    class="feature pt-1.5"
    v-for="feature in features"
    :key="feature.name"
  >
    <img :src="feature.status ? checked : notChecked" alt="status">
    {{ feature.name }}
  </p>
</div>
</template>

<style lang="scss" scoped>
.airdrop-page {
  padding: 16px 16px 90px;

  h2 {
    max-width: 220px;
    margin: 0 auto;
  }
  .feature {
    display: flex;
    align-items: center;
    gap: 20px;
    font-size: 16px;
  }
}
</style>
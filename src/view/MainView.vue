<script lang="ts" setup="">
import UserStatistics from "@/layouts/UserStatistics.vue";
import CircleImage from "@/components/CircleImage.vue";
import MainImage from '@/assets/img/main-circle.gif'
import CoinQuantity from "@/components/CoinQuantity.vue";
</script>

<template>
<UserStatistics />
<div class="main-page">
  <div class="level">
    <RouterLink to="/">
      Gold <i class="pi pi-arrow-right"></i>
    </RouterLink>
    <p><span>Level </span>3/10</p>
  </div>
  <ProgressBar :showValue="false" :value="50" />
  <div class="content">
    <CircleImage :image="MainImage" :size="300" second-color="#26154A" first-color="#090327" />
    <CoinQuantity :value="27317" />
    <button class="button-pink">
      <img src="@/assets/icons/shuttle.svg" alt="shuttle">
      Boost
    </button>
  </div>
</div>
</template>

<style lang="scss" scoped>
.main-page {
  box-shadow: 0 -12px 20px 0 #B686FF1F;
  background: #170327;
  border-radius: 20px 20px 0 0;
  padding: 16px;
  height: calc(100vh - 160px);

  .level {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;
    font-weight: 400;
    font-size: 12px;

    a {
      display: flex;
      gap: 8px;
      align-items: center;

      i {
        font-size: 12px
      }
    }
    p {
      span {
        color: #9C9E9B;
        padding-right: 10px;
      }
    }
  }

  .content {
    padding: 20px 0 10px;
  }
}
</style>
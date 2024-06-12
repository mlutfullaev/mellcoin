<script lang="ts" setup="">
import UserStatistics from "@/layouts/UserStatistics.vue";
import CircleImage from "@/components/CircleImage.vue";
import MainImage from '@/assets/img/main-circle.gif'
import CoinQuantity from "@/components/CoinQuantity.vue";
</script>

<template>
<UserStatistics />
<div class="main-page pink-content">
  <div class="level">
    <RouterLink to="/levels">
      Gold <i class="pi pi-arrow-right"></i>
    </RouterLink>
    <p><span>Level </span>3/10</p>
  </div>
  <ProgressBar :showValue="false" :value="50" />
  <div class="content">
    <CircleImage :image="MainImage" :size="300" second-color="#26154A" first-color="#090327" />
    <CoinQuantity/>
    <router-link to="/profile" class="btn">
      <img src="@/assets/icons/shuttle.svg" alt="shuttle">
      Boost
    </router-link>
  </div>
</div>
</template>

<style lang="scss" scoped>
.main-page {
  padding: 16px 16px 80px;

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
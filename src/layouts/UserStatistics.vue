<script lang="ts" setup="">
import {useUserStore} from "@/store/userStore.ts";
import {formatWithPrefix} from "../assets/helpers.ts";
import {computed} from "vue";

const userStore = useUserStore()
const photo = computed(() => userStore.webAppData.user?.photo_url)
</script>

<template>
<div class="user-statistics">
  {{userStore.webAppData.user}}
  <div class="avatar" :style="photo ? `background-image: url(${photo})` : ''">
    <i v-if="!photo" class="pi pi-user"></i>
  </div>
  <div class="statistics">
    <div class="statistics-item">
      <img src="@/assets/icons/statistics/tap.svg" alt="coin">
      <p><span>+{{Number(userStore.user?.level) + 2}}</span>/клик</p>
    </div>
    <div class="statistics-item">
      <img src="@/assets/icons/statistics/hours.svg" alt="icon">
      <p><span>+{{userStore.user?.hour_profit}}</span>/клик</p>
    </div>
    <div class="statistics-item">
      <img src="@/assets/icons/statistics/level-up.svg" alt="level-up">
      <p><span>{{formatWithPrefix(Number(userStore.user?.level_coints_cnt))}}</span>/уровень</p>
    </div>
    <div class="statistics-item">
      <img src="@/assets/icons/statistics/rock.svg" alt="rock">
      <p><span>1000</span>/1000</p>
    </div>
  </div>
</div>
</template>

<style lang="scss" scoped>
.user-statistics {
  display: grid;
  grid-template-columns: 52px 1fr;
  align-items: center;
  gap: 20px;
  padding: 20px;

  .avatar {
    border-radius: 12px;
    padding: 14px;
    background-color: #5F507E;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 52px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .statistics {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 12px;
    grid-row-gap: 4px;

    &-item {
      padding: 8px 12px;
      gap: 8px;
      border-radius: 100px;
      background: #26154A;
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;

      p {
        font-size: 10px;
        font-weight: 400;
        color: #FAFAFA;

        span {
          font-weight: 700;
          color: #fff;
        }
      }
    }
  }
}
</style>
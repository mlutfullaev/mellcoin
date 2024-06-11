<script lang="ts" setup="">

import Hint from "@/components/Hint.vue";
</script>

<template>
<div class="user-statistics">
  <div class="avatar">
    <i class="pi pi-user"></i>
  </div>
  <div class="statistics">
    <div class="statistics-item">
      <img src="@/assets/icons/statistics/tap.svg" alt="coin">
      <p><span>+3</span>/tap</p>
    </div>
    <div class="statistics-item">
      <img src="@/assets/icons/statistics/hours.svg" alt="icon">
      <p><span>+3</span>/tap</p>
      <Hint text="This is tap" />
    </div>
    <div class="statistics-item">
      <img src="@/assets/icons/statistics/level-up.svg" alt="level-up">
      <p><span>100k</span>/lvl up</p>
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
    background: #5F507E;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 52px;
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
      display: flex;
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
      .hint {
        margin-left: auto;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #9C9E9B;
        display: flex;
        justify-content: center;
        align-items: center;

        i {
          color: #222;
          font-size: 8px;
        }
      }
    }
  }
}
</style>
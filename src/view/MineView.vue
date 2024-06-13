<script lang="ts" setup="">

import UserStatistics from "@/layouts/UserStatistics.vue";
import CoinQuantity from "@/components/CoinQuantity.vue";
import Hint from "@/components/Hint.vue";
import {ref} from "vue";
import Staking from "@/components/Staking.vue";
import Casino from "@/components/Casino.vue";

const tabMenu = ref([
  { label: 'Staking' },
  { label: 'Casino' },
  { label: 'Cards' },
])
const activeMenu = ref(0)

</script>

<template>
  <UserStatistics />
 <div class="mine-page pink-content">
   <CoinQuantity />
   <p class="text coin-time">00:50:00 <Hint text="This is hint" /></p>
   <TabMenu
     :model="tabMenu"
     @tabChange="(value: any) => activeMenu = value.index"
   />
   <Staking v-if="tabMenu[activeMenu].label === 'Staking'" />
   <div class="cards" v-if="tabMenu[activeMenu].label === 'Cards'">
     <div class="cards-item">
       <img src="@/assets/img/gift.png" alt="gift">
       <h2 class="subtitle mb-3">Map of the day</h2>
       <p class="text mb-2">Open the gift and get one of the many prizes!</p>
       <button class="btn">Open</button>
     </div>
   </div>
   <Casino v-if="tabMenu[activeMenu].label === 'Casino'" />
 </div>
</template>

<style lang="scss" scoped>
.mine-page {
  .coin-time {
    color: #9C9E9B;
    display: flex;
    align-items: center;
    gap: 5px;
    justify-content: right;
    padding: 5px 0 10px
  }
  .cards {
    display: grid;
    gap: 8px;
    min-height: 300px;
    align-items: start;
    margin: 20px 0;

    &-item {
      display: grid;
      grid-template-columns: 68px 1fr;
      align-items: center;
      grid-column-gap: 12px;
      padding: 28px;
      border-radius: 12px;
      background: #10001D;

      img {
        grid-row: 1 / 4;
      }
    }
  }
}
</style>
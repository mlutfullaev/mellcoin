<script lang="ts" setup="">

import UserStatistics from "@/layouts/UserStatistics.vue";
import CoinQuantity from "@/components/CoinQuantity.vue";
import Hint from "@/components/Hint.vue";
import {ref} from "vue";

const tabMenu = ref([
  { label: 'Staking' },
  { label: 'Casino' },
  { label: 'Cards' },
])
const activeIndex = ref(0)
</script>

<template>
  <UserStatistics />
 <div class="mine-page pink-content">
   <CoinQuantity />
   <p class="subtitle coin-time">00:50:00 <Hint text="This is hint" /></p>
   <TabMenu
     :model="tabMenu"
     @tabChange="(value: any) => activeIndex = value.index"
   />
   <div class="staking">

   </div>
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
}
</style>
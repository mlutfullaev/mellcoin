<script lang="ts" setup="">
import CircleImage from "@/components/CircleImage.vue";
import {ref} from "vue";
import {IStake} from "@/assets/types.ts";
import StakingItem from "@/components/StakingItem.vue";

defineProps<{
  stakeList: IStake[]
}>()

const stakeAmount = ref('')
const stakeModal = ref(false)
const activeFreeze = ref<null | number>(null)
</script>

<template>
  <div class="staking">
    <StakingItem
      v-for="(stake, i) in stakeList"
      :key="stake.name"
      :stake="stake"
      :index="i"
      @onFreeze="(index: number) => {activeFreeze = index; stakeModal = true}"
    />
  </div>
  <Sidebar v-model:visible="stakeModal" position="bottom" style="height: auto">
    <CircleImage
      v-if="activeFreeze !== null"
      image="@/assets/icons/1-hour.svg"
      :size="160"
      second-color="#26154A"
      first-color="#B282FA1A"
    />
    <h1 class="title pt-4 pb-2" v-if="activeFreeze !== null">{{stakeList[activeFreeze].name}}</h1>
    <p class="text pb-4" v-if="activeFreeze !== null">Заморозить под {{stakeList[activeFreeze].percent}}%</p>
    <input
      type="text"
      class="input my-4"
      v-model="stakeAmount"
      placeholder="Enter the amount to stake"
    >
    <button @click=" stakeModal = false" class="btn">Activate</button>
  </Sidebar>
</template>

<style lang="scss" scoped>
.staking {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 20px 0;
}
</style>
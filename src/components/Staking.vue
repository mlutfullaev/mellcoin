<script lang="ts" setup="">
import CircleImage from "@/components/CircleImage.vue";
import {computed, ref, watch} from "vue";
import {IStake} from "@/assets/types.ts";
import StakingItem from "@/components/StakingItem.vue";
import axios from "axios";
import {API_URL} from "@/main.ts";
import {useUserStore} from "@/store/userStore.ts";

defineProps<{
  stakeList: IStake[]
}>()

const userStore = useUserStore()
const stakeAmount = ref('')
const stakeSubmitted = ref(false)
const stakeModal = ref(false)
const activeStake = ref<IStake | null>(null)

const onActivate = () => {
  stakeSubmitted.value = true
  if (!activeStake.value) return

  if (stakeError.value) {
    return
  }

  const data = {
    stake_card_id: activeStake.value.id,
    money: stakeAmount.value
  }
  axios.post(`${API_URL}/user/staking`, data)
    .then(() => {
      stakeModal.value = false
    })
}

watch(stakeModal, () => {
  if (!stakeModal.value) {
    stakeSubmitted.value = false
    stakeAmount.value = ''
    activeStake.value = null
  }
})

const stakeError = computed(() => {
  if (!stakeSubmitted.value) return ''

  const amount = Number(stakeAmount.value)
  const minAmount = Number(activeStake.value?.min_amount)
  const maxAmount = Number(activeStake.value?.max_amount)
  if (!amount) return 'Please enter the amount'
  if (amount < minAmount) return `Minimum amount is ${minAmount}`
  if (amount > maxAmount) return `Maximum amount is ${maxAmount}`
  if (amount > Number(userStore.user?.balance)) return 'Insufficient funds'
})
</script>

<template>
  <div class="staking">
    <StakingItem
      v-for="stake in stakeList"
      :key="stake.id"
      :stake="stake"
      @onFreeze="activeStake = stake; stakeModal = true"
    />
  </div>
  <Sidebar v-model:visible="stakeModal" position="bottom" style="height: auto">
    <CircleImage
      image="@/assets/icons/1-hour.svg"
      :size="160"
      second-color="#26154A"
      first-color="#B282FA1A"
    />
    <h1 class="title pt-4 pb-2">{{activeStake?.name}}</h1>
    <p class="text pb-4">Заморозить под {{activeStake?.percent}}%</p>
    <input
      type="text"
      class="input my-4"
      :class="stakeError ? 'error' : ''"
      v-model="stakeAmount"
      placeholder="Enter the amount to stake"
    >
    <p
      v-if="stakeError"
      class="pb-4">
      {{stakeError}}
    </p>
    <button @click="onActivate" class="btn">Activate</button>
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
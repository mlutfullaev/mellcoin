<script lang="ts" setup="">
import CircleImage from "@/components/CircleImage.vue";
import {computed, onMounted, ref, watch} from "vue";
import {IActivatedStake, IStake} from "@/assets/types.ts";
import StakingItem from "@/components/StakingItem.vue";
import axios from "axios";
import {API_URL} from "@/main.ts";
import {useUserStore} from "@/store/userStore.ts";
import {formatTime} from "@/assets/helpers.ts";
import attention from "@/assets/icons/attention.svg";
import CoinQuantity from "@/components/CoinQuantity.vue";
import {useToast} from "primevue/usetoast";

const userStore = useUserStore()
const toast = useToast()
const stakeAmount = ref('')
const stakeSubmitted = ref(false)

const activatedStakeList = ref<IActivatedStake[]>([])
const activatedStakeModal = ref(false)
const activeActivatedStake = ref<IActivatedStake | null>(null)

const stakeModal = ref(false)
const resetModal = ref(false)
const activeStake = ref<IStake | null>(null)
const stakeList = ref<IStake[]>([])
const now = ref(new Date().getTime())

onMounted(() => {
  axios.get(`${API_URL}/stake/list`)
    .then(res => {
      stakeList.value = res.data.data
    })
  axios.get(`${API_URL}/user/staking`)
    .then(res => {
      activatedStakeList.value = res.data.data
    })

  const nowInterval = setInterval(() => {
    now.value = new Date().getTime()
  }, 1000)

  return () => clearInterval(nowInterval)
})

const onClickFreeze = (stake: IStake) => {
  const isActivated = isActivatedStake(stake.id)
  if (isActivated) {
    activatedStakeModal.value = true
    activeActivatedStake.value = activatedStakeList.value.find(activeStake => activeStake.stake_card_id === stake.id) || null
  } else {
    stakeModal.value = true
    activeStake.value = stake
  }
}

const isActivatedStake = (id: number) => {
  return activatedStakeList.value.some(stake => stake.stake_card_id === id)
}

const onActivate = () => {
  stakeSubmitted.value = true

  if (!activeStake.value) return
  if (stakeError.value) return

  const data = {
    stake_card_id: activeStake.value.id,
    money: stakeAmount.value
  }
  axios.post(`${API_URL}/user/staking`, data)
    .then(res => {
      activatedStakeList.value.push(res.data.data)
      stakeModal.value = false
      toast.add({ severity: 'success', detail: 'Стейк активирован!', life: 5000 });
    })
}

const onResetFreeze = () => {
  resetModal.value = true
  activatedStakeModal.value = false
}

const onPermanentlyResetFreeze = () => {
  if (!activeActivatedStake.value) return
  axios.put(`${API_URL}/user/staking/cancel`, {
    stake_card_id: activeActivatedStake.value.stake_card_id
  })
    .then(() => {
      activatedStakeList.value = activatedStakeList.value.filter(stake => stake.stake_card_id !== activeActivatedStake.value?.stake_card_id)
      activeActivatedStake.value = null
      resetModal.value = false
      toast.add({ severity: 'success', detail: 'Стейк деактивирован!', life: 5000 });
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
  if (!amount) return 'Please enter the amount'
  if (amount < minAmount) return `Minimum amount is ${minAmount}`
  if (amount > Number(userStore.user?.balance)) return 'Insufficient funds'
})

const timeLeft = computed(() => {
  if (!activeActivatedStake.value) return ''
  const endDate = new Date(activeActivatedStake.value.end_date).getTime()
  const time = new Date(endDate - now.value)
  const hours = formatTime(time.getHours())
  const minutes = formatTime(time.getMinutes())
  const seconds = formatTime(time.getSeconds())
  return `${hours}:${minutes}:${seconds}`
})
</script>

<template>
  <div class="staking">
    <StakingItem
      v-for="stake in stakeList"
      :key="stake.id"
      :stake="stake"
      :activated="isActivatedStake(stake.id)"
      @onFreeze="onClickFreeze(stake)"
    />
  </div>
  <Sidebar v-model:visible="stakeModal" position="bottom" style="height: auto">
    <CircleImage
      v-if="activeStake?.image"
      :image="activeStake.image"
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
      placeholder="Введите сумму для ставки"
    >
    <p
      v-if="stakeError"
      class="pb-4">
      {{stakeError}}
    </p>
    <button @click="onActivate" :disabled="stakeSubmitted" class="btn">{{stakeSubmitted ? 'Активация' : 'Активировать'}}</button>
  </Sidebar>
  <Sidebar v-model:visible="activatedStakeModal" position="bottom" style="height: auto">
    <CircleImage
      v-if="activeActivatedStake?.stake_card.image"
      :image="activeActivatedStake?.stake_card.image"
      :size="160"
      second-color="#26154A"
      first-color="#B282FA1A"
    />
    <h1 class="title pt-4 pb-2">{{activeActivatedStake?.stake_card.name}}</h1>
    <p class="text pb-4">Заморозка под {{activeActivatedStake?.stake_card.percent}}%</p>
    <p class="grey pb-4">
      Еще осталось - <b class="pink">{{timeLeft}}</b>
    </p>
    <p class="disabled-input input mb-4">
      <img src="@/assets/icons/bitcoin.svg" alt="coin">
      {{activeActivatedStake?.money}}
    </p>
    <button @click="onResetFreeze" class="btn">Деактивировать</button>
  </Sidebar>
  <Sidebar v-model:visible="resetModal" position="bottom" style="height: auto">
    <CircleImage
      :image="attention"
      :size="160"
      second-color="#26154A"
      first-color="#B282FA1A"
    />
    <h1 class="title pt-4 pb-2">Внимание!</h1>
    <p class="text pb-4">Если вы отмените заморозку в данный момент, вы потеряете заработанные деньги</p>
    <CoinQuantity :value="Number(activeActivatedStake?.money)" />
    <button @click="onPermanentlyResetFreeze" class="btn">Деактивировать</button>
  </Sidebar>
</template>

<style lang="scss" scoped>
.staking {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin: 20px 0;
}

.disabled-input {
  display: flex;
  justify-content: center;
  gap: 10px;

  img {
    width: 20px
  }
}
</style>
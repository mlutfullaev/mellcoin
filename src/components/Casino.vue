<script lang="ts" setup="">
import {computed, onMounted, ref} from "vue";
import {formatCoin} from "@/assets/helpers.ts";
import axios from "axios";
import {API_URL} from "@/main.ts";
import {ICasino} from "@/assets/types.ts";
import {useUserStore} from "@/store/userStore.ts";
import {useToast} from "primevue/usetoast";

const amounts = [
  1000,
  3000,
  5000,
]
const userStore = useUserStore()
const toast = useToast()
const segments = ref<ICasino[]>([])
const activeAmount = ref(amounts[0])
const spinning = ref(false)
const angle = ref(0)

onMounted(() => {
  axios.get(`${API_URL}/casino/list`)
    .then(res => {
      segments.value = res.data.data
    })
})

const getSegmentStyle = (index: number) => {
  const angle = 360 / segments.value.length
  return {
    transform: `rotate(${angle * index}deg)`
  };
}
const spinWheel = async () => {
  if (spinning.value) return
  spinning.value = true;
  if (spinError.value) return

  try {
    const res = await axios.post(`${API_URL}/user/casino`, {
      bet: activeAmount.value,
    });
    const id = res.data.data.casino_item.id;
    const winningSegmentIndex = segments.value.findIndex(segment => segment.id === id);

    const segmentAngle = 360 / segments.value.length;
    const stopAngle = winningSegmentIndex * segmentAngle;

    console.log('winningItem', segments.value[winningSegmentIndex].name)

    const currentAngle = 360 - (angle.value % 360);
    const spins = (Math.floor(Math.random() * 5) + 5) * 360;
    const randomAngle = spins + stopAngle + currentAngle;

    angle.value += randomAngle;

    setTimeout(() => {
      spinning.value = false;
      userStore.setUser(res.data.data.user)
      toast.add({ severity: 'success', detail: `Вам упало: ${segments.value[winningSegmentIndex].name}!`, life: 5000 });
    }, 5000);
  } catch (error) {
    console.error('Error spinning the wheel:', error);
    spinning.value = false;
  }
}

const spinError = computed(() => {
  if (!spinning.value) return ''
  if (activeAmount.value > Number(userStore.user?.balance)) {
    return 'Недостаточно средств'
  }
})
</script>

<template>
  <div class="casino" v-if="segments.length">
    <img src="@/assets/icons/mark.svg" alt="mark">
    <div class="casino-content" :style="{ transform: `rotate(-${angle + 135}deg)` }">
      <div class="casino-items">
        <div
          class="segment"
          v-for="(item, i) in segments"
          :key="item.id"
          :style="getSegmentStyle(i)"
        >
          <p>
            {{ item.name }}
            <img v-if="i % 2 === 0" src="@/assets/icons/bitcoin.svg" alt="win">
            <img v-else src="@/assets/icons/lose.svg" alt="lose">
          </p>
        </div>
      </div>
    </div>
    <div class="coins">
      <button
        v-for="amount in amounts"
        :class="['btn', activeAmount === amount ? 'active' : '']"
        @click="activeAmount = amount"
      >
        <img src="@/assets/icons/bitcoin.svg" alt="coin">
        {{ formatCoin(amount) }}
      </button>
    </div>
    <p v-if="spinError" class="pb-4 text-center">{{spinError}}</p>
    <button @click="spinWheel" class="btn">
      <img src="@/assets/icons/twist.svg" alt="twist">
      Крутить
    </button>
  </div>
</template>

<style lang="scss" scoped>
.casino {
  position: relative;

  > img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }
  &-content {
    position: relative;
    width: 90vw;
    height: 90vw;
    max-width: 300px;
    max-height: 300px;
    margin: 20px auto;
    border-radius: 50%;
    background: url("@/assets/img/casino.png") no-repeat;
    background-size: contain;
    padding: 35px;
    transition: 5s;

    .casino-items {
      height: 100%;
      width: 100%;
      position: relative;
      overflow: hidden;

      .segment {
        position: absolute;
        width: 50%;
        height: 50%;
        top: 50%;
        left: 50%;
        transform-origin: 0 0;
        display: flex;
        justify-content: center;
        align-items: center;

        p {
          display: flex;
          transform: rotate(-134deg);
          gap: 5px;

          img {
            width: 20px;
          }
        }
      }
    }
  }
}
.coins {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 20px 0;

  button {
    background: #090327;
    border: none;

    img {
      width: 20px;
    }
    &.active {
      background: #B282FA;
      color: #fff;
    }
  }
}
</style>
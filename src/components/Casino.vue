<script lang="ts" setup="">
import {ref} from "vue";
import {formatCoin} from "@/assets/helpers.ts";

const amounts = [
  1000,
  3000,
  5000,
]
const segments = [
  '+1000',
  'Lose',
  'x2',
  'Lose',
  '+1000',
  'Lose',
  'x2',
  'Lose',
]

const activeAmount = ref(0)
const spinning = ref(false)
const currentRotation = ref(0)

const getSegmentStyle = (index: number) => {
  const angle = 360 / segments.length
  return {
    transform: `rotate(${angle * index}deg)`
  };
}
const spinWheel = () => {
  if (spinning.value) return

  spinning.value = true
  const rotations = Math.floor(Math.random() * 5) + 5
  const segmentAngle = 360 / segments.length
  const randomSegment = Math.floor(Math.random() * segments.length)
  const extraRotation = Math.floor(Math.random() * segmentAngle)

  const targetRotation = (rotations * 360) + (randomSegment * segmentAngle) + extraRotation
  currentRotation.value += targetRotation

  setTimeout(() => {
    spinning.value = false
    const normalizedRotation = (currentRotation.value + 21) % 360;
    const resultIndex = Math.floor((normalizedRotation / segmentAngle)) % segments.length;
    const resultSegment = segments[(segments.length - resultIndex) % segments.length]
    console.log(resultSegment)
  }, 5000)
}
</script>

<template>
  <div class="casino">
    <img src="@/assets/icons/mark.svg" alt="mark">
    <div class="casino-content" :style="{ transform: `rotate(${currentRotation + 225}deg)` }">
      <div class="casino-items">
        <div
          class="segment"
          v-for="(item, i) in segments"
          :key="item"
          :style="getSegmentStyle(i)"
        >
          <p>
            {{ item }}
            <img v-if="i % 2 === 0" src="@/assets/icons/bitcoin.svg" alt="win">
            <img v-else src="@/assets/icons/lose.svg" alt="lose">
          </p>
        </div>
      </div>
    </div>
    <div class="coins">
      <button
        v-for="(amount, index) in amounts"
        :class="['btn', activeAmount === index ? 'active' : '']"
        @click="activeAmount = index"
      >
        <img src="@/assets/icons/bitcoin.svg" alt="coin">
        {{ formatCoin(amount) }}
      </button>
    </div>
    <button @click="spinWheel" class="btn">
      <img src="@/assets/icons/twist.svg" alt="twist">
      Twist
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
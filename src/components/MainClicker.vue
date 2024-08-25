<script lang="ts" setup="">
import mainImage from '@/assets/img/main-circle.gif'
import {uuid} from "vue-uuid";
import {useUserStore} from "@/store/userStore.ts";
import {ref, watch} from "vue";

const emit = defineEmits<{
  (e: 'onTap', value: number): void
}>()

const circle = ref<HTMLDivElement | undefined>()
const clicked = ref(false)

interface FloatingText {
  x: number;
  y: number;
  id: string
  message: string;
}

const userStore = useUserStore();
const floatingTexts = ref<FloatingText[]>([]);

const onTap = (event: TouchEvent) => {
  event.preventDefault()
  const coin = Number(userStore.user?.level) + 2
  const touch = event.touches[0]
  const message = '+' + coin
  const newText: FloatingText = {
    x: 0,
    y: 0,
    id: uuid.v1(),
    message,
  }

  newText.x = touch.clientX
  newText.y = touch.clientY

  floatingTexts.value.push(newText)

  clicked.value = true

  emit('onTap', coin)

  setTimeout(() => {
    floatingTexts.value = floatingTexts.value.filter(text => text.id !== newText.id)
  }, 1000)
};
watch(clicked, () => {
  const timeout = setTimeout(() => {
    clicked.value = false
  }, 200)
  return () => {
    clearTimeout(timeout)
  }
})
</script>

<template>
  <div
    @touchstart.passive="onTap"
    class="circle-image"
    :class="clicked ? 'clicked' : ''"
    ref="circle"
  >
    <img
      :src="mainImage"
      alt="tap-img"
    >
  </div>
  <div
    v-for="text in floatingTexts"
    :key="text.id"
    class="floating-text"
    :style="{ top: `${text.y}px`, left: `${text.x}px` }">
    {{ text.message }}
  </div>
</template>

<style lang="scss" scoped>
.circle-image {
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px auto;
  padding: 10px;
  background: #090327;
  width: 300px;
  height: 300px;
  transition: .2s;

  @media (max-width: 320px) {
    width: 200px !important;
    height: 200px !important;
  }
  &.clicked {
    opacity: 0.95;
    transform: scale(.95);
  }
  img {
    object-fit: cover;
    border: 10px solid #26154A;
    border-radius: 100%;
    width: 100%;
    height: 100%;
    user-select: none;
    pointer-events: none;
  }
}
.floating-text {
  position: absolute;
  transform: translate(-50%, 0);
  transition: all 1s ease-in-out;
  animation: floating 2s;
  pointer-events: none;
  user-select: none;
  font-size: 25px;
  font-weight: 700
}
@keyframes floating {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px);
    opacity: 0;
  }
}
</style>
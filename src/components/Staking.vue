<script lang="ts" setup="">
import {freezing} from "@/assets/data.ts";
import FreezingItem from "@/components/FreezingItem.vue";
import CircleImage from "@/components/CircleImage.vue";
import {ref} from "vue";

const freezeAmount = ref('')
const freezeModal = ref(false)
const activeFreeze = ref<null | number>(null)
</script>

<template>
  <div class="staking">
    <FreezingItem
      v-for="(freeze, i) in freezing"
      :key="freeze.id"
      :freeze="freeze"
      :index="i"
      @onFreeze="(index: number) => {activeFreeze = index; freezeModal = true}"
    />
  </div>
  <Sidebar v-model:visible="freezeModal" position="bottom" style="height: auto">
    <CircleImage
      v-if="activeFreeze !== null"
      :image="freezing[activeFreeze].img"
      :size="160"
      second-color="#26154A"
      first-color="#B282FA1A"
    />
    <h1 class="title pt-4 pb-2" v-if="activeFreeze !== null">{{freezing[activeFreeze].title}}</h1>
    <p class="text pb-4" v-if="activeFreeze !== null">Заморозить под {{freezing[activeFreeze].percent}}%</p>
    <input
      type="text"
      class="input my-4"
      v-model="freezeAmount"
      placeholder="Enter the amount to freeze"
    >
    <button @click=" freezeModal = false" class="btn">Activate</button>
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
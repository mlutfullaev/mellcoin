import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserStore = defineStore('user', () => {
  const user = ref({
    coin: 24537,
    currentLevel: 0,
  })

  return {
    user
  }
})
import {defineStore} from "pinia";
import {ref} from "vue";
import {ILevel} from "@/assets/types.ts";
import axios from "axios";
import {API_URL} from "@/main.ts";

export const useLevelStore = defineStore('level', () => {
  const levels = ref<ILevel[]>([])

  const getLevels = () => {
    axios.get(`${API_URL}/levels`)
      .then(res => {
        levels.value = res.data.data
      })
  }

  return {
    levels,
    getLevels
  }
})
import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"
import { API_URL } from "@/main.ts"
import { IUser } from "@/assets/types.ts"
import { useWebApp } from "vue-tg"
import {useToast} from "primevue/usetoast";
// import {mockUser} from "@/assets/data.ts";

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null)
  const webAppData = useWebApp().initDataUnsafe
  const toast = useToast();

  const fetchUserData = async () => {
    let token = localStorage.getItem('token')
    if (!token) {
      if (!webAppData.user) {
        toast.add({ severity: 'error', summary: 'Something went wrong', detail: 'Please try to reload the page', life: 5000 });
        return
      }

      await axios.post(`${API_URL}/auth/login?${webAppData.start_param}`, {
        id: webAppData.user.id,
        first_name: webAppData.user.first_name,
        last_name: webAppData.user.last_name,
      })
        .then(res => {
          localStorage.setItem('token', res.data.data.token)
        })
    }
    await axios.get(`${API_URL}/user/info`)
      .then(res => {
        user.value = res.data.data
      })
      .catch(e => {
        if (e.response.data.message === 'Unauthenticated.') {
          localStorage.removeItem('token')
          fetchUserData()
        }
      })
  }

  const setUser = (userData: IUser) => {
    user.value = userData
  }

  return {
    user,
    setUser,
    fetchUserData
  }
})
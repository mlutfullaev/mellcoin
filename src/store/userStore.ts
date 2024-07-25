import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"
import { API_URL } from "@/main.ts"
import { IUser } from "@/assets/types.ts"
import { useWebApp } from "vue-tg"
// import {mockUser} from "@/assets/data.ts";

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser | null>(null)

  const getToken = async () => {
    const { user } = useWebApp().initDataUnsafe
    // const user = mockUser

    if (!user) return
    console.log(user)

    await axios.post(`${API_URL}/auth/login`, {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
    })
      .then(res => {
        localStorage.setItem('token', res.data.data.token)
      })
  }

  const fetchUserData = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      await getToken()
    }
    await axios.get(`${API_URL}/user/info`)
      .then(res => {
        user.value = res.data.data
      })
  }

  const setUser = (userData: IUser) => {
    console.log(userData)
    user.value = userData
  }

  return {
    user,
    setUser,
    fetchUserData
  }
})
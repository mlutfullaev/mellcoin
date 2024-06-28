import {defineStore} from "pinia";
import {ref} from "vue";
// import {useWebApp} from "vue-tg";
import {mockUser} from "@/assets/data.ts";
import axios from "axios";
import {API_URL} from "@/main.ts";
import {IUser} from "@/assets/types.ts";

export const useUserStore = defineStore('user', () => {
  const userFromLS = localStorage.getItem('user')
  const user = ref<IUser | null>(userFromLS ? JSON.parse(userFromLS) : null)

  const getToken = async () => {
    // const data = useWebApp().initDataUnsafe
    const data = mockUser

    await axios.post(`${API_URL}/auth/login`, {
      id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
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
        localStorage.setItem('user', JSON.stringify(res.data.data))
      })
  }

  return {
    user,
    fetchUserData
  }
})
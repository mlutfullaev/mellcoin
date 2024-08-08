<script lang="ts" setup="">
import {computed, onMounted, ref} from "vue";
import axios from "axios";
import {API_URL} from "@/main.ts";
import {IUser} from "@/assets/types.ts";
import {formatWithPrefix} from "../assets/helpers.ts";
import {useUserStore} from "@/store/userStore.ts";

const userStore = useUserStore()
const checking = ref(false)
const copied = ref(false)
const showLevels = ref(false)

const link = computed(() => `https://t.me/${import.meta.env.VITE_APP_BOT}/melcoin?startapp=${userStore.webAppData.user?.id}`)

const friendList = ref<IUser[]>([])

const onCopy = () => {
  navigator.clipboard.writeText(link.value)
  copied.value = true

  setTimeout(() => {
    copied.value = false
  }, 2000)
}

const refresh = () => {
  checking.value = true
  setTimeout(() => {
    axios.get(`${API_URL}/user/friends`)
      .then(res => {
        friendList.value = res.data.data
        checking.value = false
      })
  }, 2000)
}

onMounted(() => {
  refresh()
})
</script>

<template>
 <div class="friends-page">
  <h1 class="title pb-2">Пригласите своих друзей!</h1>
   <p class="text pb-4 text-center grey">Вы и ваш друг будете получать бонусы</p>
   <div class="cards">
     <div class="cards-item">
       <img src="@/assets/img/1.png" alt="one">
       <p class="text bold pt-3 pb-2">1 уровень</p>
       <p>
         <img src="@/assets/icons/discount.svg" alt="discount">
         <span class="bold pink">5%</span>
         <span class="grey">с дохода</span>
       </p>
     </div>
     <div class="cards-item">
       <img src="@/assets/img/2.png" alt="two">
       <p class="text bold pt-3 pb-2">2 уровень</p>
       <p>
         <img src="@/assets/icons/discount.svg" alt="discount">
         <span class="bold pink">3%</span>
         <span class="grey">с дохода</span>
       </p>
     </div>
     <div class="cards-item" v-if="showLevels">
       <img src="@/assets/img/3.png" alt="two">
       <p class="text bold pt-3 pb-2">3 уровень</p>
       <p>
         <img src="@/assets/icons/discount.svg" alt="discount">
         <span class="bold pink">1%</span>
         <span class="grey">с дохода</span>
       </p>
     </div>
   </div>
   <button v-if="!showLevels" @click="showLevels = true">Больше бонусов</button>
   <h2 class="subtitle py-4 flex justify-between">
     Список ваших друзей
     <button @click="refresh" :class="{'spin': checking}"><i class="pi pi-refresh" /></button>
   </h2>
   <div
     v-if="friendList.length"
     class="friend-list mb-4"
     v-for="friend in friendList"
   >
     <div class="small-card">
       <img class="small-card-img" src="@/assets/img/avatar.png" alt="avatar">
       <div>
         <p class="text small-card-name">{{friend.first_name}}</p>
         <p class="text bold small-card-prize">
           <span>{{friend.level}} уровень •</span>
           <img src="@/assets/icons/bitcoin.svg" alt="coin">
           {{formatWithPrefix(friend.balance)}}
         </p>
       </div>
       <p class="subtitle flex gap-1">
         <img src="@/assets/icons/bitcoin.svg" alt="coin" width="20">
         +25K
       </p>
     </div>
   </div>
   <div class="notfound mb-4" v-else-if="!checking">
     Вы еще никого не пригласили
   </div>
   <div class="friends-buttons">
      <a :href="`https://t.me/share/url?url=${link}`" class="btn">Пригласить друга <i class="pi pi-users"></i></a>
      <button
        class="btn"
        @click="onCopy"
        :disabled="copied"
      >
        <i :class="`pi ${copied ? 'pi-check' : 'pi-copy'}`"></i>
      </button>
   </div>
 </div>
</template>

<style lang="scss" scoped>
.friends-page {
  padding: 0 16px 90px;

  .cards {
    padding: 20px 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;

    &-item {
      padding: 20px;
      border-radius: 8px;
      background: #26154A;
      text-align: center;

      p {
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: center;
      }
      img {
        width: max-content;
        display: inline;
      }
    }
  }
  > button {
    border: 1px solid #B282FA;
    color: #B282FA;
    border-radius: 8px;
    padding: 12px 20px;
    font-weight: 700;
    font-size: 16px;
    transition: .3s;
    display: block;
    width: max-content;
    margin: 0 auto;

    &:hover {
      background: #B282FA;
      color: #fff;
    }
  }
  .friend-list {
    display: grid;
    gap: 8px;
    align-items: start;

    .small-card {
      cursor: auto;
    }
  }
  .friends-buttons {
    margin-top: auto;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 8px;
  }
  .spin {
    transform: rotate(0deg);
    animation: spin .7s linear infinite;
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>
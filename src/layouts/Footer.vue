<script lang="ts" setup="">

</script>

<template>
 <footer>
    <RouterLink to="/">
      <img src="@/assets/icons/footer/exchange.svg" alt="exchange">
      Exchange
    </RouterLink>
    <RouterLink to="/mine">
      <img src="@/assets/icons/footer/bitcoin-mining.svg" alt="mining">
      Mine
    </RouterLink>
    <RouterLink to="/friends">
      <img src="@/assets/icons/footer/friends.svg" alt="friends">
      Friends
    </RouterLink>
    <RouterLink to="/earn">
      <img src="@/assets/icons/footer/earning.svg" alt="earning">
      Earn
    </RouterLink>
    <RouterLink to="/levels">
      <img src="@/assets/icons/footer/airdrop.svg" alt="airdrop">
      RoadMap
    </RouterLink>
 </footer>
</template>

<style lang="scss" scoped>
footer {
  position: fixed;
  bottom: 12px;
  left: 8px;
  right: 8px;
  padding: 10px;
  border-radius: 8px;
  background: #090327;
  box-shadow: 0 0 20px 0 #B686FF33;
  display: grid;
  align-items: center;
  text-align: center;
  grid-template-columns: repeat(5, 1fr);
  max-width: 486px;
  margin: 0 auto;

  a {
    font-size: 8px;
    font-weight: 400;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4px;
    border-radius: 12px;
    transition: .3s;

    &.router-link-active {
      background: #26154A;
    }
    img {
      margin-bottom: 4px
    }
  }
}
</style>
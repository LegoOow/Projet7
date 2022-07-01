<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/icon2.png">
    <UserLogin />
  </div>
</template>

<script>
// @ is an alias to /src
import UserLogin from '@/components/UserLogin.vue'

export default {
  name: 'LoginView',
  components: {
    UserLogin
}
}
</script>

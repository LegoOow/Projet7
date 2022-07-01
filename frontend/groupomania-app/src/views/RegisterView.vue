<template>
  <div class="register">
    <img alt="Vue logo" src="../assets/icon2.png">
    <UserRegister />
  </div>
</template>

<script>
// @ is an alias to /src
import UserRegister from '@/components/UserRegister.vue'

export default {
  name: 'RegisterView',
  components: {
    UserRegister
}
}
</script>
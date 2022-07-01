<template>
  <router-view/>
  <nav>
    <router-link to="/">Account</router-link> |
    <router-link to="/register">Sign in</router-link>
  </nav>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #b94242;
    }
  }
}
</style>

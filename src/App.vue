<template>
  <div class="app-main">
    <router-view />
  </div>
</template>
<script setup>

</script>

<style>
*, *::before, *::after {
 box-sizing: border-box;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}


@media only screen and (max-width: 520px) {
  .app-main {
    background: #F2F4FF;
    margin-top:0px;
  }
}
@media only screen and (min-width: 520px) {
  .app-main {
    min-height: 100vh;
    background: #F2F4FF;
    padding-top: 3em;
  }
}
</style>

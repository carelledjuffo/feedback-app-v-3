<template>
  <div class="app-main">
    <!--<div id="nav">
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />
  </div>
</template>

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
.app-main {
  min-height: 100vh;
  background: #F2F4FF;
  padding-top: 3em;
}
@media only screen and (max-width: 520px) {
  .app-main {
    background: #F2F4FF;
    margin-top:0px;
  }
}
</style>

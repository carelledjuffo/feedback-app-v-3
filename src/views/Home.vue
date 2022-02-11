<template>
  <div class="home">
    <FeedbackMain />
  </div>
</template>

<script setup>
import FeedbackMain from "../components/FeedbackMain";
import router from "../router";

const isLoggedIn = localStorage.getItem('isLoggedIn');
if(JSON.parse(isLoggedIn) === false) {
  router.push('/');
}

</script>

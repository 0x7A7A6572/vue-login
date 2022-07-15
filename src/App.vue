<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
// import HelloWorld from './components/HelloWorld.vue'
import LoginWindow from './components/LoginWindow.vue'
</script>

<template>
  <div class="content">
    <LoginWindow class="LoginWindow" title="请先登录 :)" ></LoginWindow>
  </div>
</template>

<style scoped>
.content{
  width: 100vw;
  height: 100vh;
  background: linear-gradient( 45deg, #37c7f7, #00d38d)
}
.LoginWindow{
  max-width: 300px;
  max-height: 400px;
  position: relative;
  top: 40%;
  margin: auto;
}
/* .logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
} */
</style>

<script setup>
import { useRouter } from "vue-router";
import LoginWindow from "../components/LoginWindow.vue";
import { ref } from "vue";
import axios from "axios";
import md5 from "js-md5";

const router = useRouter();
let sendMsg = ref({});

/**  点击登录 */
function onLoginClick(userName, password, isRemeber) {
  // console.log("father read:", userName, password, isRemeber);
  /** axios 请求登录
   *  用户名：zzerx 密码：a123456
   *  */
  axios
    .post("/login", {
      username: userName,
      pswmd5: md5(password),
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.msg == "登录成功") {
        //保存token到localStorage
        window.localStorage.setItem("token", response.data.token);
        //跳转到指定路由
        router.push({ path: "/index" });
      } else {
        sendMsg.value = {
          state: "登陆失败",
          loginButtonDisable: false,
          loginLoading: false,
        };
      }
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
    <LoginWindow
      class="login-Window"
      :onLoginClick="onLoginClick"
      :sendMsg="sendMsg"
    ></LoginWindow>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
}
.content {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(45deg, #37c7f7, #00d38d);
}
.login-Window {
  max-width: 300px;
  max-height: 400px;
  position: relative;
  top: calc(50% - 400px / 2);
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

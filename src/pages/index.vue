<template>
  <div class="user-layout">
    <img class="avatar" :src="avatar" />
    用户名: <div class="user-data">{{ userName }}</div>
    介绍: <div class="user-data">{{ perview }}</div>
    token: <div class="user-data token">{{ token }}</div>
    token签名时间: <div class="user-data">{{  new Date(iat*1000) }}</div>
    token过期时间: <div class="user-data">{{  new Date(exp*1000) }}</div>
  <div class="outLogin" @click="outLogin">退出登录-></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
let userName = ref("");
let perview = ref("");
let avatar = ref("");

let token = window.localStorage.getItem("token");
let iat = ref(0); //token签名时间
let exp = ref(0); //token过期时间

axios
  .get("/index", {
    headers: {
      //Bearer token
      Authorization: "Bearer " + token,
    },
  })
  .then((response) => {
    console.log("success:", response.data);
    switch (response.data.state) {
      //设置token过期或无效时删除localStorage中的token
      case -1:
        router.push({ path: "/login" });
        window.localStorage.removeItem(token);
        break;
      case 0:
        router.push({ path: "/login" });
        window.localStorage.removeItem(token);
        break;
      case 1:
        userName.value = response.data.userInfo.username;
        perview.value = response.data.userInfo.preview;
        avatar.value = response.data.userInfo.avatar;
        iat.value = response.data.payload.iat;
        exp.value = response.data.payload.exp;
        break;
      default:
        console.log(response.data);
    }
  })
  .catch((err) => console.log(err));


  /**退出登录 */
  function outLogin(){
      window.localStorage.removeItem(token);
      router.push({ path: "/login" });
  }
</script>

<style>
.user-layout {
  max-width: 300px;
  height: fit-content;
  padding: 10px;
  background-color: white;
  margin: auto;
}
.avatar {
  max-width: 300px;
}
.token {
  word-break: break-all;
  color: cornflowerblue !important;
}
.user-data{
    color: rgb(0, 170, 142);
    font-weight: bold;
}
.outLogin{
    cursor: pointer;
     font-weight: bold;
    color: red;
    font-size: x-large;
}
</style>

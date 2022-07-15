<script setup>
import { ref,watch }from "vue";
const props = defineProps({
  title: String,
  userNameLimit: {  //用户名限制
    type: Object,
    default: {
      email: true, //允许输入email
      max: 20,     //长度限制
      min: 6,
    },
  },
  passwordLimit: {
    type: Object,
    default: {
      max: 20,
      min: 6,
    },
  },
  onUserNameChange: Function, //用户名输入改变监听
  onPasswordChange: Function, //密码输入改变监听
  onLoginClick: Function,     // 点击登录事件
});
let userName = ref("");
let password = ref("");
let isRemeber = ref(true); // 是否记住密码
let loginButtonDisable = ref(true);
let loginButtonLoading = ref(false);

watch([userName, password], (newVal, oldVal) => {
      console.log({ newVal, oldVal });
     if(newVal[0].length >= props.userNameLimit.min 
     && newVal[1].length >= props.passwordLimit.min ){
        loginButtonDisable.value = false;
     }
    })

function toLogin() {
    alert(userName.value + password.value + isRemeber.value)
    if(props.onLoginClick){
      props.onLoginClick(userName.value, password.value, isRemeber.value);
    }
}
function onUserNameChange(e){
 console.log(userName.value);
 checkUserName(userName.value)
}

/**
 *  检查用户名规范
 */
function checkUserName(username){
//用户名正则，m到n位（字母，数字，下划线，减号）
let max = props.userNameLimit.max || 20;
let min = props.userNameLimit.min || 6;

let userNamePattern = new RegExp('^[a-zA-Z0-9_-]{' + min + ',' + max +'}$');
if (!userNamePattern.test(username)) {
	console.log("√");
}else{
	console.log("您的用户名格式有误")
}
}

</script>
<template>
  <div class="login-window">
    <div class="title-text">{{ title }}</div>
    <form>
    <input class="username" placeholder="用户名/邮箱" v-model="userName" :maxlength="userNameLimit.max" @input="onUserNameChange"/>
    <input class="password" placeholder="密码" type="passWord"  v-model="password" :maxlength="passwordLimit.max"/>
      </form>
    <div class="remamber-password">
      
      <label><input type="checkbox" :checked="isRemeber" />记住密码</label>
    </div>
    <button
      :disabled="loginButtonDisable"
      :loading="loginButtonLoading"
      @click="toLogin"
    >
      登录
    </button>
  </div>
</template>

<style scoped>
.login-window {
  color: #59f;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.61);
  border-radius: 10px;
  text-align: center;
  box-shadow: 10px 10px 1px rgba(96, 160, 255, 0.329);
}

form{
    display: contents;
}
.login-window .title-text {
  text-align: left;
  font-weight: bold;
  font-size: larger;
}

.login-window .title-text::before {
  content: "|";
  width: 10px;
  border-radius: 2px;
  background-color: rgb(115, 171, 255);
  box-shadow: 5px 5px 1px rgba(255, 255, 255, 0.774);
  margin-right: 10px;
}

/** 登录按钮 */
.login-window button {
  background-color: #59f;
  border-color: transparent;
  border-style: solid;
  border-radius: 5px;
  padding: 10px;
  color: white;
  font-size: large;
  box-shadow: 5px 5px 1px rgba(109, 168, 255, 0.685);
}


.login-window button:hover {
  border-color: rgb(155, 210, 255);
  font-size: larger;
  font-weight: bold;
}

.login-window button[disabled] {
    filter: grayscale(0.6);
}


.login-window input {
  border-color: transparent;
  border-style: solid;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.61);
}
.login-window input:hover {
  border-color: rgb(155, 210, 255);
}
.remamber-password {
  text-align: left;
  color: #59f;
  align-items: center;
  color: grey;
  font-weight: lighter;
}
</style>

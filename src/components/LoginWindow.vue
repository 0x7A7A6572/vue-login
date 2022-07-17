<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  sendMsg: Object,
  userNameLimit: {
    //用户名限制
    type: Object,
    default: {
      email: true, //允许输入email
      max: 20, //长度限制
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
  onLoginClick: Function, // 点击登录事件
});
let msg = ref("");
let userName = ref("");
let password = ref("");
let isRemeber = ref(true); // 是否记住密码
let text_login_button = ref("登录");
let loginButtonDisable = ref(true);
let loginLoading = ref(false);
let qualifiedPassword = ref(true);
let qualifiedUsername = ref(true);

/**监听密码格式规范 */
// watch(password.value, (newVal, oldVal) => {
//   let max = props.passwordLimit.max || 20;
//   let min = props.passwordLimit.min || 6;
//   if (checkPassword(password.value, min, max)) {
//     qualifiedPassword.value = true;
//   } else {
//     qualifiedPassword.value = false;
//   }
// });

/**监听用户名格式规范 */
// watch(userName.value, (newVal, oldVal) => {
//   let max = props.userNameLimit.max || 20;
//   let min = props.userNameLimit.min || 6;
//   if (checkUserName(userName.value, min, max)) {
//     qualifiedUsername.value = true;
//   } else {
//     qualifiedUsername.value = false;
//   }
// });

/** 监听用户名密码正确性 */
watch([qualifiedPassword, qualifiedUsername], (newVal) => {
   console.log(newVal)
   if(newVal[0] == true && newVal[1] == true){
    loginButtonDisable.value = false;
    msg.value = '';
   }
});

watch(() => props.sendMsg, (newVal) => {
   msg.value = newVal.state;
   loginButtonDisable.value = newVal.loginButtonDisable;
   loginLoading.value = newVal.loginLoading;
   if(loginLoading.value == false){
    text_login_button.value = '登录';
   }
});

function toLogin() {
  if (
    userName.value.length == 0 || password.value.length == 0
  ) {
    qualifiedPassword.value = false;
    qualifiedUsername.value = false;
    msg.value = "用户名和密码不能为空！";
    return;
  }
  if (props.onLoginClick) {
    props.onLoginClick(userName.value, password.value, isRemeber.value);
  }
  text_login_button.value = "登陆中...";
  loginButtonDisable.value = true;
  loginLoading.value = true;
}
function onUserNameChange(e) {
  let max = props.userNameLimit.max || 20;
  let min = props.userNameLimit.min || 6;
  if (checkUserName(userName.value, min, max)) {
    qualifiedUsername.value = true;
  } else {
    qualifiedUsername.value = false;
  }
}
/**  */
function onPasswordChange(e) {
  let max = props.userNameLimit.max || 20;
  let min = props.userNameLimit.min || 6;
  if (checkPassword(password.value, min, max)) {
    qualifiedPassword.value = true;
  } else {
    qualifiedPassword.value = false;
   
  }
}

/**
 *  检查用户名规范
 */
function checkUserName(username, min, max) {
  //用户名正则，m到n位（字母，数字，下划线，减号）
  let userNamePattern = new RegExp("^[a-zA-Z0-9_-]{" + min + "," + max + "}$");
  let cnPattern = /[\u4E00-\u9FA5]/;
  if (!userNamePattern.test(username) && cnPattern.test(username)) {
    msg.value = "用户名只能出现字母，数字，下划线，减号";
    return false;
  }
  if (username.lenght <= min) {
    msg.value = ("用户名长度最小为", min);
    return false;
  }
  return true;
}

/**
 *  检查密码规范
 */
function checkPassword(password, min, max) {
  let passwordPattern = new RegExp(
    "^(?=.*[a-zA-Z])(?=.*[^\da-zA-Z\s])([a-zA-Z]|[^\da-zA-Z\s]){" + min + "," + max +"}$"
  );
  if (passwordPattern.test(password)) {
    return true;
  } else {
    msg.value =
      ("您的密码格式有误," +
        min +
        "~" +
        max +
        "位，只能由字母、特殊字符组成.");
        return false;
  }
}
/** 报错 */
function getErrMsg(){
  if(msg.value != ''){
    return true;
  }
   return false;
}
</script>
<template>
  <div class="login-window">
    <div class="title-text">请先登录 :)</div>
     <div v-show="getErrMsg()" :class="['message']">ERROR:<br/>{{msg}}</div>
    <form>
      <input
        :class="['username', qualifiedUsername ? '' : 'unqualified']"
        placeholder="用户名/邮箱"
        v-model="userName"
        :disabled="loginLoading"
        :maxlength="userNameLimit.max"
        @input="onUserNameChange"
      />
      <input
        :class="['password', qualifiedPassword ? '' : 'unqualified']"
        placeholder="密码"
        type="passWord"
        v-model="password"
        :disabled="loginLoading"
        :maxlength="passwordLimit.max"
        @input="onPasswordChange"
      />
    </form>
    <div class="remamber-password">
      <input type="checkbox" :checked="isRemeber" />
      <label>记住密码</label>
    </div>
    <button :disabled="loginButtonDisable" :loading="loginLoading" @click="toLogin">
      {{ text_login_button }}
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

form {
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

/** 账号密码输入框 */
.login-window input {
  border-color: transparent;
  border-style: solid;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.61);
}

.login-window input:focus {
  outline: none;
  color: #59f;
}

.login-window input[disabled] {
  filter: contrast(0.6);
}

.login-window input:hover {
  border-color: rgb(155, 210, 255);
}
/** 异常input */
.login-window input.unqualified:focus {
  border-color: rgb(255, 38, 38);
  color: red;
}

/** 记住密码checkbox */
.remamber-password {
  position: relative;
  text-align: left;
  align-items: center;
  color: grey;
  font-weight: lighter;
}

.remamber-password input[type="checkbox"] {
  position: relative;
  width: 15px;
  height: 15px;
  margin-right: 5px;
  cursor: pointer;
}

.remamber-password input[type="checkbox"]:after {
  display: inline-block;
  content: "";
  width: 15px;
  height: 15px;
  border-radius: 3px;
  background: #fff;
  border: 1px solid #59f;
}

.remamber-password input[type="checkbox"]:checked:after {
  content: "✓";
  font-size: 12px;
  font-weight: bold;
  color: #fff;
  background-color: #59f;
  text-align: center;
}
/** 警告状态 */
.bad-status {
  color: red;
}

/** 提示信息显示 */
.message{
    margin-top: 10px;
    padding: 12px;
    background-color: rgba(255, 215, 215, 0.815);
    border-left: 5px solid rgb(255, 106, 106);
    border-radius: 3px;
    font-size: smaller;
    color: red;
    text-align: left;
  box-shadow: 6px 6px 2px rgba(255, 181, 176, 0.589);

}
</style>

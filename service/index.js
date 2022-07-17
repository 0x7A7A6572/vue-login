const express = require('express');
const jwt = require('jsonwebtoken');
const jwtKey = 'you-jwt-token';
const app = express();
//演示数据库数据
const database = {
    username: 'zhuangsan',
    pswmd5: '0C59F1756B201E2BDFD5AAA6162E9073', //-> this.is.password.001
    preview: '我叫张三'
};
//解析Json
app.use(express.json());
//登录页面
app.post('/login', (req, res) => {
    const { username, pswmd5 } = req.body;
    console.log("请求登录：", username, pswmd5);
    //简单验证用户名密码 *更完善可以使用 express-validator
    if (username === database.username && pswmd5 === database.pswmd5) {
        //使用jwt签名数据
        jwt.sign({ username },     //给客户端的token数据
            jwtKey,                //密钥
            { expiresIn: '90s' },  //过期时间
            (err, token) => {      //回调
                //返回token和用户数据
                res.json({
                    msg: "登录成功", userInfo: {
                        username,
                        preview: database.preview
                    },
                    token
                });
                console.log(username, "登录成功[token:", token);
            })

    } else {
        res.json({ msg: "登录失败" });
    }
})

//主页面
app.get('/',(req,res) => {
    const headers = req.headers;
    const token = getAuthorzation(headers).token;
    //验证token
    jwt.verify(token, jwtKey, (err, payload) => {
        if(err){
            let errMsg = '验证失败：';
            if(err.name == 'TokenExpiredError'){//token过期
                errMsg += 'token过期'
            }else if(err.name == 'JsonWebTokenError'){//无效的token
                errMsg += '无效的token'
            }
            console.log(errMsg);
            res.json({msg: errMsg, payload});
        }else{
            res.json({msg:"验证成功", payload});
        }
    })
})

app.listen(3888, () => {
    console.log("服务器已启动![:3888]...")
})

/** 获取authorization */
function getAuthorzation(headers){
   let authorzation = headers['authorization'] || '';
   authorzation = authorzation.split(' ');
//    console.log(authorzation)
   if(Array.isArray(authorzation) && authorzation.length == 2){
      return {
        type: authorzation[0],
        token: authorzation[1]
      }
   }else{
      return {
        type: null,
        token: null
      }
   }
}
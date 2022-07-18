import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    port: "3889",
    host: 'localhost',
    // //配置本地跨域
    proxy: {
      // '/index': 'http://localhost:3888/index',
      '/index': {
        target: 'http://localhost:3888/index',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/index/, '') // 不可以省略rewrite
      },
      '/login': {
        target: 'http://localhost:3888/login',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/login/, '') // 不可以省略rewrite
      }
    }
  }

})

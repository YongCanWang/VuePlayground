<script setup>
import { createApp } from 'vue'
const app = createApp({
  data() {
    return {
      count: 50
    }
  }
})

app.mount('#app')

app.config.errorHandler=(error) =>{
    // 错误处理
}

// 注册一个组件
// app.component('TodoDeleteButton', TodoDeleteButton)


</script>

<template>
 <div id="app">
    <button @click="DOM">DOM: {{ count }}</button>
</div>
</template>



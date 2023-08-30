<!-- 组合式API -->
<script setup> //脚本程序 js
import { ref, onMounted } from 'vue'

// 响应式状态
const count = ref(0)
const index = ref(200)

// 用来修改状态、触发更新的函数
function increment() {
  count.value++
}

function decrement() {
  index.value--
}

// 生命周期钩子
onMounted(() => {
  console.log(`The initial count is ${count.value}.`)
})
</script>

<!--模版 HTML-->
<template>
  <button @click="increment">Count is: {{ count }}</button>
  <button @click="decrement">Count is: {{ index }}</button>
</template>
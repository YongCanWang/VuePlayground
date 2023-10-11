<!-- 生命周期钩子 -->
<script setup>
import { ref, onMounted } from 'vue';

const el = ref('abcdef')

const name = ref('TomCan')


setTimeout(() => {
  onMounted(() => {
    // 异步注册时当前组件实例已丢失
    // 这将不会正常工作
  })
}, 100)

onMounted(() => {
  console.log(`the component is now mounted.`)
  el.value // <div>
  name.value
})


</script>

<template>

<div ref="el"> function onMounted: {{ el }} </div>

<div> function onMounted: {{ name }} </div>

</template>
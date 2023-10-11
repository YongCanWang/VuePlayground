<!-- 子组件 ButtonCounter-->
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
<button @click="count++">My form ButtonCounter.You clicked me 
{{ count }} times.</button>
</template>

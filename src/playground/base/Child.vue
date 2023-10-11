<!-- 子组件 Child -->
<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
<button @click="count++">My form Child. You clicked me
 {{ count }} times.</button>
</template>
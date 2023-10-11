<!-- 子组件 BlogPost.vue -->
<script setup>
import { ref,defineProps } from 'vue'

// defineProps(['title'])

//包含了可以传递给组件的所有 props
const props = defineProps(['title','key'])
// const props = defineProps(['title'], ['key'])
console.log(props.title)
console.log(props.key)



const emit = defineEmits(['enlarge-text'])  // 不需要导入
emit('enlarge-text')

</script>

<template>
  <h4>My Form BlogPost:key = {{ key }} --- title = {{ title }}</h4>

  <div class="blog-post">
    <h4>{{ title }}</h4>
    <!-- 子组件可以通过调用内置的 $emit 方法，通过传入事件名称来抛出一个事件 -->
    <button @click="$emit('enlarge-text')">Enlarge text</button> 
  </div>

</template>
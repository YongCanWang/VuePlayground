<!-- 模版引用 -->
<script setup>
import { ref, onMounted,watchEffect } from 'vue' 
import Child from './Child.vue' 

/**
 * 访问模板引用
 */
// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)  // 通过ref获得该模版的引用

onMounted(() => {   
  input.value.focus() // 通过引用设置焦点到input元素上
})


// 注意，你只可以在组件挂载后才能访问模板引用。
//如果你想在模板中的表达式上访问 input，在初次渲染时会是 null。
//这是因为在初次渲染前这个元素还不存在呢！
//如果你需要侦听一个模板引用 ref 的变化，确保考虑到其值为 null 的情况
watchEffect(() => {
  if (input.value) {
    input.value.focus()
  } else {
    // 此时还未挂载，或此元素已经被卸载（例如通过 v-if 控制）
  }
})


/**
 * v-for 中的模板引用
 */

 const list = ref([
  /* ... */
  1,2,3,4,5,6
])

// 当在 v-for 中使用模板引用时，对应的 ref 中包含的值是一个数组，
//它将在元素被挂载后包含对应整个列表的所有元素
const itemRefs = ref([])  // 模版引用，ref 数组并不保证与源数组相同的顺序。

onMounted(() => console.log(itemRefs.value))  //模版引用包含了整个列表的所有元素


/**
 * 函数模板引用
 */
const el = ref('')
// function el() {
// }



/**
 * 组件上的 ref
 */

 const child = ref(null)
 onMounted(() => {
  // child.value 是 <Child /> 组件的实例

})



const a = 1
const b = ref(2)
// 像 defineExpose 这样的编译器宏不需要导入
defineExpose({
  a,
  b
})
</script>


<!-- <script>
// 如果不使用 <script setup>，需确保从 setup() 返回 ref
export default {
  setup() {
    const input = ref(null)
    // ...
    return {
      input
    }
  }
}
</script> -->

<template>

    <!-- v-for 中的模板引用 -->
  <input ref="input" />


  <!-- v-for 中的模板引用 -->
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item }}
    </li>
  </ul>

<!-- 函数模板引用 -->
<input :ref="(el) => { /* 将 el 赋值给一个数据属性或 ref 变量 */ }">


<!-- 组件上的ref -->
<Child ref="child" />

</template>
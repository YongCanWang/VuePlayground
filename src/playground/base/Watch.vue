<!-- 侦听器 -->
<script setup>
import { ref, watch,reactive,watchEffect, watchPostEffect } from 'vue'

/**
 *基本示例
 */
const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')

// 可以直接侦听一个 ref
watch(question, async (newQuestion, oldQuestion) => {
  if (newQuestion.indexOf('?') > -1) {
    answer.value = 'Thinking...'
    try {
      const res = await fetch('https://yesno.wtf/api')
      answer.value = (await res.json()).answer
    } catch (error) {
      answer.value = 'Error! Could not reach the API. ' + error
    }
  }
})


/**
 * 侦听数据源类型
 */
const x = ref(0)
const y = ref(0)

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})


// 不能直接侦听响应式对象的属性值
const obj = reactive({ count: 0 })
// 错误，因为 watch() 得到的参数是一个 number
watch(obj.count, (count) => {
  console.log(`count is: ${count}`)
})

// 提供一个 getter 函数
watch(
  () => obj.count,   
  (count) => {
    console.log(`count is: ${count}`)
  }
)



/**
 * 深层侦听器
 */
// 直接给 watch() 传入一个响应式对象，
// 会隐式地创建一个深层侦听器——该回调函数在所有嵌套的变更时都会被触发：
watch(obj, (newValue, oldValue) => {
  // 在嵌套的属性变更时触发
  // 注意：`newValue` 此处和 `oldValue` 是相等的
  // 因为它们是同一个对象！
  console.log(`深层次侦听: 
  newValue  ${newValue.count}
  oldValue  ${oldValue.count}`
  )
})

obj.count++



//比之下，一个返回响应式对象的 getter 函数，
//只有在返回不同的对象时，才会触发回调
const state = reactive({ someObject: 0 })
watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
    console.log(`仅当 state.someObject 被替换时触发: ${state.someObject}`)
  }
)


// 显式地加上 deep 选项，强制转成深层侦听器
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* state.someObject 被整个替换了
    console.log(`显式地加上 deep 选项，强制转成深层侦听器:
    newValue  ${newValue}
    oldValue  ${oldValue}
    源数据 ${state.someObject}`)
  },
  { deep: true }
)



/**
 * 即时回调的侦听器
 */
 const source = ref(0)

 watch(source, (newValue, oldValue) => {
  // 立即执行，且当 `source` 改变时再次执行
  console.log(`即时回调的侦听器, immediate: true
    newValue  ${newValue}
    oldValue  ${oldValue}
    源数据 ${source}`)
}, { immediate: true })


/**
 * watchEffect()
 */
 const todoId = ref(1)
const data = ref(null)

watch(todoId, async () => {   // todoId作为源
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`   // todoId作远程请求参数
  )
  data.value = await response.json()
  console.log(`侦听器引用的资源状态发生变化时,侦听器就会加载一个远程资源:
  ${data.value}`)
}, { immediate: true })


// 通过使用watchEffect来简化以上的侦听代码。 
watchEffect(async () => {   // watchEffect() 允许我们自动跟踪回调的响应式依赖
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
  )
  data.value = await response.json()
  console.log(`watchEffect() 允许我们自动跟踪回调的响应式依赖:
  ${data.value}`)   // 回调会立即执行，不需要指定 immediate: true。
})// watchEffect 仅会在其同步执行期间，才追踪依赖。在使用异步回调时，只有在第一个 await 正常工作前访问到的属性才会被追踪。


const callback = ref(null)
/**
 * 回调的触发时机
 */
 watch(source, callback, {
  flush: 'post'  // 如果想在侦听器回调中能访问被 Vue 更新之后的 DOM，你需要指明 flush: 'post' 选项：
})

watchEffect(callback, {
  flush: 'post' // 如果想在侦听器回调中能访问被 Vue 更新之后的 DOM，你需要指明 flush: 'post' 选项：
})


// 后置刷新的 watchEffect() 有个更方便的别名 watchPostEffect()
watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})


/**
 * 停止侦听器
 */
// 它会自动停止
// 同步语句创建的侦听器，会自动绑定到宿主组件实例上，
//并且会在宿主组件卸载时自动停止
watchEffect(() => {})  

//侦听器必须用同步语句创建：如果用异步回调创建一个侦听器，
//那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏
// ...这个则不会！
setTimeout(() => {
  watchEffect(() => {})
}, 100)


// 要手动停止一个侦听器，请调用 watch 或 watchEffect 返回的函数
const unwatch = watchEffect(() => {})
// ...当该侦听器不再需要时
unwatch() // 停止侦听器



// 需要异步请求得到的数据
watchEffect(() => {
  if (data.value) {  // 条件式的侦听逻辑
    // 数据加载后执行某些操作...
  }
})



</script>

<template>
  <p>
    Ask a yes/no question:
    <input v-model="question" />
  </p>
  <p>{{ answer }}</p>

  <p>
    侦听单个ref-x:
    <input v-model="x" /> 
  </p>

  <p>
    侦听单个ref-y:
    <input v-model="y" /> 
  </p>


  <p>
    侦听一个响应式对象obj的属性count(getter):
    <input v-model="obj.count" /> 
  </p>

  <p>
    深层次侦听一个响应式对象obj:
    <input v-model="obj.count" /> 
  </p>

  <p>
    深层次侦听一个响应式对象state的someObject属性(getter):
    <input v-model="state.someObject" /> 
  </p>


  <p>
    即时回调的侦听器, immediate: true :
    <input v-model="source" /> 
  </p>


  <p>
    每当 侦听器引用的todoId 的状态发生变化时，使用侦听器来加载一个远程资源
    <input v-model="todoId" /> 
  </p>

  
   
</template>
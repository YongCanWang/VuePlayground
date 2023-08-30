<!-- 响应式基础 -->
<script>
import { ref } from 'vue'
import { reactive } from 'vue'
export default {
   // 要在组件模板中访问 ref，请从组件的 setup() 函数中声明并返回它们
  // `setup` 是一个特殊的钩子，专门用于组合式 API。
  setup() {
    const count = ref(0)

    function increment() {
      // 在 JavaScript 中需要 .value
      count.value++
    }

    
    // 将 ref 暴露给模板
    return {
        count, //  暴露 ref
        increment   // 暴露 increment 函数
    }
  }
}
</script>


<script setup> // 使用 <script setup> 来大幅度地简化代码
    // 声明响应式状态
    import { ref } from 'vue'
    const count = ref(0)   // 声明响应式状态

    // ref() 接收参数，并将其包裹在一个带有 .value 属性的 ref 对象中返回：
    console.log(count) // { value: 0 }
    console.log(count.value) // 0

    count.value++
    console.log(count.value) // 1

    function increment() {
        // 在 JavaScript 中需要 .value
        count.value++
    }


    /**
     * 为什么要使用 ref？
     */
    // 该 .value 属性给予了 Vue 一个机会来检测 ref 何时被访问或修改
    

    /**
     * 深层响应性 
     */
    // Ref 可以持有任何类型的值，包括深层嵌套的对象、数组或者 JavaScript 内置的数据结构，比如 Map
    const obj = ref({
    nested: { count: 0 },
    arr: ['foo', 'bar']
    })

    function mutateDeeply() {
    // 以下都会按照期望工作
    obj.value.nested.count++
    obj.value.arr.push('baz')
    }



/**
 * DOM的更新时机
 */
// 要等待 DOM 更新完成后再执行额外的代码，可以使用 nextTick() 全局 API
async function increment2() {
  count.value++
  await nextTick()
  // 现在 DOM 已经更新了
}

/**
 * 使用reactive()API声明响应式状态
 */
// 与将内部值包装在特殊对象中的 ref 不同，reactive() 将使对象本身具有响应性
const state = reactive({ count: 0 })

/**
 * Reactive Proxy vs. Original
 */
// 仅使用你声明对象的代理版本,
// 因为：只有代理对象是响应式的，更改原始对象不会触发更新
const raw = {}  // 原始对象
const proxy = reactive(raw) // 代理对象
// 代理对象和原始对象不是全等的
console.log(proxy === raw) // false

// 在同一个对象上调用 reactive() 会返回相同的代理
console.log(reactive(raw) === proxy) // true
// 在一个代理上调用 reactive() 会返回它自己
console.log(reactive(proxy) === proxy) // true

// 依靠深层响应性，响应式对象内的嵌套对象依然是代理
const proxy2 = reactive({})
const raw2 = {}
proxy2.nested = raw2
console.log(proxy2.nested === raw2) // false

/**
 * reactive() 的局限性
 */
// 1.有限的值类型
// 2.不能替换整个对象
let state2 = reactive({ count: 0 })
// 上面的 ({ count: 0 }) 引用将不再被追踪
// (响应性连接已丢失！)
state2 = reactive({ count: 1 })

// 3.对解构操作不友好
const state3 = reactive({ count: 0 })
// 当解构时，count 已经与 state.count 断开连接
let { count2 } = state3
// 不会影响原始的 state
count2++
// 该函数接收到的是一个普通的数字
// 并且无法追踪 state.count 的变化
// 我们必须传入整个对象以保持响应性
// callSomeFunction(state3.count)  // 不能调用，会出错

/**
 * 额外的 ref 解包细节
 */
// 作为 reactive 对象的属性
/**
 * 一个 ref 会在作为响应式对象的属性被访问或修改时自动解包。
 * 换句话说，它的行为就像一个普通的属性。
 */
const count3 = ref(0)
const state4 = reactive({
  count3
})
console.log(state4.count3) // 0
state4.count3 = 1
console.log(count3.value) // 1


/**
 * 如果将一个新的 ref 赋值给一个关联了已有 ref 的属性，
 * 那么它会替换掉旧的 ref
 */
 const otherCount = ref(2)

state.count = otherCount
console.log(state.count) // 2   代理对象更新
// 原始 ref 现在已经和 state.count 失去联系
console.log(count.value) // 1   原始对象不变，并断开代理连接


/**
 * 数组和集合的注意事项
 */
/**
 * 与 reactive 对象不同的是，
 * 当 ref 作为响应式数组或原生集合类型(如 Map) 中的元素被访问时，
 * 它不会被解包
 */
 const books = reactive([ref('Vue 3 Guide')])
// 这里需要 .value
console.log(books[0].value)

const map = reactive(new Map([['count', ref(0)]]))
// 这里需要 .value
console.log(map.get('count').value)



/**
 * 在模板中解包的注意事项
 */

//在模板渲染上下文中，只有顶级的 ref 属性才会被解包。
const countTop = ref(0)
const object = { id: ref(0) }
// 将 id 解构为一个顶级属性
const { id } = object





</script> 


<template>
    <!-- 要在组件模板中访问 ref，请从组件的 setup() 函数中声明并返回它们 -->
    <div>模板中使用 ref {{ count }}</div>

    <button @click="count++">
        事件监听器中改变 ref {{ count }}
    </button>

    <button @click="increment"> 
        事件监听器中改变 ref {{ count }}
    </button>

<button @click="state.count++">
    reactive API {{ state.count }}
</button>


<!-- 
  在模板中解包的注意事项
  -->
  <!-- 在模板渲染上下文中，只有顶级的 ref 属性才会被解包 -->
  <!-- 顶级ref被解包 -->
  <div>在模板中解包: {{ countTop + 1}}</div>  <!-- 1 -->  
   <!-- 深层嵌套ref不会被解包，仍然是一个对象 -->
  <div>在模板中解包: {{ object.id + 1}}</div> <!-- [object Object]1 --> 
  <!-- 将 id 解构为一个顶级属性后，可以被解包 -->
  <div>在模板中解包: {{ id + 1}}</div> <!-- 1 --> 
  <!-- 如果 ref 是文本插值的最终计算值 (即 {{ }} 标签)，那么它将被解包 -->
  <div>在模板中解包: {{ object.id }}</div> <!-- 0 -->   <!--该特性仅仅是文本插值的一个便利特性，等价于 {{ object.id.value }}-->
  
</template>






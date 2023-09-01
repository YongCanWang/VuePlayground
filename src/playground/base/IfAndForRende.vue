<!-- v-if条件渲染与v-for列表渲染 -->
<script setup>
import { ref, reactive, computed } from 'vue'
 
/**
 * v-if条件渲染
 */
const awesome = ref(true)

const type = 'B'

const ok   = ref(true)


/**
 * v-for列表渲染
 */
const items = ref([{ message: 'Foo' }, { message: 'Bar' }])

const parentMessage = ref('Parent')

const message = ''

/**
 * v-for 与对象
 */

/**
 * 使用 v-for 来遍历一个对象的所有属性。
 * 遍历的顺序会基于对该对象调用 Object.keys() 的返回值来决定
 */
const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})


const todos = ref([
{ name: '张三', isComplete:false }, 
{ name: '李四',isComplete: false },
{ name: '王五',isComplete: true },
{ name: '赵六',isComplete: false },
])


const datas = ref([
{ id: '1001', name: '张三', isComplete:false }, 
{ id: '1002', name: '李四', isComplete: false },
{ id: '1003', name: '王五', isComplete: true },
{ id: '1004', name: '赵六', isComplete: false },
{ id: '1004', name: '赵六六', isComplete: false },
{ id: '1005', name: '陈七', isComplete: false }
])


/**
 * 替换一个数组
 */

// `items` 是一个数组的 ref   
const matchItems = ref([])
// items.value = items.value.filter((item) => 
// item.message.match(/Foo/))   // 匹配value=Foo的数据，并筛选出来
matchItems.value = items.value.filter((item) => 
item.message.match(/Foo/))   // 匹配value=Foo的数据，并筛选出来


// 展示过滤或排序后的结果
const numbers = ref([1, 2, 3, 4, 5])
const evenNumbers = computed(() => {
  return numbers.value.filter((n) => n % 2 === 0)
})


// 在计算属性不可行的情况下 (例如在多层嵌套的 v-for 循环中)
const sets = ref([
  [1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10]
])
function even(numbers) {  
  return numbers.filter((number) => number % 2 === 0)
}

</script>



<template>
<!-- v-if条件渲染 -->
<!-- v-if -->
<h1 v-if="awesome">v-if 指令用于条件性地渲染一块内容。
    这块内容只会在指令的表达式返回真值时才被渲染</h1>


<button @click="awesome = !awesome">Toggle</button>
<!-- v-else -->
<h1 v-if="awesome">使用 v-else 为 v-if 添加一个“else 区块”</h1>
<h1 v-else>Oh no 😢</h1>

<!-- v-else -->
<h1 v-if="awesome">一个 v-else 元素必须跟在一个 v-if
     或者 v-else-if 元素后面，否则它将不会被识别</h1>
<h1 v-else>Oh no 😢</h1>

<!-- v-else-if -->
<!-- 和 v-else 类似，
    一个使用 v-else-if 的元素必须紧跟在一个 v-if 
    或一个 v-else-if 元素后面 -->
<div v-if="type === 'A'">
  A
</div>
<div v-else-if="type === 'B'">
  B
</div>
<div v-else-if="type === 'C'">
  C
</div>
<div v-else>
  Not A/B/C
</div>

<!-- 在template上使用 v-if -->
<template v-if="ok">
  <h1>Title</h1>
  <p>Paragraph 1</p>
  <p>Paragraph 2</p>
</template>


<!-- v-show -->
<h1 v-show="ok">v-show 按条件显示一个元素
    不同之处在于 v-show 会在 DOM 渲染中保留该元素；
    v-show 仅切换了该元素上名为 display 的 CSS 属性</h1>

<!--  v-if vs. v-show​ -->
<div>
v-if vs. v-show
v-if 是“真实的”按条件渲染，因为它确保了在切换时，
条件区块内的事件监听器和子组件都会被销毁与重建。

v-if 也是惰性的：如果在初次渲染时条件值为 false则不会做任何事。
条件区块只有当条件首次变为 true 时才被渲染。

相比之下,v-show 简单许多，元素无论初始条件如何，
始终会被渲染，只有 CSS display 属性会被切换。

总的来说,v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销。
因此，如果需要频繁切换，则使用 v-show 较好；
如果在运行时绑定条件很少改变，则 v-if 会更合适。
</div>

<!-- v-if 和 v-for -->
<div>警告
同时使用 v-if 和 v-for 是不推荐的，因为这样二者的优先级不明显。
请查看风格指南获得更多信息。
</div>
<div>
    当 v-if 和 v-for 同时存在于一个元素上的时候,v-if 会首先被执行
</div>




<!-- v-for列表渲染 -->

<!-- items 是源数据的数组，而 item 是迭代项的别名 -->
<li v-for="item in items">
  {{ item.message }}
</li>

<!-- 使用可选的第二个参数表示当前项的位置索引 -->
<li v-for="(item, index) in items">
  {{ parentMessage }} - {{ index }} - {{ item.message }}
</li>


<!--  v-for 的变量别名时使用解构 -->
<li v-for="{ message } in items">
  v-for 的变量别名时使用解构: {{ message }}
</li>

<!-- 有 index 索引时 -->
<li v-for="({ message }, index) in items">
  v-for 的变量别名时使用解构+索引 {{ message }} {{ index }}
</li>


<!-- 多层嵌套的 v-for -->
<li v-for="item in items">
  <span v-for="childItem in item.children">
     {{ item.message }} {{ childItem }}
  </span>
</li>

<!-- 可以使用 of 作为分隔符来替代 in，这更接近 JavaScript 的迭代器语法 -->
<div v-for="item of items">
  可以使用 of 作为分隔符来替代 in,这更接近 JavaScript 的迭代器语法</div>

<div v-for="item of items">  {{ item.message }} </div>

<!-- 使用 v-for 来遍历一个对象的所有属性。
  遍历的顺序会基于对该对象调用 Object.keys() 的返回值来决定 -->
<ul>
  <li v-for="value in myObject">
    对象中的value:{{ value }}
  </li>
</ul>

<!-- 可以通过提供第二个参数表示属性名 (例如 key) -->
<li v-for="(value, key) in myObject">
  对象中的key + value: {{ key }}: {{ value }}
</li>

<!-- 第三个参数表示位置索引 -->
<li v-for="(value, key, index) in myObject">
  对象中的index + dey + value: {{ index }}. {{ key }}: {{ value }}
</li>


<!-- 在 v-for 里使用范围值 -->
<span v-for="n in 10">在 v-for 里使用范围值 :{{ n }}</span> <!--注意此处 n 的初值是从 1 开始而非 0-->


<!-- <template> 上的 v-for -->
<ul>
  <template v-for="item in items">
    <li>在模版上使用v-for:{{ item.message }}</li>
    <li class="divider" role="presentation"></li>
  </template>
</ul>

<!-- v-for 与 v-if -->

<!-- 注意
同时使用 v-if 和 v-for 是不推荐的，因为这样二者的优先级不明显 -->
<!--
 这会抛出一个错误，因为属性 todo 此时
 没有在该实例上定义
-->
<!-- <li v-for="todo in todos" v-if="!todo.isComplete">
  {{ todo.name }}
</li> -->

<!-- 在外新包装一层 <template> 再在其上使用 v-for 
  可以解决这个问题 (这也更加明显易读)： -->
<template v-for="todo in todos">
  <li v-if="!todo.isComplete">
    v-for 与 v-if的结合使用:  {{ todo.name }}
  </li>
</template>


<!-- 通过 key 管理状态 -->

<!-- 为了给 Vue 一个提示，以便它可以跟踪每个节点的标识，
  从而重用和重新排序现有的元素，
  你需要为每个元素对应的块提供一个唯一的 key attribute -->
<div v-for="data in datas" :key="data.id">
      通过 key 管理状态: {{ data.name }}
</div>

<!-- 当你使用 <template v-for> 时，
  key 应该被放置在这个 <template> 容器上： -->
<template v-for="todo in todos" :key="todo.name">
<li> 在模版上通过 key 管理状态: {{ todo.name }}</li>
</template>



<!-- 组件上使用 v-for -->

<!-- 在一个组件上使用v-for -->
<MyComponent v-for="item in items" :key="item.id" />
<!-- 为了将迭代后的数据传递到组件中，我们还需要传递 props -->
<MyComponent
  v-for="(item, index) in items"
  :item="item"
  :index="index"
  :key="item.id"
/>


<!-- 数组变化侦测 -->

<!-- 变更方法 -->
<div>
  Vue 能够侦听响应式数组的变更方法，
  并在它们被调用时触发相关的更新。
  这些变更方法包括:
push()
pop()
shift()
unshift()
splice()
sort()
reverse()
</div>


<!-- 替换一个数组 -->

<!-- 匹配value=Foo的数据，并筛选出来
 -->
<div v-for="item in items" >
      原数据：  {{ item.message }}
</div>

<div v-for="matchItem in matchItems" >
    匹配出来的数据(Foo):  {{ matchItem.message }}
</div>


<!-- 展示过滤或排序后的结果 -->
<li v-for="n in evenNumbers">{{ n }}</li>


<!-- 在计算属性不可行的情况下 (例如在多层嵌套的 v-for 循环中) -->
<ul v-for="numbers in sets">
  <li v-for="n in even(numbers)">{{ n }}</li>
</ul>


</template>
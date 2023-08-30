<!-- 计算属性 -->
<script setup>
import { ref } from 'vue'
import { reactive , computed} from 'vue'

const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})

/**
 * Vue 的计算属性会自动追踪响应式依赖。
 * 它会检测到 publishedBooksMessage 依赖于 author.books，
 * 所以当 author.books 改变时，
 * 任何依赖于 publishedBooksMessage 的绑定都会同时更新。
 */

// 一个计算属性 ref 
const publishedBooksMessage = computed(() => {
  return author.books.length > 0 ? 'Yes' : 'No'
})


// 计算属性缓存 vs 方法
// 组件中
function calculateBooksMessage() {
  return author.books.length > 0 ? 'Yes' : 'No'
}

/**
 * 计算属性与函数方法不同之处在于计算属性值会基于其响应式依赖被缓存
 * 一个计算属性仅会在其响应式依赖更新时才重新计算。
 * 这意味着只要 author.books 不改变，无论多少次访问
 * publishedBooksMessage 都会立即返回先前的计算结果，
 * 而不用重复执行 getter 函数。
 * 
 */

 // 计算属性永远不会更新，因为 Date.now() 并不是一个响应式依赖
 const now = computed(() => Date.now())


 // 通过计算属性，返回数据books个数
 const computedBooks = computed(() => {
  return author.books.length
 })

 // 通过函数方法，返回数据books个数
 function getBooks()  {
  return author.books.length
}

// 改变更新books内容，以此观察计算属性和函数方法在模版中是否自动更新
function putData()  {
   author.books.push('Vue 5 - Vue Playground')
   bookeLength.value = author.books.length
}

/**
 * 结论：不管模版中引用的是计算属性还是函数方法，
 * 当author.books数据内容改变时，都会通知模版自动更新。
 * 唯一的区别是，计算属性有缓存
 */

const bookeLength = ref(0)



/**
 * 可写计算属性
 * 计算属性默认是只读的。当你尝试修改一个计算属性时，
 * 你会收到一个运行时警告。
 * 只在某些特殊场景中你可能才需要用到“可写”的属性，
 * 你可以通过同时提供 getter 和 setter 来创建
 */
const firstName = ref('John')
const lastName = ref('Doe')
 const fullName = computed({
  // getter
  get() {
    return firstName.value + ' ' + lastName.value
  },
  // setter
  set(newValue) {
    // 注意：我们这里使用的是解构赋值语法
    [firstName.value, lastName.value] = newValue.split(' ')
  }

  /**
   *  注意： 1、Getter 不应有副作用   2、避免直接修改计算属性值
   */
})
</script>


<template>

<p>Has published books:</p>
<!--业务逻辑写在模版里-->
<span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span>

<p>Has published books:</p>
 <!--使用计算属性来描述依赖响应式状态的复杂逻辑-->
<span>{{ publishedBooksMessage }}</span>

<p>Has published books:</p>
<!-- 使用函数，把业务逻辑放到函数中，并掉用这个函数 -->
<span>{{ calculateBooksMessage() }}</span>

<p>一共多少本book:</p>
<span>{{ getBooks() }}</span>

<p>一共多少本book:</p>
<span>{{ computedBooks }}</span>

<p>一共多少本book:</p>
<span> {{ bookeLength }} </span>

<button @click="putData">
    改变books数据:{{ author.books.length }}
</button>

 <!--运行 fullName.value = 'John Doe' 时，
  setter 会被调用而 firstName 和 lastName 会随之更新-->
<button @click=" fullName = 'Tom Can' "> 
    可写计算属性:{{ fullName }}
</button>

</template>
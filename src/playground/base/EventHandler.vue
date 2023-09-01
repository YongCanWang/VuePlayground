<!-- 事件处理 -->
<script setup>
import {ref} from 'vue'

/**
 * 监听事件
 */

 // 内联事件处理器
 const count = ref(0)

 // 方法事件处理器
const name = ref('Vue.js')
function greet(event) {
  alert(`Hello ${name.value}!`)
  // `event` 是 DOM 原生事件
  if (event) {
    alert(event.target.tagName)
  }
}

// 方法与内联事件判断

/**
 * 在内联处理器中调用方法
 */
function say(message) {
  alert(message)
}


/**
 * 在内联事件处理器中访问事件参数
 */
// 这里可以访问原生事件
function warn(message, event) {
  if (event) {
    event.preventDefault()
  }
  alert(message)
}



/**
 * 事件修饰符
 * (示例在模版)
 */

  function doThis() {
    alert('doThis')
  }

  function onSubmit() {
    alert('onSubmit')
  }

  function doThat() {
    alert('doThat')
  }


  function onScroll() {
    alert('onScroll')
  }

  function submit(){
    alert('submit')
  }

  function onPageDown() {
    alert('onPageDown')
  }


/**
 *  按键修饰符
 */
/**
 * 在监听键盘事件时，我们经常需要检查特定的按键。
 * Vue 允许在 v-on 或 @ 监听按键事件时添加按键修饰符。
 */

function clear() {
    alert('clear')
}

function doSomething() {
    alert('doSomething')
}

function onClick() {
    alert('onClick')
}

function onCtrlClick() {
    alert('onCtrlClick')
}


</script>


<template>

<div>
我们可以使用 v-on 指令 (简写为 @) 来监听 DOM 事件，并在事件触发时执行对应的 JavaScript。用法：v-on:click="handler" 或 @click="handler"。

事件处理器 (handler) 的值可以是：

内联事件处理器：事件被触发时执行的内联 JavaScript 语句 (与 onclick 类似)。

方法事件处理器：一个指向组件上定义的方法的属性名或是路径。
</div>

<!-- 内联事件处理器 -->
<button @click="count++">Add 1</button>
<p>Count is: {{ count }}</p>


<!-- 方法事件处理器 -->
<!-- `greet` 是上面定义过的方法名 -->
<button @click="greet">Greet</button>


<!-- 在内联处理器中调用方法 -->
<button @click="say('hello')">Say hello</button>
<button @click="say('bye')">Say bye</button>


<!-- 在内联事件处理器中访问事件参数 -->
<!-- 使用特殊的 $event 变量 -->
<button @click="warn('Form cannot be submitted yet.', $event)">
  Submit
</button>
<!-- 使用内联箭头函数 -->
<button @click="(event) => warn('Form cannot be submitted yet.', event)">
  Submit
</button>


<!-- 事件修饰符 -->
<div>
Vue 为 v-on 提供了事件修饰符
.stop
.prevent
.self
.capture
.once
.passive
</div>

<!-- 单击事件将停止传递 -->
<a @click.stop="doThis">单击事件将停止传递</a>

<!-- 提交事件将不再重新加载页面 -->
<form @submit.prevent="onSubmit">
    提交事件将不再重新加载页面</form>

<!-- 修饰语可以使用链式书写 -->
<a @click.stop.prevent="doThat">
    修饰语可以使用链式书写</a>

<!-- 也可以只有修饰符 -->
<form @submit.prevent>
    也可以只有修饰符
</form>

<!-- 仅当 event.target 是元素本身时才会触发事件处理器 -->
<!-- 例如：事件处理器不来自子元素 -->
<div @click.self="doThat">仅当 event.target 是元素本身时才会触发事件处理器</div>


<!-- 
    .capture、.once 和 
    .passive 修饰符与原生 addEventListener 事件相对应
 -->
<!-- 添加事件监听器时，使用 `capture` 捕获模式 -->
<!-- 例如：指向内部元素的事件，在被内部元素处理前，先被外部处理 -->
<div @click.capture="doThis">添加事件监听器时，使用 `capture` 捕获模式</div>

<!-- 点击事件最多被触发一次 -->
<a @click.once="doThis">点击事件最多被触发一次</a>

<!-- 滚动事件的默认行为 (scrolling) 将立即发生而非等待 `onScroll` 完成 -->
<!-- 以防其中包含 `event.preventDefault()` -->
<div @scroll.passive="onScroll">滚动事件的默认行为 (scrolling)
 将立即发生而非等待 `onScroll` 完成</div>


 <!-- 按键修饰符 -->

 <!-- 在监听键盘事件时，我们经常需要检查特定的按键。
    Vue 允许在 v-on 或 @ 监听按键事件时添加按键修饰符 -->
<!-- 仅在 `key` 为 `Enter` 时调用 `submit` -->
<input @keyup.enter="submit" />

<!-- 你可以直接使用 KeyboardEvent.key
     暴露的按键名称作为修饰符，但需要转为 kebab-case 形式。 -->
<input @keyup.page-down="onPageDown" />

<!-- 按键别名 -->
<div>Vue 为一些常用的按键提供了别名：
.enter
.tab
.delete (捕获“Delete”和“Backspace”两个按键)
.esc
.space
.up
.down
.left
.right</div>

<!-- 系统按键修饰符 -->
<div>
你可以使用以下系统按键修饰符来触发鼠标或键盘事件监听器，只有当按键被按下时才会触发。
.ctrl
.alt
.shift
.meta
</div>
<!-- Alt + Enter -->
<input @keyup.alt.enter="clear" />
<!-- Ctrl + 点击 -->
<div @click.ctrl="doSomething">Do something</div>

<!-- .exact 修饰符 -->
<!-- .exact 修饰符允许控制触发一个事件所需的确定组合的系统按键修饰符 -->
<!-- 当按下 Ctrl 时，即使同时按下 Alt 或 Shift 也会触发 -->
<button @click.ctrl="onClick">A</button>
<!-- 仅当按下 Ctrl 且未按任何其他键时才会触发 -->
<button @click.ctrl.exact="onCtrlClick">A</button>
<!-- 仅当没有按下任何系统按键时触发 -->
<button @click.exact="onClick">A</button>



<!-- 鼠标按键修饰符 -->

<div>
这些修饰符将处理程序限定为由特定鼠标按键触发的事件
.left
.right
.middle
</div>

</template>




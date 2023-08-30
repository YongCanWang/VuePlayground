<!-- 模版语法 -->
<script setup>
import { ref, onMounted } from 'vue'
// import testHtmlData from './htmls/Test-Html-Data.html'

// 响应式状态
const rawHtml = ref(0)
const rawHtml2 = 'https://jd.com'

const msg = '消息'

const dynamicId = "用ID绑定一个属性"

const isButtonDisabled = true

const dynamicIdAttrs = {
  id: 'dynamicId',
  class: 'wrapper'
}


//包含多个 attribute 的 JavaScript 对象
const objectOfAttrs = {
  id: 'container',
  class: 'wrapper'
}

const number = 8
// const ok = 'YES'
const ok = false
const message0 = '我是一个Message0'
const message1 = "我是一个Message1"
var message2 ='我是一个Message2'
var message3 ="我是一个Message3"

var date = '2023-08-29 20:10:00'
// var date = '20:10'
function toTitleDate() {
  // data ='2023-08-29 21:10:00'  // 出错
  date = '21:10'
  return date
}

function formatDate() {
  date = '2023-08-29 22:10:00'
  // date = '22:10'
  return date
}

var seen = true  

const url = "https://baidu.com"
const url2 = 'https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/a'


const doSomethingInt = ref(0)
function doSomething() {
   doSomethingInt.value++
}


const attributeName = "href"
const eventName = "click"
const eventName2 = "focus"

function onSubmit() {
  doSomethingInt.value++
}

</script>








<!-- 
  模板语法 
-->
<template>
<!--Attribute 绑定-->
<p>Using text interpolation: {{ rawHtml }}</p>
<p>Using v-html directive: <span v-html="rawHtml2"></span></p>

<span>Message: {{ msg }}</span>


<!--Attribute 绑定-->
<div v-bind:id="dynamicId"></div>
<!--Attribute 绑定 简写-->
<div :id="dynamicId"></div>

<!--布尔型Attribute-->
<button :disabled="true">Button</button>
<button :disabled="false">Button</button>
<button :disabled="isButtonDisabled">Button</button>
<button disabled="">Button</button>

<!--通过不带参数的 v-bind，将多个属性的对象绑定到单个元素上-->
<div v-bind="objectOfAttrs"></div>


<!--使用 JavaScript 表达式-->
<p>使用 JavaScript 表达式: {{ number + 1 }}</p>
<p>使用 JavaScript 表达式: {{ ok ? 'YES' : 'NO' }}</p>
<p>使用 JavaScript 表达式:
   {{ message0.split('').reverse().join('') }}</p>
<div :id="`list-${id}`"></div>

<!--仅支持表达式-->
<!-- 这是一个语句，而非表达式 -->
<!-- {{ var a = 1 }} -->
<!-- 条件控制也不支持，请使用三元表达式 -->
<!-- {{ if (ok) { return message } }} -->



<!-- 调用函数 -->
<time :title="toTitleDate(date)" :datetime="date">
  {{ formatDate(date) }}
</time>


<!-- 受限的全局访问 -->
  



<!-- 
  指令 Directives  
-->
<!-- 指令是带有 v- 前缀的特殊 attribute。
  Vue 提供了许多内置指令，包括上面介绍的 v-bind 和 v-html -->
<!-- v-if 指令会基于表达式 seen 的值的真假来移除/插入该 <p> 元素 -->
<p v-if="seen">Now you see me</p>


<!-- 
  参数 Arguments 
-->
<!--  v-bind 指令 绑定属性 -->
<a v-bind:href="url"> URL </a>
<!-- 简写 -->
<a :href="url2"> URL </a>


<!--  v-on 指令 监听DOM事件 -->
<a v-on:click="doSomething"> {{ doSomethingInt }} </a>
<!-- 简写 -->
<a @click="doSomething"> {{ doSomethingInt }}  </a>


<!-- 动态参数 -->
<!-- 同样在指令参数上也可以使用一个 JavaScript 表达式，
  需要包含在一对方括号内 -->
<!--
注意，参数表达式有一些约束，
参见下面“动态参数值的限制”与“动态参数语法的限制”章节的解释
-->
<a v-bind:[attributeName]="url"> 动态参数 </a>

<!-- 简写 -->
<a :[attributeName]="url2"> 动态参数 </a>

<!-- 动态参数：绑定事件 -->
<a v-on:[eventName]="doSomething"> 动态参数：绑定事件 {{ doSomethingInt }}</a>

<!-- 简写 -->
<a @[eventName2]="doSomething">动态参数：绑定事件 {{ doSomethingInt }} </a>



<!-- 动态参数语法的限制 -->

<!-- 修饰符 Modifiers -->
<form @submit.prevent="onSubmit">
  修饰符 Modifiers
  <!-- <button @click="doSomething">Button: {{ doSomethingInt }}</button> -->
  <button>Button: {{ doSomethingInt }}</button>
  <button>Button: {{ doSomethingInt }}</button>
</form>


</template>
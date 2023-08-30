<!-- Class 与 Style 绑定 -->
<script setup> // js
import { ref, reactive, computed } from 'vue'

/**
 * 一：绑定 HTML class
 */

// 绑定对象
const isActive = ref(true)

const hasError = ref(false)

// 动态切换样式对象
function onClick() {
    isActive.value = false
    hasError.value = true
}


const classObject = reactive({
  active: true,
  'text-danger': true
})


/**
 * 绑定一个返回对象的计算属性
 */
const error = ref(null)
const classObjectComputed = computed(() => ({
  active: isActive.value && !error.value,
  'text-danger': error.value && error.value.type === 'fatal'
}))



/**
 * 绑定数组
 */
// 给 :class 绑定一个数组来渲染多个 CSS class
const activeClass = ref('active')
const errorClass = ref('text-danger')

/**
 * 在组件上使用
 * （示例在模版）
 */






 /**
  * 二：绑定内联样式
  */

  /**
   * 绑定样式属性
   *  :style 支持绑定 JavaScript 对象值，对应的是 HTML 元素的 style 属性
   */
const activeColor = ref('red')  // 绑定样式属性
const fontSize = ref(30) // 绑定样式属性

/**
 * 绑定样式对象
 * 绑定样式对象，如果样式对象需要复杂的逻辑，可以返回样式对象的计算属性
 */
const styleObject = reactive({
  color: 'red',
  fontSize: '30px'
})

/**
 * 绑定样式数组
 * 给 :style 绑定一个包含多个样式对象的数组。这些对象会被合并后渲染到同一元素上
 */
const baseStyles = reactive({
  color: 'red',
  fontSize: '30px'
})

const overridingStyles = reactive({
  color: 'red',
  fontSize: '30px'
})

/**
 * 自动前缀
 * (无示例)
 */


/**
 * 样式多值
 * （示例在模版）
 */


</script>

<!-- 样式 CSS -->
<style>
.active {
	width: 100px;
	height: 100px;
	background: green;
}

.text-danger {
	background: red;
    padding-right:20px;
    margin-top: 20px;
}

.static {
    background:blue;
}


.baseStyles {
    background: green;
    font-size: 30px;
}

.overridingStyles {
    background: green;
    font-size: 30px;
}

</style>




<!-- 模版 HTML -->
<template>


<!-- 一：绑定 HTML class -->

<!-- 绑定对象 -->
 <p>《绑定对象》</p> 
 <div :class="{ active: true }"> 内联字面量的形式，绑定一个样式对象</div>

 <!-- 给 :class (v-bind:class 的缩写) 传递一个对象来动态切换 class： -->
<div :class="{ active: isActive }">
    给 :class (v-bind:class 的缩写) 传递一个对象来动态切换 class：</div>

<!-- :class 指令也可以和一般的 class attribute 共存 -->
<div
   class="static"  
  :class="{ active: isActive, 'text-danger': hasError }">
  :class 指令也可以和一般的 class attribute 共存
</div>

<!-- 渲染结果同上 -->
<div class="static active"> static active </div>

<!-- 动态切换样式对象 -->
<button @click="onClick"> 动态切换样式对象</button>

<div :class="classObject">绑定一个样式对象</div>

<div :class="classObjectComputed"> 绑定一个返回对象的计算属性</div>


<!--  绑定数组  -->
 <p>《绑定数组》</p>   
 <!-- 给 :class 绑定一个数组来渲染多个 CSS class -->
<div :class="[activeClass, errorClass]">
     给 :class 绑定一个数组来渲染多个 CSS class</div>

<!-- 渲染结果同上 -->
<div class="active text-danger">active text-danger</div>

<!-- 使用三元表达式，在数组中有条件地渲染某个 class-->
<div :class="[isActive ? activeClass : '', errorClass]">
    使用三元表达式，进行条件渲染</div>

<!-- 在数组中嵌套对象 -->
<div :class="[{ active: isActive }, errorClass]">在数组中嵌套对象</div>


 <!-- 在组件上使用 -->  <!--[Vue warn]: Failed to resolve component: MyComponent-->
 <p>《在组件上使用》</p>  
  <!-- 子组件模板 -->
 <p class="foo bar">Hi!</p>
 <!-- 在使用组件时 -->
<MyComponent class="baz boo" />
<!-- 渲染出的 HTML -->
<p class="foo bar baz boo">Hi!</p>
<!-- 给组件绑定class -->
<MyComponent :class="{ active: isActive }" />
<!-- 当 isActive 为真时，被渲染的 HTML  -->
<p class="foo bar active">Hi!</p>
<!-- MyComponent 模板使用 $attrs 时 -->
<p :class="$attrs.class">Hi!</p>
<span>This is a child component</span>
<MyComponent class="baz" />
<!-- 渲染效果同上 -->
<p class="baz">Hi!</p>
<span>This is a child component</span>






<!-- 二：绑定内联样式 -->

<!-- 绑定样式属性 -->
<p>《绑定样式属性》</p>
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }">
    :style 支持绑定 JavaScript 对象值，
    对应的是 HTML 元素的 style 属性</div>

    <!-- 绑定样式属性 -->
    <div :style="{ 'font-size': fontSize + 'px' }">
        尽管推荐使用 camelCase，
        但 :style 也支持 kebab-cased 形式的 CSS 属性 key
         (对应其 CSS 中的实际名称)</div>

    <!-- 绑定样式对象， 
            如果样式对象需要复杂的逻辑，可以返回样式对象的计算属性 -->
    <p>《绑定样式对象》</p>
    <div :style="styleObject">
    直接绑定一个样式对象通常是一个好主意，
    这样可以使模板更加简洁</div>
         
            
   <!-- 绑定对象数组 -->
   <p>《绑定对象数组》</p>
   <div :style="[baseStyles, overridingStyles]">
    给 :style 绑定一个包含多个样式对象的数组。
    这些对象会被合并后渲染到同一元素上</div>


     <!-- 自动前缀 （无示例）-->


    <!-- 样式多值 -->
    <p>《样式多值》</p>
    <div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }">
        对一个样式属性提供多个 (不同前缀的) 值</div>
   
</template>
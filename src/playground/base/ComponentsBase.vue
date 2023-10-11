<!-- 组件基础 -->
<script setup>
import { ref, defineProps } from 'vue'

const count = ref(0)

/**
 * 使用组件
 */
 import ButtonCounter from './ButtonCounter.vue'


 
/**
 * 传递 props
 */
 import BlogPost from './BlogPost.vue'

 const posts = ref([
  { id: 1, title: 'My journey with Vue' },
  { id: 2, title: 'Blogging with Vue' },
  { id: 3, title: 'Why Vue is so fun' }
])


/**
 * 监听事件
 */
const postFontSize = ref(1)

/**
 * 通过插槽来分配内容
 */
 import AlertBox from './AlertBox.vue'
 

 /**
  * 动态组件
  */
import Tab1 from './Tab1.vue'
import Tab2 from './Tab2.vue'
import Tab3 from './Tab3.vue'

  const currentTab = ref('Tab1')
  const tabs = {
    Tab1,
    Tab2,
    Tab3
}

/**
 * DOM 内模板解析注意事项
 */

//大小写区分

//闭合标签

//元素位置限制

</script>

<template>
  <div>
  <button @click="count++">You clicked me {{ count }} times.</button>

  <!--使用组件 -->
  <h1>Here is a child component!</h1>
  <ButtonCounter />
  <ButtonCounter />
  <ButtonCounter /> 

  <!-- 如果是在 DOM 中书写该模板 -->
<button-counter></button-counter>
<button-counter></button-counter>
<button-counter></button-counter>


<!--  传递 props -->
<BlogPost title="My journey with Vue" />
<BlogPost title="Blogging with Vue" />
<BlogPost title="Why Vue is so fun" />

<!-- 使用 v-for 来渲染 -->
<BlogPost
  v-for="post in posts"
  :key="post.id"
  :title="post.title"
/>


<!-- 监听事件 -->
<div :style="{ fontSize: postFontSize + 'em' }">
  <!-- 父组件可以通过 v-on 或 @ 来选择性地监听子组件上抛的事件，
    就像监听原生 DOM 事件那样 -->
  <BlogPost  
    @enlarge-text="postFontSize += 0.1"    
    v-for="post in posts"
    :key="post.id"
    :title="post.title"
   />
</div>

<!-- 通过插槽来分配内容 -->
<AlertBox>
  Something bad happened.
</AlertBox>

<!-- 动态组件 -->
<div class="demo">
    <button
       v-for="(_, tab) in tabs"
       :key="tab"
       :class="['tab-button', { active: currentTab === tab }]"
       @click="currentTab = tab">
      {{ tab }}
    </button>

    <!-- 传给 :is 的值可以是1、被注册的组件名2、被注册的组件名
         也可以使用 is attribute 来创建一般的 HTML 元素 -->
	  <component :is="tabs[currentTab]" class="tab"></component>
</div>

<!-- currentTab 改变时组件也改变 -->
<!-- <component :is="tabs[currentTab]"></component> -->
<!-- 当使用 <component :is="..."> 来在多个组件间作切换时，
  被切换掉的组件会被卸载。我们可以通过 <KeepAlive> 
    组件强制被切换掉的组件仍然保持“存活”的状态 -->


    <!-- DOM 内模板解析注意事项 -->
    
    <!-- 大小写区分:HTML 标签和属性名称是不分大小写的 -->
    <Tab1 /> <tab1 />

    <!-- 闭合标签 -->
    <Tab2 />   <!--Vue 的模板解析器-->
    <Tab2></Tab2> <!--  DOM 内模板中，必须显式地写出关闭标签 -->
    <!-- HTML 只允许一小部分特殊的元素省略其关闭标签，
      最常见的就是 <input> 和 <img> -->


    <!-- 元素位置限制 -->
    <!-- HTML 元素对于放在其中的元素类型有限制，例如 <ul>，<ol>，<table> -->
    <!-- 某些元素仅在放置于特定元素中时才会显示，例如 <li>，<tr> 和 <option> -->
    
      <!-- 使用限制元素会出现问题 -->
    <table>
    <blog-post-row></blog-post-row> <!--自定义的组件 <blog-post-row> 将作为无效的内容被忽略-->
    </table>

    <!-- 使用特殊的 is attribute 解决问题 -->
    <table>
    <tr is="vue:blog-post-row"></tr>
    </table>

</div>
</template>


<!-- 不使用构建步骤 -->
<!-- export default {
    setup() {
      const count = ref(0)
      return { count }
    },
    template: `
      <button @click="count++">
        You clicked me {{ count }} times.
      </button>`
    // 也可以针对一个 DOM 内联模板：
    // template: '#my-template-element'
  } -->


<!-- 没有使用 <script setup>，props 必须以 props 选项的方式声明，
  props 对象会作为 setup() 函数的第一个参数被传入 -->
  <!-- export default {
    props: ['title'],
    setup(props) {
      console.log(props.title)
    }
  } -->





<style>
.demo {
  font-family: sans-serif;
  border: 1px solid #eee;
  border-radius: 2px;
  padding: 20px 30px;
  margin-top: 1em;
  margin-bottom: 40px;
  user-select: none;
  overflow-x: auto;
}

.tab-button {
  padding: 6px 10px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border: 1px solid #ccc;
  cursor: pointer;
  background: #f0f0f0;
  margin-bottom: -1px;
  margin-right: -1px;
}
.tab-button:hover {
  background: #e0e0e0;
}
.tab-button.active {
  background: #e0e0e0;
}
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
</style>
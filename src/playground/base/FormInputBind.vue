<!-- 表单输入绑定 -->
<script setup>
import { ref } from 'vue';

const checked = ref(false)

const checkedNames = ref([])

const picked = ref([])

const selected = ref([])
const selected2 = ref('')
const selected3 = ref()
 

const selected4 = ref('A')
const options = ref([
  { text: 'One', value: 'A' },
  { text: 'Two', value: 'B' },
  { text: 'Three', value: 'C' }
])

const toggle = ref('yes')

const pick = ref('')

</script>

<template>
<input
  :value="text"
  @input="event => text = event.target.value">

<!-- 使用v-model简化 -->
  <input v-model="text">


<!-- 简单使用 -->
<p>Message is: {{ message }}</p>
<input v-model="message" placeholder="edit me" />


<!-- 多行文本 -->
<span>Multiline message is:</span>
<p style="white-space: pre-line;">{{ message }}</p>
<textarea v-model="message" placeholder="add multiple lines"></textarea>

<!-- 注意在 <textarea> 中是不支持插值表达式的。请使用 v-model 来替代 -->
<!-- 错误 -->
<textarea>{{ text }}</textarea>
<!-- 正确 -->
<textarea v-model="text"></textarea>

<!-- 复选框 -->
<input type="checkbox" id="checkbox" v-model="checked" />
<label for="checkbox">{{ checked }}</label>

<!-- 将多个复选框绑定到同一个数组或集合的值 -->
<div>Checked names: {{ checkedNames }}</div>

<input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
<label for="jack">Jack</label>

<input type="checkbox" id="john" value="John" v-model="checkedNames">
<label for="john">John</label>

<input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
<label for="mike">Mike</label>



<!-- 单选按钮 -->
<div>Picked: {{ picked }}</div>

<input type="radio" id="one" value="One" v-model="picked" />
<label for="one">One</label>

<input type="radio" id="two" value="Two" v-model="picked" />
<label for="two">Two</label>


<!-- 选择器 单选 -->
<div>Selected: {{ selected3 }}</div>

<select v-model="selected3">
  <option disabled value="">Please select one</option>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>



<!-- 选择器 多选 -->
<div>Selected: {{ selected }}</div>

<select v-model="selected" multiple>
  <option>A</option>
  <option>B</option>
  <option>C</option>
</select>


<!-- 选择器的选项可以使用 v-for 动态渲染 -->
<select v-model="selected4">
  <option v-for="option in options" 
  :key="option.value" :value="option.value">
    {{ option.text }}
  </option>
</select>

<div>Selected: {{ selected4 }}</div>


<!-- 值绑定 -->

<!-- 对于单选按钮，复选框和选择器选项，
    v-model 绑定的值通常是静态的字符串 (或者对复选框是布尔值)： -->

<!-- `picked` 在被选择时是字符串 "a" -->
<input type="radio" v-model="picked" value="a" />

<!-- `toggle` 只会为 true 或 false -->
<input type="checkbox" v-model="toggle" />

<!-- `selected` 在第一项被选中时为字符串 "abc" -->
<select v-model="selected">
  <option value="abc">ABC</option>
</select>

<!-- 复选框 -->
<input
  type="checkbox"
  v-model="toggle"
  true-value="yes"
  false-value="no" />

  <input
  type="checkbox"
  v-model="toggle"
  :true-value="dynamicTrueValue"
  :false-value="dynamicFalseValue" />

  <div> {{toggle}} </div>

<!-- 单选按钮 -->
<input type="radio" v-model="pick" value="first" />
<input type="radio" v-model="pick" value="second" />

<div>{{ pick }}</div>


<!-- 选择器选项 -->
<select v-model="selected">
  <!-- 内联对象字面量 -->
  <option :value="{ number: 123 }">123</option>
  <option :value="{ number: 456 }">456</option>
</select>


<!-- 修饰符 -->

<!-- .lazy -->
<!-- 在 "change" 事件后同步更新而不是 "input" -->
<input v-model.lazy="msg" />

<!-- .number 自动转换数字 -->
<input v-model.number="age" />

<!-- .trim 去除两端空格-->
<input v-model.trim="msg" />

<!-- 组件上的 v-model -->


</template>
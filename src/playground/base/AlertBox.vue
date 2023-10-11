<!-- 子组件 AlertBox -->
<template>
    <div class="alert-box">
      <strong>This is an Error for Demo Purposes</strong>
      <br/>
    <slot />  <!-- 占位符号，渲染父组件传递进来的内容 -->
    </div>
  </template>
  
  <style scoped>
.alert-box {
  color: #666;
  border: 1px solid red;
  border-radius: 4px;
  padding: 20px;
  background-color: #f8f8f8;
}

strong {
	color: red;    
}
  </style>
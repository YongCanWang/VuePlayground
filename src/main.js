import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
// createApp(App).mount('#app')   

/**
 * 我们传入 createApp 的对象实际上是一个组件，
 * 每个应用都需要一个“根组件”，其他组件将作为其子组件。
 * 如果你使用的是单文件组件，我们可以直接从另一个文件中导入根组件。
 */
// 选项式
import OptionsAPITest from './playground/base/OptionsAPI-Test.vue'  // 根组件
// createApp(OptionsAPITest).mount('#app')    // mount挂载应用，参数为一个'容器'

// 组合式
import CompositionAPITest from './playground/base/CompositionAPI-Test.vue'
// createApp(CompositionAPITest).mount('#app') 

// DOM 中的根组件模板
import DOMTest from './playground/base/DOM-Test.vue' 
// createApp(DOMTest).mount('#app')


// DOM 中的根组件模板
// const app = createApp({
//     data() {
//       return {
//         count: 50
//       }
//     }
//   })

//   app.mount('#app')

// app.config.errorHandler=(error) =>{
//     // 错误处理
// }

// // 注册一个组件
// app.component('TodoDeleteButton', TodoDeleteButton)




// 多个应用实例
//  const app1 = createApp({

//   })
//   app1.mount('#container-1')
  
//   const app2 = createApp({

//   })
//   app2.mount('#container-2')



// 模版语法
import TemplateLanguage from './playground/base/TemplateLanguage.vue' 
// createApp(TemplateLanguage).mount('#app')

// 响应式基础
import ReactiveBase from './playground/base/ReactiveBase.vue' 
// createApp(ReactiveBase).mount('#app')

// 计算属性
import ComputedAttribute from './playground/base/ComputedAttribute.vue' 
// createApp(ComputedAttribute).mount('#app')

// Class 与 Style 绑定
import ClassAndStyleBind from './playground/base/ClassAndStyleBind.vue' 
// createApp(ClassAndStyleBind).mount('#app')

// 条件渲染
import IfRende from './playground/base/IfAndForRende.vue' 
// createApp(IfRende).mount('#app')


// 事件处理
import EventHandler from './playground/base/EventHandler.vue' 
// createApp(EventHandler).mount('#app')


import FormInputBind from './playground/base/FormInputBind.vue' 
createApp(FormInputBind).mount('#app')

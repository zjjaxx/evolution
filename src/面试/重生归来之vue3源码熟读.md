## 目录
- [目录](#目录)
- [vue3 diff算法](#vue3-diff算法)
  - [面试回答](#面试回答)
- [vue3最长递增子序列算法](#vue3最长递增子序列算法)
  - [面试回答](#面试回答-1)
- [vue3 key关键字的作用](#vue3-key关键字的作用)
  - [面试回答](#面试回答-2)
- [`mount('#app')`这个方法干了啥](#mountapp这个方法干了啥)
  - [面试回答](#面试回答-3)
- [vue 组件](#vue-组件)
  - [相关资料](#相关资料)
- [setup函数的作用和实现](#setup函数的作用和实现)
  - [面试回答](#面试回答-4)
- [组件emit事件如何实现](#组件emit事件如何实现)
  - [面试回答](#面试回答-5)
- [插槽的工作原理和实现](#插槽的工作原理和实现)
- [onMounted实现原理](#onmounted实现原理)
  - [面试回答](#面试回答-6)
- [函数式组件](#函数式组件)
  - [面试回答](#面试回答-7)
- [keepAlive组件的实现原理](#keepalive组件的实现原理)

## vue3 diff算法
### 面试回答
1. 预处理新旧children节点的前缀和后缀节点，如果key相同，则patch打补丁更新节点
2. 遍历完如果旧children节点都处理完了，而新children节点还没处理完，则挂载新节点,如果新children节点处理完了而旧children节点还没处理完，则卸载旧节点
3. 如果新旧children节点都有没处理完的，按剩余新节点数组大小创建source数组，默认-1，先遍历没处理完的新children节点，生成map，然后遍历没处理完的老children节点，如果在map中存在，则patch打补丁更新，并且把在老节点中的索引放到新节点source数组中，如果不存在则卸载，同时判断新节点的顺序是否保持和老节点一样单调递增
4. 如果有单调递增，则说明要移动节点，根据source算出最长递增子序列在source中的索引数组，子序列中的节点不需要移动,使用双指针来遍历source数组，i指向最长递增子序列的最后一个位置，j指向source最后一个，从后向前遍历，如果是-1，表示新增，直接挂载，如果遍历到最长递增子序列中，则不做任何处理，都不是的话移动元素

## vue3最长递增子序列算法
### 面试回答
1. 动态规划，遍历数组，
2. 通过二分查找+贪心算法找到每一个的局部最优解
3. 回溯修正

## vue3 key关键字的作用
### 面试回答
1. key关键字主要是用在diff算法中，用来精确的查找新旧children节点数组中是否存在相同的节点，如果有就复用节点
2. 如果元素节点key不同则会在patch时直接卸载节点

## `mount('#app')`这个方法干了啥
### 面试回答
1. 生成组件实例、渲染器，初始化响应式数据
2. 如果有template就用template生成render函数、没有就用挂载节点上的innerHTML作为模版
3. 在effect中执行render函数生成vnode,并渲染节点
4. 渲染节点时会收集响应式依赖即effect函数
5. 如果响应式数据变化则重新执行effect中的函数

## vue 组件
### 相关资料
1. 我们在日常开发中所编写的组件对象options如

```js
export default {
  props:{
    title:String
  },
  data(){
    return {
      name:"zjj"
    }
  },
  created(){
    
  },
  render(){
        return {
          type:'div',
          children:[{
            type:'p',
            children:`name is ${this.name}`
          }]
        }
      }
}
```

都是作为组件vnode的type值传入的，同时编译器会在打包的时候把template模版元素编译成render函数生成到options中,而组件元素上传入的属性作为vnode的props传入

```html
<MyComponent title='title'></MyComponent>
```
2. 在挂载组件的时候会对data做响应式处理，以及各种传入的生命周期函数的回调，然后把调用render函数生成vnode节点传入patch函数中挂载和更新都放到effect函数中，同时为了维护组件的状态和生成的vnode，会生成一个组件实例

   ```js
   const state=reactive(data())
   const [props,attrs]=resolveProps(propsOption,newVnode.props)
   const instance={
     state,
     props:shallowReactive(props),
     isMounted:false,
     subTree:null
   }
   newVnode.component=instance
   created&&created.call(state)
   effect(()=>{
     const subTree=render.call(state,state)
     if(!instance.isMounted){
       beforeMount&&beforeMount.call(state)
       patch(null,subTree,container,anchor)
       instance.isMounted=true
       mounted&&mounted.call(state)
     }
     else{
       beforeUpdate&&beforeUpdate.call(state)
       patch(instance.subTree,subTree,container,anchor)
       updated&&updated.call(state)
     }
     instance.subTree=subTree
   },{
     scheduler:queueJob
   })
   ```
3. 组件内部更新和被动更新
在组件内如果data数据变化，则会重新执行effect函数自动更新，在组件外patchComponent时，如果传入的是响应式对象，我的理解是组件内部的模版中使用了自动收集effect函数，如果变化会自动更新，如果传入的是基本类型，则判断新旧组件传入的值有无变化，如果有则更新组件实例上的props，因为组件props做了浅响应，所以会触发组件重新渲染

## setup函数的作用和实现
### 面试回答
1. 作用:
setup函数返回值有2种情况：1返回一个渲染函数替代render函数；2. 返回一个对象给模版使用
2. 实现:
在创建组件实例的时候调用传入的setup函数，如果返回一个渲染函数的话，则取代render函数，如果返回一个对象的话，则会在this代理该对象

## 组件emit事件如何实现
### 面试回答
事件会在vnode的props属性中传入，然后在emit方法内去匹配事件名，执行回调

## 插槽的工作原理和实现
编译器会把自定义插槽变为children的命名函数，返回一个vnode，然后传入组件，组件拿到children后，组件模版中的插槽内容会被编译位插槽函数，返回值就是vnode,this上会代理$slots到children上

## onMounted实现原理
### 面试回答
在组件实例上有mounted数组，调用onMounted的函数会注册到组件实例上的mounted数组中，然后在组件挂载完后执行mounted数组回调


## 函数式组件
### 面试回答
函数式组件本质上就是一个普通函数，该函数返回值是虚拟DOM，该函数就代表着render函数，函数上的属性就表示options的props

## keepAlive组件的实现原理
作用:
keepalive组件可以避免一个组件被频繁的销毁和重建
原理：
是从原容器搬运到另外一个隐藏的容器中，实现假卸载



1. 在setup函数中构建一个map对象来缓存要被keeplive的组件vnode,vnode中有要被组件的实例、真实的DOM元素
2. 创建一个不挂载的元素来接收要被缓存的真实DOM，在keepalive组件实例上注入2个生命周期的回调，deActivate和activate用来隐藏和显示真实DOM元素
3. 当keepalive组件是动态插槽时，有响应式数据更新，keepalive的render函数会重新渲染，从缓存map中获取vnode,如果存在，则把组件实例放到插槽中的vnode中，并标记改vnode为keptAlive，避免渲染器重新挂载它，不存在就缓存它
4. 当卸载时调用调用父组件keepAlive实例上的deActivate回调钩子把节点移动到隐藏容器中，当重新挂载是父组件keepAlive实例上的activate回调把节点移回原来的容器


   


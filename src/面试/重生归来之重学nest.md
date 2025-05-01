## 目录
- [目录](#目录)
- [docker](#docker)
  - [docker 环境变量设置](#docker-环境变量设置)
  - [docker desktop镜像源设置](#docker-desktop镜像源设置)
  - [Dockerfile简单模版](#dockerfile简单模版)
- [编程范式](#编程范式)
  - [函数式编程特点](#函数式编程特点)
  - [面向对象编程](#面向对象编程)
  - [AOP面向切面编程又称洋葱圈模型](#aop面向切面编程又称洋葱圈模型)
- [nest](#nest)
  - [nest优势](#nest优势)
  - [IOC控制反转和DI依赖注入](#ioc控制反转和di依赖注入)
  - [生命周期](#生命周期)
  - [nest用模块来组织代码](#nest用模块来组织代码)
  - [DTO和DAO](#dto和dao)
  - [controller中appService查找顺序](#controller中appservice查找顺序)

## docker 

### docker 环境变量设置

```bash
export PATH="/Applications/Docker.app/Contents/Resources/bin:$PATH"
```



### docker desktop镜像源设置

```json
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "registry-mirrors": [
    "https://docker.1ms.run",
    "https://fxcnivqq.mirror.aliyuncs.com",
    "https://docker.hpcloud.cloud",
    "https://docker.m.daocloud.io",
    "https://docker.unsee.tech",
    "https://docker.1panel.live",
    "http://mirrors.ustc.edu.cn",
    "https://docker.chenby.cn",
    "http://mirror.azure.cn",
    "https://dockerpull.org",
    "https://dockerhub.icu",
    "https://hub.rat.dev"
  ]
}
```

### Dockerfile简单模版

```Dockerfile
FROM node:20.11.1
ADD ./ ./
RUN npm i pnpm -g
RUN pnpm i
RUN pnpm build
CMD [ "pnpm","start:prod" ]
EXPOSE 3000
```

## 编程范式

### 函数式编程特点

1. 确定的数据输入、输出；没有副作用，相对独立
2. 引用透明，对IDE友好，易于理解
3. 把功能方法尽可能的抽离作为通用函数进行复用

### 面向对象编程

1. 抽象现象生活中的事物特征，对于理解友好
2. 封装性（高内聚低耦合）、继承性、多态性

### AOP面向切面编程又称洋葱圈模型

1. 扩展功能方便、不影响业务之间的逻辑
2. 逻辑集中管理
3. 更有利于代码复用

```js
class Koa {
  constructor() {
    this.middlewares = []; // 中间件队列
  }

  // 收集中间件
  use(fn) {
    this.middlewares.push(fn);
  }

  // 启动服务并处理请求
  listen(port) {
    const server = require('http').createServer(this.handleRequest());
    server.listen(port);
  }

  // 生成请求处理函数
  handleRequest() {
    const composed = compose(this.middlewares); // 组合中间件
    return async (req, res) => {
      const ctx = { req, res, body: null }; // 上下文对象
      await composed(ctx); // 执行中间件链
      res.end(ctx.body);   // 返回响应
    };
  }
}
```

```js
function compose(middlewares) {
  return function (ctx) {
    let index = -1; // 当前执行中间件的索引

    // 递归执行中间件
    function dispatch(i) {
      if (i <= index) throw new Error('next() called multiple times');
      index = i;
      const fn = middlewares[i] || (() => {}); // 默认空函数
      return Promise.resolve(
        fn(ctx, () => dispatch(i + 1)) // 将 next 指向下一个中间件
      );
    }

    return dispatch(0); // 从第一个中间件开始执行
  };
}
```



## nest

### nest优势

1. 企业级框架提供了非常多的通用功能，主要有数据校验、数据库链接、权限控制、日志服务、错误异常、接口文档、多环境配置
2. 生态大而全 

### IOC控制反转和DI依赖注入

IOC是一种设计模式，DI是IOC的具体实现

依赖注入它允许再类外创建依赖对象，并通过不同的形式将这些对象提供给类，通过通用接口的形式，实现了类和依赖之间的解耦

![DI](./assets/imgs/DI.png)

### 生命周期

![hook](./assets/imgs/lifeHook.png)

### nest用模块来组织代码

 ![module](./assets/imgs/module.png)

### DTO和DAO

![DTO_DAO](./assets/imgs/DTO_DAO.png)

dto 是的请求参数校验的TS类型层，DAO的数据库的TS实体类型层

### controller中appService查找顺序

1. 首先看app module中providers没有AppService

1. 没有AppService 则找imports -> 其它module ->其它模块 providers+exports -> AppService

2. 有, providers直接提供 -> AppService

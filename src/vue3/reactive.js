// 全局依赖
const weakMap = new WeakMap();
let count = 1;
// 副作用栈,实现effect嵌套功能
let effectStack = [];
// 当前副作用
let currentEffect = null;
// 注册副作用函数
const effect = (fn, options = {}) => {
  // 定一个高阶函数包装当前副作用，为了能够自定义拦截处理副作用函数开始和结束的事件
  let _fn = () => {
    //实现分支切换功能 每次副作用函数执行前都会从与之相关的依赖集合中删除该副作用
    cleanUp(_fn);
    // 每次副作用执行前必须赋值
    currentEffect = _fn;
    // 栈的作用非常适用于嵌套effect函数 开始执行推入栈
    effectStack.push(_fn);
    const res = fn();
    //执行完推出栈
    effectStack.pop();
    currentEffect = effectStack.length
      ? effectStack[effectStack.length - 1]
      : null;
    if (options.lazy) {
      return res;
    }
  };
  // debugger调试用
  _fn.count = count;
  count++;
  // 用来存储所有与该副作用函数相关联的依赖集合
  _fn.deps = [];
  _fn.options = options;
  if (options.lazy) {
    return _fn;
  } else {
    _fn();
  }
};
// 清除依赖
const cleanUp = (fn) => {
  fn.deps.forEach((dep) => {
    dep.delete(fn);
  });
  fn.deps = [];
};
// 收集依赖
const track = (target, key) => {
  // 如果不是在副作用函数中执行
  if (!currentEffect) {
    return false;
  }
  let targetMap = weakMap.get(target);
  if (!targetMap) {
    targetMap = new Map();
    weakMap.set(target, targetMap);
  }
  let fns = targetMap.get(key);
  if (!fns) {
    fns = new Set();
    targetMap.set(key, fns);
  }
  fns.add(currentEffect);
  // fns 就是一个与当前副作用函数存在联系的依赖集合
  // 将其添加到currentEffect.deps数组中
  currentEffect.deps.push(fns);
};
// 触发副作用
const trigger = (target, key) => {
  let targetMap = weakMap.get(target);
  if (targetMap) {
    let fns = targetMap.get(key);
    if (fns) {
      // set 在遍历中先清除后添加会一直死循环，所有需要copy一份进行遍历
      fnsRun = new Set(fns);
      fnsRun.forEach((fn) => {
        // 如果执行的副作用和当前副作用是同一个，则不执行，避免了在副作用中修改响应式数据造成死循环
        if (currentEffect !== fn) {
          if (fn.options.scheduler) {
            fn.options.scheduler(fn);
          } else {
            fn();
          }
        }
      });
    }
  }
};

const reactive = (obj) => {
  const _proxy = new Proxy(obj, {
    get: (target, key) => {
      track(target, key);
      return target[key];
    },
    set: (target, key, newValue) => {
      target[key] = newValue;
      trigger(target, key);
    },
  });
  return _proxy;
};

const computed = (fn) => {
  // 标记依赖的响应式是否更新
  let dirty = true;
  // 缓存值
  let temp;
  // 把fn注册成副作用函数
  const lazyFn = effect(fn, {
    lazy: true,
    scheduler(fn) {
      dirty = true;
      // 当computed.value用在effect中时
      // 手动执行computed的依赖副作用
      trigger(obj, "value");
    },
  });
  let obj = {
    get value() {
      // 如果有缓存值，并且依赖的响应式数据还没更新，直接返回缓存值
      if (temp && !dirty) {
        return temp;
      }
      // 执行计算
      temp = lazyFn();
      dirty = false;
      // 当computed.value用在effect中时
      // 收集computed的依赖副作用
      track(obj, "value");
      return temp;
    },
  };
  return obj;
};
const watch = (proxy, fn, options = {}) => {
  let getter,oldValue,newValue,inValid
  // 支持响应式对象和getter
  if (typeof proxy === 'function') {
    getter = proxy
  }
  else {
    // 如果是响应式对象，并且deep=true，递归遍历响应式对象，收集依赖
    if(options.deep){
      getter=()=>traverse(proxy)
    }
    else {
      getter = () => proxy
    }
  }

  const traverse = (obj, seen = new Set()) => {
    if (typeof obj !== 'object' || obj === null || obj === undefined || seen.has(obj)) {
      return obj
    }
    seen.add(obj)
    for (let key in obj) {
      traverse(obj[key], seen)
    }
    return obj
  }

  const effectFn = effect(
    getter,
    {
      lazy: true,
      scheduler() {
        if (options.flush == 'post') {
          Promise.resolve().then(() => {
            job(fn);
          })
        }
        else {
          job(fn);
        }
      },
    }
  );
  // 清除副作用函数注册器
  const registerInvalid=(fn)=>{
    inValid=fn
  }
  // 封装调度器的方法，支持immediate功能复用
  const job=(callback)=>{
    inValid&&inValid()
    newValue=effectFn()
    callback(newValue,oldValue,registerInvalid)
    oldValue=newValue
  }
  if (options.immediate) {
    job(fn)
  }
  else {
    oldValue=effectFn()
  }
};

const weakMap = new WeakMap();
let count = 1;
// 副作用栈
let effectStack = [];
// 当前副作用
let currentEffect = null;
const effect = (fn, options = {}) => {
  // 定一个高阶函数包装当前副作用，为了能够自定义拦截处理副作用函数开始和结束的事件
  let _fn = () => {
    //每次副作用函数执行前都会清除与之相关的依赖收集它的set集合
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
        // 如果执行的副作用和当前副作用是同一个，则不执行
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
  let dirty = true;
  let temp;
  const lazyFn = effect(fn, {
    lazy: true,
    scheduler(fn) {
      dirty = true;
      trigger(obj, "value");
    },
  });
  let obj = {
    get value() {
      if (temp && !dirty) {
        return temp;
      }
      temp = lazyFn();
      dirty = false;
      track(obj, "value");
      return temp;
    },
  };
  return obj;
};
const traverse=(value,seen=new Set())=>{}
const watch = (proxy, fn) => {
  effect(
    () => {
      for (let key in proxy) {
        proxy[key];
      }
    },
    {
      scheduler() {
        fn();
      },
    }
  );
};

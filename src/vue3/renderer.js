const { effect, ref } = Vue;
const bol = ref(false);
const Text = Symbol();
const Comment = Symbol();
const Fragment = Symbol();
const vnode = {
  type: "h1",
  props: {
    id: "foo",
  },
  children: [
    {
      type: "input",
      props: {
        value: "haha",
      },
    },
    {
      type: "p",
      props: {
        onClick: [
          () => {
            alert("p click");
          },
          () => {
            alert("p click2");
          },
        ],
        onContextmenu: () => {
          alert("p contextmenu");
        },
      },
      children: "please click",
    },
  ],
};

function shouldSetAsProps(el, key, value) {
  if (key === "form" && el.tagName === "INPUT") {
    return false;
  }
  return key in el;
}
const options = {
  createElement(tag) {
    return document.createElement(tag);
  },
  createTextNode(content) {
    return document.createTextNode(content);
  },
  setTextContent(el, content) {
    el.nodeValue = content;
  },
  unmount(vnode) {
    if (vnode.type === Fragment) {
      vnode.children.forEach((node) => this.unmount(node));
      return;
    }
    if (vnode.el.parentNode) {
      vnode.el.parentNode.removeChild(vnode.el);
    }
  },
  setElementText(el, text) {
    el.textContent = text;
  },
  insert(el, parent, anchor = null) {
    parent.insertBefore(el, anchor);
  },
  patchProps(el, key, preValue, nextValue) {
    if (/^on/.test(key)) {
      let invokers = el._vei || (el._vei = {});
      let invoker = invokers[key];
      const name = key.slice(2).toLowerCase();
      if (nextValue) {
        if (!invoker) {
          invoker = el._vei[name] = (e) => {
            if (e.timeStamp < invoker.attached) return;
            if (Array.isArray(invoker.value)) {
              invoker.value.forEach((fn) => fn(e));
            } else {
              invoker.value(e);
            }
          };
          invoker.value = nextValue;
          invoker.attached = performance.now();
          el.addEventListener(name, invoker);
        } else {
          invoker.value = nextValue;
        }
      } else if (invoker) {
        el.removeEventListener(name, invoker);
      }
    } else if (key === "class") {
      el.className = nextValue || "";
    } else if (shouldSetAsProps(el, key, nextValue)) {
      const type = typeof el[key];
      if (type === "boolean" && nextValue === "") {
        el[key] = true;
      } else {
        el[key] = nextValue;
      }
    } else {
      el.setAttribute(key, nextValue);
    }
  },
};
function getSequence(arr){
    const p = arr.slice()
    const result = [0]
    let i, j, u, v, c
    const len = arr.length
    for (i = 0; i < len; i++) {
      const arrI = arr[i]
      if (arrI !== 0) {
        j = result[result.length - 1]
        if (arr[j] < arrI) {
          p[i] = j
          result.push(i)
          continue
        }
        u = 0
        v = result.length - 1
        while (u < v) {
          c = (u + v) >> 1
          if (arr[result[c]] < arrI) {
            u = c + 1
          } else {
            v = c
          }
        }
        if (arrI < arr[result[u]]) {
          if (u > 0) {
            p[i] = result[u - 1]
          }
          result[u] = i
        }
      }
    }
    u = result.length
    v = result[u - 1]
    while (u-- > 0) {
      result[u] = v
      v = p[v]
    }
    return result
  }
  
function lis(nums) {
  if (nums.length === 0) return [];

  // 初始化结果数组，存储索引数组
  let result = [[0]]; // 初始为第一个元素的索引

  function update(currentIndex) {
    const currentValue = nums[currentIndex];
    // 从后向前遍历结果数组
    for (let i = result.length - 1; i >= 0; i--) {
      const seqIndices = result[i];
      const lastIndex = seqIndices[seqIndices.length - 1];
      // 比较当前值与序列最后一个元素的值
      if (nums[lastIndex] < currentValue) {
        // 创建新序列并追加当前索引
        const newSequence = [...seqIndices, currentIndex];
        // 更新结果数组
        if (
          result[i + 1] === undefined ||
          newSequence.length > result[i + 1].length
        ) {
          result[i + 1] = newSequence;
        }
        return;
      }
    }
    // 若未找到可追加序列，则创建新序列（处理最小元素）
    if (result[0].length === 1 && nums[result[0][0]] > currentValue) {
      result[0] = [currentIndex];
    }
  }

  // 遍历所有元素（从第二个开始）
  for (let i = 1; i < nums.length; i++) {
    update(i);
  }
  // 返回最长的索引序列
  return result[result.length - 1];
}
function createRenderer(options) {
  const {
    createElement,
    createTextNode,
    insert,
    setElementText,
    setTextContent,
    patchProps,
    unmount,
  } = options;
  function patch(oldVnode, newVnode, container, anchor) {
    function patchElement(oldVnode, newVnode) {
      const el = (newVnode.el = oldVnode.el);
      const oldProps = oldVnode.props;
      const newProps = newVnode.props;
      for (const key in newProps) {
        if (newProps[key] !== oldProps[key]) {
          patchProps(el, key, oldProps[key], newProps[key]);
        }
      }
      for (const key in oldProps) {
        if (!(key in newProps)) {
          patchProps(el, key, oldProps[key], null);
        }
      }
      patchChildren(oldVnode, newVnode, el);
    }
    function patchChildren(oldVnode, newVnode, el) {
      if (typeof newVnode.children === "string") {
        if (Array.isArray(oldVnode.children)) {
          oldVnode.children.forEach((node) => unmount(node));
        }
        setElementText(el, newVnode.children);
      } else if (Array.isArray(newVnode.children)) {
        if (Array.isArray(oldVnode.children)) {
          patchKeyedChildren_vue3(oldVnode, newVnode, el);
        } else {
          setElementText(el, "");
          newVnode.children.forEach((node) => patch(null, node, el));
        }
      } else {
        if (Array.isArray(oldVnode.children)) {
          oldVnode.children.forEach((node) => unmount(node));
        } else if (typeof oldVnode.children === "string") {
          setElementText(el, "");
        }
      }
    }
    function patchKeyedChildren_vue2(oldVnode, newVnode, el) {
      const oldChildren = oldVnode.children;
      const newChildren = newVnode.children;

      let oldStartIdx = 0;
      let oldEndIdx = oldChildren.length - 1;
      let newStartIdx = 0;
      let newEndIdx = newChildren.length - 1;

      let oldStartVNode = oldChildren[oldStartIdx];
      let oldEndVNode = oldChildren[oldEndIdx];
      let newStartVNode = newChildren[newStartIdx];
      let newEndVNode = newChildren[newEndIdx];
      while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (!oldStartVNode) {
          oldStartVNode = oldChildren[++oldStartIdx];
        } else if (!oldEndVNode) {
          oldEndVNode = oldChildren[--oldEndIdx];
        } else if (oldStartVNode.key === newStartVNode.key) {
          console.log("oldStartVNode.key === newStartVNode.key");
          patch(oldStartVNode, newStartVNode, el);
          oldStartVNode = oldChildren[++oldStartIdx];
          newStartVNode = newChildren[++newStartIdx];
        } else if (oldEndVNode.key === newEndVNode.key) {
          console.log("oldEndVNode.key === newEndVNode.key");
          patch(oldEndVNode, newEndVNode, el);
          oldEndVNode = oldChildren[--oldEndIdx];
          newEndVNode = newChildren[--newEndIdx];
        } else if (oldStartVNode.key === newEndVNode.key) {
          console.log("oldStartVNode.key === newEndVNode.key");
          patch(oldStartVNode, newEndVNode, el);
          insert(oldStartVNode.el, el, oldEndVNode.el.nextSibling);
          oldStartVNode = oldChildren[++oldStartIdx];
          newEndVNode = newChildren[--newEndIdx];
        } else if (oldEndVNode.key === newStartVNode.key) {
          console.log("oldEndVNode.key === newStartVNode.key");
          patch(oldEndVNode, newStartVNode, el);
          insert(oldEndVNode.el, el, oldStartVNode.el);
          oldEndVNode = oldChildren[--oldEndIdx];
          newStartVNode = newChildren[++newStartIdx];
        } else {
          const idxInOld = oldChildren.findIndex(
            (node) => node?.key === newStartVNode.key
          );
          if (idxInOld > 0) {
            const vnodeToMove = oldChildren[idxInOld];
            patch(vnodeToMove, newStartVNode, el);
            insert(vnodeToMove.el, el, oldStartVNode.el);
            oldChildren[idxInOld] = undefined;
          } else {
            patch(null, newStartVNode, el, oldStartVNode.el);
          }
          newStartVNode = newChildren[++newStartIdx];
        }
      }
      if (oldEndIdx < oldStartIdx && newStartIdx <= newEndIdx) {
        const endElment = oldEndVNode.el.nextSibling;
        for (let i = newStartIdx; i <= newEndIdx; i++) {
          patch(null, newChildren[i], el, endElment);
        }
      } else if (newEndIdx < newStartIdx && oldStartIdx <= oldEndIdx) {
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          unmount(oldChildren[i]);
        }
      }
    }
    function patchKeyedChildren_vue3(_oldVnode, _newVnode, el) {
      const newChildren = _newVnode.children;
      const oldChildren = _oldVnode.children;

      let j = 0;
      let oldEnd = oldChildren.length - 1;
      let newEnd = newChildren.length - 1;

      while(j<=oldEnd && j<=newEnd){
        if(newChildren[j].key===oldChildren[j].key){
            patch(oldChildren[j], newChildren[j], el);
        }
        else {
            break
        }
        j++
      }
      while(j<=oldEnd && j<=newEnd){
        if(newChildren[j].key===oldChildren[j].key){
            patch(oldChildren[j], newChildren[j], el);
        }
        else {
            break
        }
        oldEnd--
        newEnd--
      }

      if (j > oldEnd && j <= newEnd) {
        const anchorIndex = newEnd + 1;
        const anchor =
          anchorIndex < newChildren.length ? newChildren[anchorIndex].el : null;
        while (j <= newEnd) {
          patch(null, newChildren[j++], el, anchor);
        }
      } else if (j > newEnd && j <= oldEnd) {
        while (j <= oldEnd) {
          unmount(oldChildren[j++]);
        }
      } else {
        const count = newEnd - j + 1;
        const source = new Array(count).fill(-1);

        const oldStart = j;
        const newStart = j;

        let moved = false;
        let pos = 0;

        let map = new Map();
        for (let i = newStart; i <= newEnd; i++) {
          map.set(newChildren[i].key, i);
        }
        let patched = 0;
        for (let i = oldStart; i <= oldEnd; i++) {
          oldVnode = oldChildren[i];
          if (patched <= count) {
            const k = map.get(oldVnode.key);
            if (typeof k !== "undefined") {
              newVnode = newChildren[k];
              patch(oldVnode, newVnode, el);
              patched++;
              source[k - newStart] = i;

              if (k < pos) {
                moved = true;
              } else {
                pos = k;
              }
            } else {
              unmount(oldVnode);
            }
          } else {
            unmount(oldVnode);
          }
        }

        if (moved) {
          const seq = getSequence(source);
          let s=seq.length-1
          let i=count-1
          for(i;i>=0;i--){
            if(source[i]===-1){
                const pos=i+newStart
                const newVnode=newChildren[pos]
                const nextPos=pos+1
                const anchor=nextPos<newChildren.length?newChildren[nextPos].el:null
                patch(null,newVnode,el,anchor)
            }
            else if(i!==seq[s]){
                const pos=i+newStart
                const newVnode=newChildren[pos]
                const nextPos=pos+1
                const anchor=nextPos<newChildren.length?newChildren[nextPos].el:null
                insert(newVnode.el,el,anchor)
            }
            else {
                s--
            }
          }
        }
      }
    }
    function mountElement(newVnode, container) {
      const el = (newVnode.el = createElement(newVnode.type));
      if (newVnode.props) {
        for (const key in newVnode.props) {
          patchProps(el, key, null, newVnode.props[key]);
        }
      }
      if (newVnode.children) {
        if (typeof newVnode.children === "string") {
          setElementText(el, newVnode.children);
        } else if (Array.isArray(newVnode.children)) {
          newVnode.children.forEach((vnode) => {
            patch(null, vnode, el);
          });
        }
      }
      insert(el, container, anchor);
    }
    if (oldVnode && oldVnode.type !== newVnode.type) {
      unmount(oldVnode);
      oldVnode = null;
    }
    const { type } = newVnode;
    if (typeof type === "string") {
      if (!oldVnode) {
        mountElement(newVnode, container);
      } else {
        patchElement(oldVnode, newVnode);
      }
    } else if (type === Text) {
      if (!oldVnode) {
        const el = (newVnode.el = createTextNode(newVnode.children));
        insert(el, container);
      } else {
        const el = (newVnode.el = oldVnode.el);
        if (newVnode.children !== oldVnode.children) {
          setTextContent(el, newVnode.children);
        }
      }
    } else if (type === Fragment) {
      if (!oldVnode) {
        newVnode.children.forEach((node) => patch(null, node, container));
      } else {
        patchChildren(oldVnode, newVnode, container);
      }
    } else if (typeof type === "object") {
    }
  }

  function render(vnode, container) {
    if (vnode) {
      patch(container._vnode, vnode, container);
    } else {
      if (container._vnode) {
        unmount(container._vnode);
      }
    }
    container._vnode = vnode;
  }
  return {
    render,
  };
}

const renderer = createRenderer(options);
let pList = [
  {
    type: "p",
    children: "1",
    key: 1,
  },
  {
    type: "p",
    children: "2",
    key: 2,
  },
  {
    type: "p",
    children: "3",
    key: 3,
  },
  {
    type: "p",
    children: "4",
    key: 4,
  },
  {
    type: "p",
    children: "5",
    key: 5,
  },
  {
    type: "p",
    children: "6",
    key: 6,
  },
];
effect(() => {
  const eventVNode = {
    type: "div",
    props: bol.value
      ? {
          onClick: () => {
            console.log("父元素 clicked");
            alert("父元素 clicked");
          },
        }
      : {},
    children: [
      {
        type: "p",
        props: {
          onClick: () => {
            console.log("子元素 clicked");
            bol.value = true;
          },
        },
        children: pList,
      },
      {
        type: "button",
        children: "button",
        props: {
          onClick: () => {
            pList = [
              {
                type: "p",
                children: "3",
                key: 3,
              },
              {
                type: "p",
                children: "11",
                key: 11,
              },
              {
                type: "p",
                children: "12",
                key: 12,
              },
              {
                type: "p",
                children: "2",
                key: 2,
              },
              //   {
              //     type: "p",
              //     children: "1",
              //     key: 1,
              //   },
              {
                type: "p",
                children: "6",
                key: 6,
              },
              {
                type: "p",
                children: "5",
                key: 5,
              },
              {
                type: "p",
                children: "9",
                key: 9,
              },
              {
                type: "p",
                children: "10",
                key: 10,
              },
              {
                type: "p",
                children: "4",
                key: 4,
              },
            ];
            bol.value = true;
          },
        },
      },
      {
        type: Text,
        children: "我是文本节点",
      },
      {
        type: Comment,
        children: "我是注释节点",
      },
    ],
  };
  renderer.render(eventVNode, document.querySelector("#app"));
}, {});

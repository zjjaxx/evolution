## 目录
- [目录](#目录)
- [css 中的@import作用](#css-中的import作用)
- [z-index 与层叠上下文](#z-index-与层叠上下文)
  - [首先要理解2个概念](#首先要理解2个概念)
  - [层叠上下文的创建](#层叠上下文的创建)
- [\[\[CSS-水平居中、垂直居中、水平垂直居中\](https://segmentfault.com/a/1190000014116655)\](https://segmentfault.com/a/1190000014116655)](#css-水平居中垂直居中水平垂直居中httpssegmentfaultcoma1190000014116655httpssegmentfaultcoma1190000014116655)
- [面试官：请说说什么是BFC？大白话讲清楚](#面试官请说说什么是bfc大白话讲清楚)
- [如何画一个正方形/长宽固定的长方形](#如何画一个正方形长宽固定的长方形)
- [有没有使用过 css variable，它解决了哪些问题](#有没有使用过-css-variable它解决了哪些问题)
- [在日常开发中如何让图片保持缩放比例正常显示](#在日常开发中如何让图片保持缩放比例正常显示)
- [\[搞懂＞＞＞、/deep/、::v-deep、::v-deep()和:deep()的区别与用法\](](#搞懂deepv-deepv-deep和deep的区别与用法)

## css 中的@import作用

@import 是一种用于导入外部样式表的规则。它可以将一个 CSS 文件中的样式引入到另一个 CSS 文件中，使得样式可以在多个文件中共享和重用。

另外，从性能优化的角度来讲，尽量要避免使用@import。

## z-index 与层叠上下文

推荐看[[[张鑫旭-《深入理解CSS中的层叠上下文和层叠顺序》](https://link.juejin.cn/?target=https%3A%2F%2Fwww.zhangxinxu.com%2Fwordpress%2F2016%2F01%2Funderstand-css-stacking-context-order-z-index%2F)](https://link.juejin.cn/?target=https%3A%2F%2Fwww.zhangxinxu.com%2Fwordpress%2F2016%2F01%2Funderstand-css-stacking-context-order-z-index%2F)](https://link.juejin.cn/?target=https%3A%2F%2Fwww.zhangxinxu.com%2Fwordpress%2F2016%2F01%2Funderstand-css-stacking-context-order-z-index%2F)

### 首先要理解2个概念

1. 层叠上下文，英文称作”stacking context”. 是HTML中的一个三维的概念,在三维空间中指代Z轴的概念

2. “层叠水平”英文称作”stacking level”，决定了同一个层叠上下文中元素在z轴上的显示顺序，普通元素的层叠水平优先由层叠上下文决定，因此，层叠水平的比较只有在当前层叠上下文元素中才有意义。***需要注意的是，诸位千万不要把层叠水平和CSS的z-index属性混为一谈。没错，某些情况下z-index确实可以影响层叠水平，但是，只限于定位元素以及flex盒子的孩子元素；而层叠水平所有的元素都存在。***

在同一个层叠上下文中的显示顺序如下图所示

![排序](https://image.zhangxinxu.com/image/blog/201601/2016-01-09_211116.png)

另外加上2个准则就能判断同一层叠上下文中显示的先后顺序

1. **谁大谁上**
2. **后来居上**

### 层叠上下文的创建

有3种类型：拿科举举例

1. **皇亲国戚**派：页面根元素天生具有层叠上下文，称之为“根层叠上下文”。
2. **科考入选**派：z-index值为数值的定位元素的传统层叠上下文。
3. **其他当官途径**：其他CSS3属性。

**根层叠上下文**
指的是页面根元素，也就是滚动条的默认的始作俑者`<html>`元素。这就是为什么，绝对定位元素在`left`/`top`等值定位的时候，如果没有其他定位元素限制，会相对浏览器窗口定位的原因。

**定位元素与传统层叠上下文**

普通元素设置`position`属性为**非**`static`值并设置`z-index`属性为具体数值，产生层叠上下文。

**CSS3与新时代的层叠上下文**

1. `z-index`值不为`auto`的`flex`项(父元素`display:flex|inline-flex`).
2. 元素的`opacity`值不是`1`.
3. 元素的`transform`值不是`none`.
4. 元素`mix-blend-mode`值不是`normal`.
5. 元素的`filter`值不是`none`.
6. 元素的`isolation`值是`isolate`.
7. `will-change`指定的属性值为上面任意一个。
8. 元素的`-webkit-overflow-scrolling`
9. 设为`touch`.

## [[[CSS-水平居中、垂直居中、水平垂直居中](https://segmentfault.com/a/1190000014116655)](https://segmentfault.com/a/1190000014116655)](https://segmentfault.com/a/1190000014116655)

1. 如何是行内元素 textAlign
2. position absolute + transfrom/margin:auto/margin 负距离
3. flex
4. table-cell 不常用

## 面试官：请说说什么是BFC？大白话讲清楚

[[[BFC详解](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_display/Block_formatting_context)

## 如何画一个正方形/长宽固定的长方形

[[[aspect-ratio](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio#browser_compatibility)](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio#browser_compatibility)](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio#browser_compatibility)

## 有没有使用过 css variable，它解决了哪些问题

[[[CSS变量](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Using_CSS_custom_properties)

1. 它包含的值可以在整个文档中重复使用
2. 另一个好处是语义化的标识

## 在日常开发中如何让图片保持缩放比例正常显示

有2个属性能够设置图片

1. background- size
2. object-fit

[[A Deep Dive Into object-fit And background-size In CSS](https://www.smashingmagazine.com/2021/10/object-fit-background-size-css/)](https://www.smashingmagazine.com/2021/10/object-fit-background-size-css/)



## [[搞懂＞＞＞、/deep/、::v-deep、::v-deep()和:deep()的区别与用法](https://juejin.cn/post/7413669480624357386)](
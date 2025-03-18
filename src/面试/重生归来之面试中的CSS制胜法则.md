## 目录

- [目录](#目录)
- [css 中的@import作用](#css-中的import作用)
- [z-index 与层叠上下文](#z-index-与层叠上下文)
  - [首先要理解2个概念](#首先要理解2个概念)

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
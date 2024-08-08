---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "冷筱华的有限迷宫"
  text: "玩家手册"
  tagline: https://github.com/shakugannosaints
  actions:
    - theme: brand
      text: SealDice插件
      link: /sealdice/sealdice_menu
    - theme: brand
      text: Koishi插件
      link: /Koishi/Koishi_menu

features:
  - title: 功能介绍
    details: 介绍插件的用法
  - title: 实现详解
    details: 解释插件的实现
  - title: 明日方舟
    details: 给我玩明日方舟
---

<!-- markdownlint-disable-next-line MD041 -->
## 等等！你有没有可能恰好很无聊？

::: tip

请允许我介绍我们光荣而伟大的游戏：5d chess with multiverse timetravel

简单来说，这是一个允许棋子在“回合”上移动的游戏。不过这可不是悔棋！移动到已经发生过的过去时，你会创建一条新的时间线！

你可以在下面的嵌入页面中在线体验它，或者在steam上购买正版：

<iframe src="https://store.steampowered.com/widget/1349230/" frameborder="0" width="646" height="190"></iframe>

该页面可能要加载一会儿，不会很慢。如果你完全不会国际象棋，可以翻到最下面，按照说明体验

:::

<iframe src="https://chessin5d.nkid00.name/#/analyze?empty=true&import=W0JvYXJkICJTdGFuZMQKLSBUdXJuIFplcm8iXQpbTW9kZSAiNUQiXQo." width="100%" height="768" frameborder="0"></iframe>

::: tip 体验指南

第一步：用滚轮放大缩小嵌入页面，用鼠标右键拖动，左键点击和选择。你可以看到棋盘上有横向的abcdefgh和纵向的12345678标记。我们将每个格子命名为a1,b1,c1，依此类推

第二步：注意到棋盘有不同颜色的边框。现在用鼠标点击画面上，上方写着T1的“白色边框”棋盘里e2格子上的棋子，然后点击e3格子，然后按键盘上的F

第三步：现在我们获得了一张新的棋盘，它的边框是黑色的，这意味着这张棋盘是黑棋行动。选择该棋盘g8上的棋子（这是一个Knight，或者叫马，和中国象棋里的几乎一样，但不会被蹩马腿）——注意到了吗，t0黑色棋盘上的g6格亮了起来。现在，点击t0棋盘上的g6，然后按F。

恭喜你！你成功进行了一次穿越！接下来我会解释刚才发生了什么：

首先，让我们重新定义“马”的移动方式：常规来说，我们认为马走日字格。但在这里，我们定义它的移动方式为沿着一个方向走2，同时沿着另一个正交方向走1。

在经典的chess中，这与日字是等价的。但在5dc中，我们一共有四个互相正交的方向：x,y,l,t，分别代表棋盘上的横轴，纵轴，世界线，回合。

在刚才的移动中，黑马沿着t轴走了1，因此必须沿着另外一个轴走2才是一次合法移动。原本的马在g8，因此它可以走到g6来完成这次移动。这是合法的。

然后，这次行动因为回到了“过去”，因此创建了新的时间线：L-1。是“-1”的原因是这条线是黑棋开启的。如果是白棋开启的那么就是L1。

好了，现在你已经完全搞懂了！自由体验吧！

:::

# 5eSearch 说明文档

`5eSearch` 的说明文档，解释了代码的运作和需要注意的事情


## 这插件是干啥的？

`5eSearch` 是基于5e不全书github仓库的koishi插件，用于检索5e不全书中的内容——例如怪物、物品、技能、法术等。目标是可以检索所有词条，但目前还没找到匹配内容的通用方法。尽管做了针对性优化，但极小的一部分内容可能会匹配不到，或者因为内容太长无法完全发送。

### 部署

该插件依赖于simple-git从github仓库克隆5e不全书仓库。因此，如果你遇到了“未知错误”，请手动下载下面的仓库，放到\koishi\data\instances\default\data目录下，重命名为5echm_web

https://github.com/DND5eChm/5echm_web

示例完整路径：

```sh
d:\koishi\data\instances\default\data\5echm_web
```

### 用法

```sh
.search 你要搜索的东西
```
### 示例

搜索火球术

```sh
.search 火球术
```

### 插件选项

没有选项

### 代码解释

```sh
const regex = new RegExp(`<H. id="[^"]*">${word}[^<]*</H.>(.*?)<P>(.*?)</P>`, 'gs');
```

这是一个正则表达式，用于匹配包含指定单词的HTML标题和段落。它将匹配所有以指定单词开头的HTML标题，并捕获其后的内容

```sh
// 检查文件名是否与输入的单词完全匹配
  if (fileNameWithoutExt === word) {
    const body = content
      .replace(/.*true;};/gs,'')
      .replace(/<[^>]+>/gs, '')  // 去除所有 HTML 标签
      .replace(/\s+/gs, ' ')     // 去除多余的空格、换行符和制表符
      .replace(/\\n/gs, ' ')     // 去除 JSON 字符串中的 \n
      .trim();                  // 去除字符串两端的空格
    results.push(body);    
```

由于不全书排版的特殊性，一部分内容是单独页面的形式存在，另一部分是页面内的条目，所以需要两种匹配方式——文件名，和文件内条目。上面的代码是用于匹配文件名的。

### 结果

#### 示例输入域输出

<chat-panel>
  <chat-message nickname="Alice">.search 卡牌喷射</chat-message>
  <chat-message nickname="Koishi">卡牌喷射｜SprayofCards二环咒法（吟游诗人、术士、邪术师、法师）施法时间：1动作施法距离：自身（15尺锥形）法术成分：V，S，M（一副牌组）持续时间：立即你向一处15尺锥状区域喷射卡牌，该区域内的生物必须进行一次敏捷豁免。豁免失败的生物受到2d10点力场伤害伤害并陷入目盲，持续直至其下一个回合结束。豁免成功则仅会受到一半伤害。升环施法效应：当你使用3环或更高法术位施放本法术时，你使用的法术位每比2环高一环，法术的伤害就增加1d10。</chat-message>
  <chat-message nickname="Bob">.search 波涛</chat-message>
  <chat-message nickname="Koishi">  在文件 5echm_web\topics\其他\UA\战斗风格.html 中找到单词 波涛<br>
在文件 5echm_web\topics\城主指南\宝藏\智能魔法物品范例.htm 中找到单词 波涛<br>
在文件 5echm_web\topics\塞洛斯之神话奥德赛\塞洛斯冒险\塔萨.htm 中找到单词 波涛<br>
在文件 5echm_web\topics\塞洛斯之神话奥德赛\塞洛斯冒险\海上冒险.htm 中找到单词 波涛<br>
在文件 5echm_web\topics\塞洛斯之神话奥德赛\塞洛斯冒险\神启.htm 中找到单词 波涛<br></chat-message>
</chat-panel>

## 更多

大佬们加把劲，我真不知道怎么匹配了，5echm的工程文件格式太变态了

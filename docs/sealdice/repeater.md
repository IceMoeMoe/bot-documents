# 可开关复读机 说明文档

## 为什么叫这个名字？

简单的事实：这是一个可以开关的复读机脚本

## 这插件是干啥的？

`可开关复读机` 是一个有趣的插件，它能让机器人模仿人类的复读行为。当有人在聊天群中连续发送相同的信息三次时，机器人就会自动重复这条信息。当然，这个功能是可以根据需要开启或关闭的，以免造成不必要的干扰

### 用法

```sh
.rpt on/off
```

- **on**: 开启复读功能
- **off**: 关闭复读功能

### 示例

假设你想开启复读功能，可以这样操作：

```sh
.rpt on
```

然后，如果有人连续发送三次相同的消息，比如：

```
hello
hello
hello
```

机器人就会复读这条消息：

```
hello
```

### 插件选项

你可以在 Koishi 的插件配置中设置下面的内容：

- **状态**: 是否启用复读功能。默认为关闭状态

### 代码解释

这个插件使用了几个关键的部分：

```sh
cmdRpt.solve
```

处理 `.rpt` 命令，用来切换复读功能的开关状态

```sh
ext.onNotCommandReceived
```

监听非命令消息，检查是否满足复读条件——包括这条信息是否已经被复读过了

```sh
checkRepeatMessages
```

检查最近的消息记录，判断是否出现了连续三次相同的文本

更重要的是，它用正则表达式匹配了CQ码中的图像链接，这让它可以复读图片，以及带有图片的文本信息了

如果你希望它能复读更多信息，也可以修改正则表达式来达成你想要的效果

例如：

```sh
/\[CQ:([^,]+),file=([^,]+),subType=[^,]+,file_id=[^,]+,url=([^,]+),file_size=[^]+\]/gi;
```

这样一来，你就可以用捕获组1来匹配CQ码类型，捕获组2匹配文件的哈希值，捕获组3来获得文件的url（如果存在）

### 结果

#### 复读效果

当复读功能被启用后，如果检测到有连续三次相同的消息，机器人就会复读这条消息

#### 示例输出

<chat-panel>
  <chat-message nickname="Alice">Ciallo~</chat-message>
  <chat-message nickname="Bob">Ciallo~</chat-message>
  <chat-message nickname="Carol">Ciallo~</chat-message>
  <chat-message nickname="海豹核心">Ciallo~</chat-message>
  <chat-message nickname="Dave">打断复读！</chat-message>
</chat-panel>

## DEBUG

如果你遇到了图片复读失败的情况，请检查CQ码与你的消息平台版本是否匹配。本插件所使用的正则表达式总是适用于最新版的NapCatQQ。如果你正在使用其他平台，或者老版本的NapCatQQ，可以选择在github的历史版本中寻找可用的表达式，或者自己写一个可用的

此外，图片的匹配使用图片size作为标记，因此有极小概率出错

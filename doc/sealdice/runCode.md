---
outline: deep
---

# RunCode 说明文档

## 为什么叫这个名字？

嗯，其实也没什么特别的原因。就是觉得 `RunCode` 这个名字挺直白的，一看就知道是用来运行代码的

## 这插件是干啥的？

显然这是一个让你可以直接在聊天环境中运行各种编程语言的代码的脚本

它通过调用 Glot.io API 来实现这一点。也就是说，你可以在机器人平台上直接运行 Python、JavaScript、Go 或其他支持的语言的代码片段，然后得到结果并且返回

### 用法

```sh
.run <language> <code>
```

- **language**: 编程语言的名字（不可省略）。比如 `python`、`javascript` 等等
- **code**: 你想运行的代码

### 示例

假设你想运行一个 Python 的小例子，可以这样：

```sh
.run python print("Hello, World!");
```

或者你也可以另起一行

```sh
.run python

print("Hello, World!");
```

### 插件选项

你可以在 Koishi 的插件配置中设置下面的内容：

- **API Token**: 用于调用 Glot.io API 的令牌。你需要自己去获取一个，然后填在这里
- **白名单**: 设置哪些用户或群组可以使用这个插件
- **黑名单**: 比白名单优先级更高，设置了黑名单的用户或群组即使在白名单里也不能使用插件

### 代码解释

这个插件主要使用了两个函数：

```sh
runCode(language, filename, code, stdin)
```

用来运行代码，并返回运行结果

- **language**: 要运行的代码所使用的编程语言
- **filename**: 代码文件名，通常以 `.language` 的形式
- **code**: 你要运行的实际代码内容
- **stdin**: 可选参数，如果你想给代码传入标准输入，可以用这个

```sh
checkPermissions(ctx, msg)
```

检查发送消息的用户是否有权限使用此插件

- **ctx**: 当前上下文环境
- **msg**: 发送的消息对象

### 结果

#### 代码执行

当你使用 `.run` 命令时，插件会尝试运行你提供的代码，并将结果发送回聊天窗口。如果一切顺利，你会看到代码的输出；如果出了问题，你也会收到错误信息

#### 示例输出

假设你运行了一个简单的 JavaScript 函数，结果会像这样：

```
> .run javascript console.log("Hello, World!");
< Hello, World!
```

## 更多

我是有底线的
# 笔记插件说明文档

`NoteBot` 是为SealDice设计的笔记管理插件，支持群组/个人双模式笔记管理，具备智能分页、存储限制等特性。

## 功能特性

- ​**双模式管理**：群笔记（`.gnote`）全群可见，个人笔记（`.note`）仅自己可见
- ​**智能存储**：自动维护笔记数量上限，清理最早记录
- ​**分页系统**：支持`+/-`翻页操作，默认每页5条
- ​**安全限制**：单条笔记最大500字符（可配置），防刷屏设计

## 安装方法

1. 将插件代码保存为`.js`文件
2. 放入SealDice的`extensions`目录
3. 重启框架后自动加载

## 使用指令

### 基础命令
```bash
# 添加个人笔记
.note 今天学习了JavaScript闭包机制

# 查看个人笔记（第一页）
.note

# 添加群笔记
.gnote 明天下午3点团体活动

# 查看群笔记
.gnote

### 使用示例
<chat-panel>
  <chat-message nickname="Alice">.note 这是一条占位符笔记</chat-message>
  <chat-message nickname="海豹核心">已添加新个人笔记</chat-message>
  <chat-message nickname="Alice">.note</chat-message>
  <chat-message nickname="Koishi">  === 个人笔记 ===<br>1. [03/11/2025, 03:31:51]<br>这是一条测试笔记<br>第 1/1 页<br>使用 .note [+页码] 翻页</chat-message>
</chat-panel>
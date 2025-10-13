# 三角机构 (Triangle Agency) - Koishi 插件

基于《三角机构》规则的 TRPG 骰子插件，支持技能检定、现实改写、混沌值管理等功能。

## 功能特性

### 🎲 核心检定系统
- **技能检定** (`.ta <属性名/质保数量>`) - 基础能力检定
- **现实改写** (`.tr <属性名/质保数量>`) - 特殊规则检定
- **多次检定** (`-x` 参数) - 支持最多 5 次连续检定
- **属性支持** - 支持属性名或直接数值输入

### 📊 状态管理
- **混沌值管理** - 追踪群内混沌指数
  - `.tcs [delta]` - 查询/调整混沌值
  - `.tcst <value>` - 设置混沌值
- **改写失败管理** - 记录现实改写失败次数
  - `.tfs [delta]` - 查询/调整失败次数
  - `.tfst <value>` - 设置失败次数

### 👤 角色属性
- **属性设置** (`.st <属性设置>`) - 设置角色属性
  - 格式示例：`.st 专注3 共情-1 仪态0`
  - 支持属性别名系统

### ⚙️ 配置选项
- 检定次数上限
- 各类检定结果的提示语
- 检定前缀模板（支持变量替换）

## 指令详解

### 基础检定
```bash
# 技能检定
.ta 专注          # 使用"专注"属性检定
.ta 2            # 使用2次质保检定
.ta 专注 -x 3     # 连续检定3次

# 现实改写
.tr -1           # 使用1次质保进行现实改写
.tr 共情 -f       # 不记录失败次数的改写
```

### 状态管理
```bash
# 混沌值
.tcs             # 查看当前混沌值
.tcs 2           # 消除2点混沌值
.tcs -3          # 增加3点混沌值
.tcst 10         # 设置混沌值为10

# 改写失败
.tfs             # 查看失败次数
.tfs 1           # 消除1次失败
.tfst 5          # 设置失败次数为5
```

### 属性管理
```bash
.st 专注3 共情-1 仪态0    # 设置多个属性
.st 专业2 外放1          # 使用别名设置属性
```

## 示例

<chat-panel>
  <chat-message nickname="玩家A">.ta 专注</chat-message>
  <chat-message nickname="Koishi">玩家A的「专注」能力使用已批准……
6D4=[3,2x,1x,3,4x,3x] 这一瞬间，现实为你而扭曲。
（本次检定拥有0点燃尽，产生3点混沌，3次质保可用）</chat-message>
  
  <chat-message nickname="玩家B">.tr -1 -x 2</chat-message>
  <chat-message nickname="Koishi">玩家B的「-1」能力使用已批准……
6D4=[3x,2x,1x,3x,4x,1x] 失败
6D4=[3,2x,3,4x,1x,3x] 大成功
（本次现实改写拥有2点燃尽，其中0点来自前置失败；产生1次改写失败和0点混沌，1次质保可用）</chat-message>
  
  <chat-message nickname="玩家C">.tcs</chat-message>
  <chat-message nickname="Koishi">当前群内混沌指数: 15</chat-message>
  
  <chat-message nickname="玩家C">.tcs 5</chat-message>
  <chat-message nickname="Koishi">当前混沌值: 15 → 10</chat-message>
  
  <chat-message nickname="玩家D">.st 专注3 共情-1 仪态0</chat-message>
  <chat-message nickname="Koishi">已设置属性：专注=3，共情=-1，仪态=0</chat-message>
</chat-panel>

## 检定规则

### 6D4 掷骰机制
- 投掷 6 个 D4 骰子
- 统计结果为 3 的骰子数量
- 扣除燃尽点数后判断结果：
  - **3个3**：大成功
  - **1-2个3**：成功  
  - **0个3**：失败

### 燃尽计算
- **能力燃尽** = |质保数量| + 1（当质保为负时）
- **失败燃尽** = 前置改写失败次数（仅现实改写）
- **总燃尽** = 能力燃尽 + 失败燃尽

## 配置说明

```typescript
interface Config {
  maxExecTimes: number          // 多次检定上限，默认5
  checkPrefix: string           // 检定前缀，支持{player}、{attrText}变量
  successMsg: string           // 成功提示语
  failureMsg: string           // 失败提示语  
  bigSuccessMsg: string        // 大成功提示语
  successShortMsg: string      // 简短成功提示
  failureShortMsg: string      // 简短失败提示
  bigSuccessShortMsg: string   // 简短大成功提示
  excessiveMsg: string         // 检定次数过多提示
}
```


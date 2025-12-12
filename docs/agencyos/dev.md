# 贡献者指南与技术文档

欢迎加入 Agency OS 的开发！本项目旨在提供一个**离线优先**的 GM（游戏主持人）信息追踪工具。本指南将为您提供项目技术栈、架构概览和开发流程，帮助您快速上手。

## 1. 技术栈概览

Agency OS 是一个现代化的前端应用，采用以下核心技术栈 [1]：

| 领域 | 技术栈 | 作用与特点 |
| :--- | :--- | :--- |
| **框架** | React 19 + TypeScript | 提供强大的组件化能力和类型安全。 |
| **构建** | Vite 7 | 极速的开发服务器和高效的生产构建。**注意：推荐 Node.js ≥ 20.19**。 |
| **状态管理** | Zustand | 轻量、快速、可扩展的状态管理库，用于全局状态（如战役、主题）。 |
| **数据持久化** | Dexie.js (IndexedDB) | 封装 IndexedDB，实现**离线优先**的数据存储和高性能查询。 |
| **异步数据** | TanStack Query | 用于管理异步数据、缓存和同步，便于未来接入远程 API。 |
| **UI/样式** | Tailwind CSS + Radix UI | 快速构建复古企业风 UI；Radix 提供无障碍（Accessibility）组件基元。 |
| **路由** | `react-router-dom` | 负责应用内的页面导航和多模块路由。 |

## 2. 项目架构与模块划分

项目遵循**领域驱动设计（Domain-Driven Design, DDD）**的思路进行模块划分，每个核心业务领域（如 `agents`、`missions`、`anomalies`）都有自己的独立模块。

### 2.1. 核心目录结构

```text
src/
  main.tsx           # React 应用入口
  App.tsx            # 根组件，挂载路由和全局布局
  app/
    providers.tsx    # 全局 Contexts (Router, Theme, etc.)
    layouts/
      app-shell.tsx  # 应用主布局（侧边栏、顶部状态条）
  modules/           # 核心业务模块
    dashboard/       # 战役仪表板
    agents/          # 特工档案管理
    missions/        # 任务控制台
    anomalies/       # 异常体/散逸端库
    reports/         # 任务报告与结算
    notes/           # 笔记管理
    settings/        # 应用设置
  components/ui/     # 设计系统组件（Panel, Card, Button, etc.）
  services/db/       # Dexie 客户端、Schema 定义、快照导入导出逻辑
  stores/            # Zustand Store 定义（拆分 slices）
  lib/               # 工具函数、类型定义、常量
```

### 2.2. 数据层：离线优先策略

本项目最核心的特点是**离线优先**。所有战役数据都存储在用户的浏览器 IndexedDB 中，通过 **Dexie.js** 进行操作。

- **Schema 定义**：Dexie 的数据库 Schema 定义位于 `src/services/db/` 目录下。
- **Repository 模式**：数据访问逻辑被封装在 Repository 中，例如 `src/services/db/repository.ts`。这种模式便于未来项目扩展到云同步时，将数据源从 IndexedDB 切换到远程 API，而无需修改上层业务逻辑。
- **数据快照**：通过 JSON 导入/导出功能实现战役数据的备份和迁移。快照结构包含版本号，以支持未来的数据迁移（Migration）逻辑。

## 3. 核心数据模型（TypeScript 接口）

以下是几个关键的实体模型，它们定义了 Agency OS 追踪的核心信息 [2]：

| 实体 | 描述 | 关键字段 |
| :--- | :--- | :--- |
| `Campaign` | 战役的全局设置和状态 | `name`, `divisionCode`, `status`, `styleTags`, `nextMissionId` |
| `Agent` | 特工档案 | `name`, `codename`, `arc` (Anomaly, Reality, Role), `qa` (资质), `rating` |
| `Mission` | 任务信息 | `code`, `name`, `type`, `participants`, `chaos` (混沌状态), `timeline` (日志) |
| `Anomaly` | 异常体信息 | `codename`, `focus`, `impulse`, `domain`, `status`, `chaosEffects` |
| `DebriefReport` | 任务结算报告 | `missionId`, `grade`, `mvpAgentId`, `optionalObjectiveSummary` |

**示例：`Agent` 接口片段**
```typescript
interface Agent {
  id: ID
  campaignId: ID
  name: string
  codename: string
  status: 'active' | 'resting' | 'retired' | 'dead' | 'pending'
  arc: {
    anomaly: { type: string; abilities: AbilityNote[] }
    reality: { type: string; trigger: string; overloadRelief: string }
    role: { type: string; primaryDirective: string; permittedActions: string[] }
  }
  qa: { label: string; current: number; max: number }[]
  // ... 其他字段
}
```

## 4. 开发流程

### 4.1. 环境搭建

请参考部署指南中的 **环境准备** 章节，确保您已安装 **Git** 和 **Node.js (≥ 20.19)**。

1.  **克隆仓库**：
    ```bash
    git clone https://github.com/shakugannosaints/AgencyOS.git
    cd AgencyOS
    ```
2.  **安装依赖**：
    ```bash
    npm install
    ```
3.  **启动开发服务器**：
    ```bash
    npm run dev
    ```
    项目将在 `http://localhost:5173` 启动。

### 4.2. 编码规范

- **TypeScript 优先**：所有新代码应使用 TypeScript 编写，以确保类型安全。
- **Tailwind CSS**：使用 Tailwind CSS 进行样式编写，避免使用传统的 CSS 文件。
- **组件化**：遵循 React 最佳实践，保持组件的单一职责原则。
- **状态管理**：
    - 业务实体状态（如 `Agent` 列表、`Mission` 详情）应通过 **Zustand Store** 管理。
    - 异步数据（如从 Dexie 获取的数据）应通过 **TanStack Query** 封装，以利用其缓存和同步机制。
- **Git 提交信息**：请遵循 **Conventional Commits** 规范，例如：
    - `feat: 添加新的特工档案页面`
    - `fix: 修复任务日志无法保存的问题`
    - `docs: 更新贡献者指南`

### 4.3. 提交贡献

1.  **创建分支**：从 `main` 分支拉取新分支进行开发。
    ```bash
    git checkout -b feat/your-feature-name
    ```
2.  **开发与测试**：完成您的功能或修复，并确保通过了本地测试。
3.  **提交代码**：
    ```bash
    git add .
    git commit -m "feat: 简短的提交信息"
    ```
4.  **推送分支**：
    ```bash
    git push origin feat/your-feature-name
    ```
5.  **创建 Pull Request (PR)**：在 GitHub 上向 `main` 分支提交 PR，描述您的更改内容和目的。

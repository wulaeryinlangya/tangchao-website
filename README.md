# 糖巢创客社区网站

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwulaeryinlangya%2Ftangchao-website&env=DEEPSEEK_API_KEY,DEEPSEEK_BASE_URL&envDescription=DeepSeek%20API%20配置&envLink=https%3A%2F%2Fgithub.com%2Fwulaeryinlangya%2Ftangchao-website%2Fblob%2Fmain%2FVERCEL-DEPLOY.md)

糖巢创客社区官方网站，采用 React + Vite 构建，集成了基于 DeepSeek API 的智能对话系统。

## 🚀 快速部署

**一键部署到 Vercel：**

1. 点击上方 [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwulaeryinlangya%2Ftangchao-website&env=DEEPSEEK_API_KEY,DEEPSEEK_BASE_URL&envDescription=DeepSeek%20API%20配置) 按钮
2. 登录 Vercel（可用 GitHub 账号）
3. 设置环境变量（会自动提示）：
   - `DEEPSEEK_API_KEY`: 你的 DeepSeek API Key
   - `DEEPSEEK_BASE_URL`: `https://api.deepseek.com/anthropic`
4. 点击 Deploy，等待 1-2 分钟完成！

详细部署指南：[VERCEL-DEPLOY.md](./VERCEL-DEPLOY.md)


## 技术栈

- **前端**: React 18.3.1 + TypeScript + Vite + Tailwind CSS
- **后端**: Node.js + Express (API 代理服务器)
- **AI**: DeepSeek API (Anthropic 格式)

## 项目结构

```
tangchao-website/
├── src/                    # 前端源代码
│   ├── components/         # React 组件
│   │   └── ChatAgent.tsx  # AI 对话组件
│   ├── api/               # API 服务层
│   │   └── chat.ts        # 聊天 API 接口
│   ├── data/              # 静态数据
│   └── sections/          # 页面区块
├── server/                # 后端服务器
│   ├── server.js          # Express 服务器
│   ├── .env               # 环境变量（包含 API Key）
│   └── package.json       # 后端依赖
├── public/                # 静态资源
└── .env.local             # 前端环境变量
```

## 开发指南

### 1. 安装依赖

**前端依赖：**
```bash
npm install
```

**后端依赖：**
```bash
cd server
npm install
```

### 2. 环境配置

**后端配置** (`server/.env`)：
```env
DEEPSEEK_API_KEY=your-deepseek-api-key-here
DEEPSEEK_BASE_URL=https://api.deepseek.com/anthropic
PORT=3001
```

**前端配置** (`.env.local`)：
```env
VITE_API_URL=http://localhost:3001
```

### 3. 启动开发服务器

需要同时启动前端和后端服务器：

**终端 1 - 启动后端：**
```bash
cd server
npm run dev
```
后端运行在 `http://localhost:3001`

**终端 2 - 启动前端：**
```bash
npm run dev
```
前端运行在 `http://localhost:5173`

### 4. 访问网站

在浏览器中打开 `http://localhost:5173`，点击右下角的聊天按钮即可与 AI 顾问对话。

## AI 对话系统架构

### 工作流程

1. **用户输入** → 前端 ChatAgent 组件
2. **API 调用** → 前端通过 `src/api/chat.ts` 调用后端
3. **后端代理** → Express 服务器 (`server/server.js`)
4. **DeepSeek API** → 后端调用 DeepSeek API (Anthropic 格式)
5. **返回响应** → AI 回复通过后端返回前端显示

### 安全性

- ✅ API Key 存储在后端，不暴露给前端
- ✅ CORS 配置保护后端接口
- ✅ 输入验证防止恶意请求
- ✅ 错误信息脱敏处理

### 系统提示词

后端服务器 (`server/server.js`) 中包含了完整的糖巢社区知识库作为系统提示词，包括：
- 社区介绍与位置
- 八大业态
- 特色空间
- 创客风采
- 核心数据
- 荣誉成就
- 发展历程
- 媒体传播
- 入驻政策

## API 端点

### POST `/api/chat`

发送聊天消息并获取 AI 回复。

**请求体：**
```json
{
  "message": "糖巢社区是什么？",
  "history": [
    { "role": "user", "text": "你好" },
    { "role": "ai", "text": "你好！我是糖巢的 AI 顾问..." }
  ]
}
```

**响应：**
```json
{
  "message": "糖巢创客社区位于河源市东源县...",
  "usage": {
    "input_tokens": 150,
    "output_tokens": 200
  }
}
```

### GET `/health`

健康检查端点。

**响应：**
```json
{
  "status": "ok",
  "timestamp": "2026-08-28T00:00:00.000Z"
}
```

## 构建与部署

### 前端构建

```bash
npm run build
```

构建产物在 `dist/` 目录。

### 后端部署

1. 设置环境变量（API Key、端口等）
2. 运行 `cd server && npm start`
3. 确保前端的 `VITE_API_URL` 指向生产环境后端 URL

### 部署建议

- **前端**: Vercel、Netlify、GitHub Pages
- **后端**: Railway、Render、Fly.io
- 生产环境务必更新 CORS 配置和环境变量

## 故障排查

### 后端服务器无法启动

检查：
- `server/.env` 文件是否存在
- 端口 3001 是否被占用
- 依赖是否正确安装

### 前端无法连接后端

检查：
- 后端服务器是否正在运行
- `.env.local` 中的 `VITE_API_URL` 是否正确
- 浏览器控制台是否有 CORS 错误

### AI 回复异常

检查：
- DeepSeek API Key 是否有效
- 网络连接是否正常
- 后端日志中是否有错误信息

## 开发注意事项

1. **API Key 安全**: 永远不要将 `server/.env` 提交到 Git
2. **CORS 配置**: 生产环境需要限制允许的源
3. **错误处理**: 前端会将所有错误显示为友好的对话消息
4. **对话历史**: 前端会将对话历史传递给 API 以保持上下文

## 许可证

糖巢创客社区网站 © 2026

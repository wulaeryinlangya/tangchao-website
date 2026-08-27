# 快速参考指南

## 🚀 快速启动

### Windows 用户
双击 `start-dev.bat` 即可同时启动前后端服务器。

### 手动启动

**终端 1 - 后端：**
```bash
cd server
npm run dev
```

**终端 2 - 前端：**
```bash
npm run dev
```

## 📁 关键文件

| 文件 | 说明 |
|------|------|
| `src/components/ChatAgent.tsx` | AI 对话组件（前端） |
| `src/api/chat.ts` | API 调用层 |
| `server/server.js` | Express 后端服务器 |
| `server/.env` | 后端环境变量（包含 API Key） |
| `.env.local` | 前端环境变量 |

## 🔧 常用命令

### 开发
```bash
# 启动前端
npm run dev

# 启动后端
cd server && npm run dev

# 同时启动（Windows）
start-dev.bat
```

### 测试
```bash
# 测试后端健康检查
curl http://localhost:3001/health

# 测试聊天 API
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"糖巢社区是什么？"}'
```

### 构建
```bash
# 构建前端
npm run build

# 预览构建结果
npm run preview
```

## 🌐 默认端口

- **前端**: http://localhost:5173
- **后端**: http://localhost:3001

## 🔑 环境变量

### 后端 (`server/.env`)
```env
DEEPSEEK_API_KEY=your-deepseek-api-key-here
DEEPSEEK_BASE_URL=https://api.deepseek.com/anthropic
PORT=3001
```

### 前端 (`.env.local`)
```env
VITE_API_URL=http://localhost:3001
```

## 🐛 故障排查

### 问题：后端无法启动
```bash
# 检查端口是否被占用
netstat -ano | findstr :3001

# 杀死占用端口的进程
taskkill /PID <进程ID> /F

# 重新安装依赖
cd server && npm install
```

### 问题：前端无法连接后端
1. 确认后端正在运行：访问 http://localhost:3001/health
2. 检查 `.env.local` 中的 `VITE_API_URL` 是否正确
3. 重启前端服务器（Vite 需要重启才能读取新的环境变量）

### 问题：API 返回错误
1. 检查 `server/.env` 中的 API Key 是否正确
2. 查看后端控制台日志
3. 测试 DeepSeek API 是否可访问：
```bash
curl https://api.deepseek.com/anthropic/v1/messages \
  -H "x-api-key: your-deepseek-api-key-here"
```

## 📝 修改 AI 行为

编辑 `server/server.js` 中的 `SYSTEM_PROMPT` 变量来调整 AI 的知识库和回答风格。

## 🔒 安全提醒

⚠️ **永远不要将以下文件提交到 Git：**
- `server/.env` （包含 API Key）
- `.env.local`

这些文件已经添加到 `.gitignore` 中。

## 📚 更多文档

- [README.md](README.md) - 完整项目文档
- [DEPLOYMENT.md](DEPLOYMENT.md) - 部署指南
- [TEST-CHECKLIST.md](TEST-CHECKLIST.md) - 测试清单

## 💡 小技巧

1. **修改端口**：编辑 `server/.env` 中的 `PORT` 变量
2. **调试模式**：查看浏览器控制台和后端终端的日志
3. **热重载**：前端代码修改自动刷新，后端需要重启
4. **查看 API 使用情况**：每次调用后，控制台会显示 token 使用量

## 🎯 下一步

1. 测试所有功能（参考 [TEST-CHECKLIST.md](TEST-CHECKLIST.md)）
2. 根据需要调整 AI 系统提示词
3. 准备部署到生产环境（参考 [DEPLOYMENT.md](DEPLOYMENT.md)）

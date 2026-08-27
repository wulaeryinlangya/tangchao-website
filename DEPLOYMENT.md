# 糖巢网站部署指南

本文档说明如何将糖巢网站部署到生产环境。

## 架构概览

```
用户浏览器 → 前端 (Vercel/Netlify) → 后端 (Railway/Render) → DeepSeek API
```

## 前置准备

- [x] GitHub 账号
- [x] DeepSeek API Key: `your-deepseek-api-key-here`
- [ ] Railway/Render 账号（后端部署）
- [ ] Vercel/Netlify 账号（前端部署）

## 第一步：部署后端 API 服务器

### 方案 A：使用 Railway（推荐）

1. 访问 [railway.app](https://railway.app)
2. 点击 "New Project" → "Deploy from GitHub repo"
3. 选择 `tangchao-website` 仓库
4. 配置：
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

5. 设置环境变量（Settings → Variables）：
   ```
   DEEPSEEK_API_KEY=your-deepseek-api-key-here
   DEEPSEEK_BASE_URL=https://api.deepseek.com/anthropic
   PORT=3001
   NODE_ENV=production
   ```

6. 部署完成后，记录分配的 URL（例如：`https://tangchao-api.railway.app`）

### 方案 B：使用 Render

1. 访问 [render.com](https://render.com)
2. 点击 "New +" → "Web Service"
3. 连接 GitHub 仓库 `tangchao-website`
4. 配置：
   - **Name**: `tangchao-api`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: Free

5. 环境变量（Environment）：
   ```
   DEEPSEEK_API_KEY=your-deepseek-api-key-here
   DEEPSEEK_BASE_URL=https://api.deepseek.com/anthropic
   PORT=3001
   NODE_ENV=production
   ```

6. 点击 "Create Web Service"

## 第二步：部署前端

### 方案 A：使用 Vercel（推荐）

1. 访问 [vercel.com](https://vercel.com)
2. 点击 "New Project" → 导入 GitHub 仓库
3. 配置：
   - **Framework Preset**: Vite
   - **Root Directory**: `./`（项目根目录）
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. 环境变量（Environment Variables）：
   ```
   VITE_API_URL=https://tangchao-api.railway.app
   ```
   ⚠️ 将上面的 URL 替换为你在第一步记录的后端 URL

5. 点击 "Deploy"

### 方案 B：使用 Netlify

1. 访问 [netlify.com](https://netlify.com)
2. 点击 "Add new site" → "Import an existing project"
3. 连接 GitHub 仓库
4. 配置：
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

5. 环境变量（Site settings → Environment variables）：
   ```
   VITE_API_URL=https://tangchao-api.railway.app
   ```

6. 点击 "Deploy site"

## 第三步：更新后端 CORS 配置

部署完成后，需要更新后端的 CORS 配置以允许生产环境前端访问。

编辑 `server/server.js`：

```javascript
// 将这行：
app.use(cors())

// 改为：
app.use(cors({
  origin: [
    'http://localhost:5173',  // 本地开发
    'https://your-vercel-domain.vercel.app',  // 生产环境
  ]
}))
```

然后推送到 GitHub，Railway/Render 会自动重新部署。

## 第四步：测试生产环境

1. 访问你的前端 URL（例如：`https://tangchao.vercel.app`）
2. 点击右下角的 AI 对话按钮
3. 发送消息："糖巢社区是什么？"
4. 确认 AI 正常回复

## 环境变量清单

### 后端 (server/.env)

| 变量名 | 开发环境值 | 生产环境值 |
|--------|-----------|-----------|
| DEEPSEEK_API_KEY | your-deepseek-api-key-here | 相同 |
| DEEPSEEK_BASE_URL | https://api.deepseek.com/anthropic | 相同 |
| PORT | 3001 | 3001 |
| NODE_ENV | development | production |

### 前端 (.env.local / .env.production)

| 变量名 | 开发环境值 | 生产环境值 |
|--------|-----------|-----------|
| VITE_API_URL | http://localhost:3001 | https://your-backend-url.app |

## 监控与维护

### 查看后端日志

- **Railway**: Dashboard → Deployments → View Logs
- **Render**: Dashboard → Logs

### 常见问题

**问题 1：前端无法连接后端（CORS 错误）**
- 确认后端 CORS 配置包含前端域名
- 检查 `VITE_API_URL` 是否正确

**问题 2：API 返回 401/403 错误**
- 检查 `DEEPSEEK_API_KEY` 环境变量是否正确设置
- 确认 API Key 有效且有足够额度

**问题 3：后端部署失败**
- 检查 `server/package.json` 是否存在
- 确认 Node.js 版本兼容（建议 18.x+）

## 成本估算

### 免费方案（推荐用于测试）

- **前端 (Vercel)**: 免费
- **后端 (Railway)**: 免费额度 $5/月（约 500 小时运行时间）
- **DeepSeek API**: 按使用量计费（非常便宜）

### 生产方案

- **前端 (Vercel Pro)**: $20/月
- **后端 (Railway)**: $5-20/月
- **DeepSeek API**: 根据实际使用量

## 性能优化建议

1. **缓存常见问题回答**：减少 API 调用
2. **添加 Redis**：存储对话历史
3. **CDN 加速**：Vercel/Netlify 自带
4. **限流保护**：防止 API 滥用

## 备份与回滚

- **代码**: 保存在 GitHub，可随时回滚到任意版本
- **环境变量**: 在部署平台的控制台中备份
- **API Key**: 妥善保管，必要时可重新生成

## 下一步

- [ ] 添加访问统计（Google Analytics）
- [ ] 设置自定义域名
- [ ] 配置 HTTPS 证书（Vercel/Netlify 自动提供）
- [ ] 添加错误监控（Sentry）

---

部署完成后，别忘了在 README.md 中更新生产环境 URL！

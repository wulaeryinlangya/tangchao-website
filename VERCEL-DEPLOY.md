# Vercel 部署指南

## 步骤 1：准备代码

代码已经准备好，包含：
- ✅ Vercel Serverless Function: `api/chat.js`
- ✅ Vercel 配置文件: `vercel.json`
- ✅ 前端 API 路径已更新为 `/api`

## 步骤 2：部署到 Vercel

### 方法 1：通过 Vercel 网站（推荐）

1. **访问** [vercel.com](https://vercel.com)

2. **登录并导入项目**
   - 点击 "Add New Project"
   - 选择 "Import Git Repository"
   - 连接你的 GitHub 账号
   - 选择 `wulaeryinlangya/tangchao-website` 仓库

3. **配置项目**
   - **Framework Preset**: Vite（自动检测）
   - **Root Directory**: `./`（保持默认）
   - **Build Command**: `npm run build`（自动检测）
   - **Output Directory**: `dist`（自动检测）

4. **设置环境变量**（重要！）
   
   在 "Environment Variables" 部分添加：
   
   | Name | Value |
   |------|-------|
   | `DEEPSEEK_API_KEY` | `sk-8a7f829d9986435a92720bc2cb3c8141` |
   | `DEEPSEEK_BASE_URL` | `https://api.deepseek.com/anthropic` |

   确保选择 **All Environments** (Production, Preview, Development)

5. **点击 Deploy**
   
   Vercel 会自动：
   - 安装依赖
   - 构建前端
   - 部署 Serverless Functions
   - 生成生产环境 URL

6. **等待部署完成**（约 1-2 分钟）
   
   部署成功后，你会得到一个 URL，例如：
   ```
   https://tangchao-website.vercel.app
   ```

## 步骤 3：测试部署

1. 访问你的生产环境 URL
2. 点击右下角的 AI 对话按钮
3. 测试几个问题：
   - "糖巢社区是什么？"
   - "地址在哪里？"
   - "有哪些业态？"

4. 检查：
   - ✅ AI 回复正常
   - ✅ 没有网络错误
   - ✅ 加载状态正常显示

## 步骤 4：自定义域名（可选）

如果你有自己的域名：

1. 在 Vercel Dashboard → Settings → Domains
2. 添加你的域名
3. 按照提示配置 DNS 记录
4. 等待 DNS 生效（几分钟到几小时）

## 故障排查

### 如果 API 调用失败：

1. **检查环境变量**
   - Vercel Dashboard → Settings → Environment Variables
   - 确认 `DEEPSEEK_API_KEY` 和 `DEEPSEEK_BASE_URL` 已设置

2. **查看日志**
   - Vercel Dashboard → Deployments → 点击最新部署
   - 查看 "Functions" 标签下的日志

3. **检查 API 路由**
   - 访问 `https://your-url.vercel.app/api/chat`
   - 应该返回 405 Method Not Allowed（正常，因为需要 POST）

### 如果前端样式丢失：

检查 `vite.config.ts` 中的 `base` 配置：
```typescript
export default defineConfig({
  plugins: [react()],
  base: './',  // 确保是相对路径
})
```

## 自动部署

配置完成后，每次推送到 GitHub 的 `main` 分支，Vercel 会自动：
1. 拉取最新代码
2. 重新构建
3. 自动部署

## 成本

- Vercel 免费套餐包含：
  - 每月 100GB 带宽
  - 100GB-小时 Serverless Function 执行时间
  - 对于糖巢网站的流量，免费套餐完全够用

## 下一步

部署成功后，你可以：
1. ✅ 分享生产环境 URL
2. ✅ 配置自定义域名
3. ✅ 在 Vercel Analytics 中查看访问数据
4. ✅ 持续优化 AI 对话功能

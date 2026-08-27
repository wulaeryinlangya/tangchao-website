# Cloudflare Pages 部署指南

## 为什么选择 Cloudflare Pages？

- ✅ **完全免费**：无限带宽和请求
- ✅ **国内可访问**：比 Vercel 在国内稳定
- ✅ **全球 CDN**：访问速度快
- ✅ **支持 Serverless**：Cloudflare Workers 处理后端 API

## 📋 部署步骤

### 步骤 1：注册 Cloudflare 账号

1. 访问 [https://dash.cloudflare.com](https://dash.cloudflare.com)
2. 点击 **"Sign Up"** 注册账号
3. 验证邮箱

### 步骤 2：创建 Pages 项目

1. 登录 Cloudflare Dashboard
2. 左侧菜单选择 **"Workers & Pages"**
3. 点击 **"Create application"**
4. 选择 **"Pages"** 标签
5. 点击 **"Connect to Git"**

### 步骤 3：连接 GitHub 仓库

1. 选择 **"GitHub"**
2. 授权 Cloudflare 访问你的 GitHub
3. 选择仓库：`wulaeryinlangya/tangchao-website`
4. 点击 **"Begin setup"**

### 步骤 4：配置构建设置

在构建配置页面设置：

| 配置项 | 值 |
|--------|-----|
| **Project name** | `tangchao-website`（或自定义） |
| **Production branch** | `main` |
| **Framework preset** | `None`（不要选 Vite） |
| **Build command** | `npm install && npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | `/`（留空或填 /） |

### 步骤 5：设置环境变量（重要！）

在 **"Environment variables"** 部分添加：

| 变量名 | 值 | 作用域 |
|--------|-----|--------|
| `DEEPSEEK_API_KEY` | `sk-8a7f829d9986435a92720bc2cb3c8141` | Production |
| `DEEPSEEK_BASE_URL` | `https://api.deepseek.com/anthropic` | Production |

**⚠️ 注意：**
- 这些环境变量会被 Cloudflare Workers 使用
- 确保选择 **"Production"** 作用域
- **不需要设置 NODE_VERSION**，Cloudflare 会自动检测 .node-version 文件

### 步骤 6：开始部署

1. 点击 **"Save and Deploy"**
2. 等待构建完成（约 2-3 分钟）
3. 部署成功后，你会得到一个域名，例如：
   ```
   https://tangchao-website.pages.dev
   ```

### 步骤 7：配置 Workers

Cloudflare Pages 会自动检测 `functions/` 目录中的文件并部署为 Workers：

- `functions/api/chat.js` → `/api/chat` 端点

**无需额外配置！** Cloudflare 会自动：
- 部署前端静态文件到全球 CDN
- 部署 Workers 函数处理 API 请求
- 将环境变量注入到 Workers

### 步骤 8：测试

1. 访问你的 Cloudflare Pages 域名
2. 点击右下角 AI 对话按钮
3. 输入问题测试
4. ✅ 在国内应该可以访问（部分地区可能需要时间）

---

## 🌐 自定义域名（可选）

如果你有自己的域名：

1. 在项目设置中，点击 **"Custom domains"**
2. 点击 **"Set up a custom domain"**
3. 输入你的域名（如 `tangchao.com`）
4. 按照提示添加 DNS 记录到你的域名提供商
5. 等待 DNS 生效（几分钟到几小时）

---

## 💰 费用说明

Cloudflare Pages 完全免费，包括：
- ✅ 无限带宽
- ✅ 无限请求
- ✅ 全球 CDN
- ✅ Workers（每天 10 万次请求免费）

对于糖巢网站的流量，完全免费够用！

---

## 🔧 故障排查

### 问题 1：AI 对话不工作

**检查：**
1. 进入项目 → **Settings** → **Environment variables**
2. 确认 `DEEPSEEK_API_KEY` 和 `DEEPSEEK_BASE_URL` 已添加
3. 如果刚添加，需要 **重新部署**：
   - 进入 **Deployments**
   - 点击最新部署右侧的 **...** → **Retry deployment**

### 问题 2：部署失败

**常见原因：**
- 构建命令错误
- Node.js 版本不兼容

**解决方案：**
1. 查看构建日志（Deployments → 点击失败的部署）
2. 确认 `NODE_VERSION=18` 环境变量已设置

### 问题 3：国内访问慢或无法访问

**说明：**
- Cloudflare 在国内访问情况因地区而异
- 部分地区可能需要一段时间才能稳定访问
- 如果完全无法访问，可能需要考虑国内云服务商（阿里云/腾讯云）

**改善方案：**
- 使用自定义域名（有时比 .pages.dev 域名更稳定）
- 等待 DNS 完全解析（最多 24-48 小时）

---

## 🚀 自动部署

配置完成后，每次推送代码到 GitHub 的 `main` 分支，Cloudflare Pages 会自动：
1. 检测到更新
2. 重新构建
3. 自动部署

---

## ⚡ 快速开始

如果你想最快部署：

1. 访问 https://dash.cloudflare.com
2. Workers & Pages → Create → Pages → Connect to Git
3. 选择仓库 `wulaeryinlangya/tangchao-website`
4. 设置环境变量（API Key）
5. Deploy
6. 完成！

全程约 3-5 分钟 🎉

---

## 📌 重要提醒

1. **环境变量必须设置**，否则 AI 对话功能无法工作
2. **Cloudflare Pages 自动检测** `functions/` 目录部署 Workers
3. **国内访问情况**因地区而异，建议先测试
4. 如果国内访问不稳定，推荐使用**阿里云 OSS + 云函数**方案

---

## 🆘 需要帮助？

如果遇到问题：
1. 查看 Cloudflare Pages 文档：https://developers.cloudflare.com/pages/
2. 或者告诉我具体错误信息，我继续帮你解决！

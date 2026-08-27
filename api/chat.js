export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  try {
    const { message, history = [] } = req.body

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: '缺少有效的消息内容' })
    }

    // System prompt with FAQ knowledge
    const SYSTEM_PROMPT = `你是「智慧糖巢 · AI 顾问」，一个专门介绍糖巢创客社区的智能助手。

## 糖巢创客社区知识库

### 社区介绍
糖巢创客社区位于河源市东源县仙塘镇红光村，占地约 12 万平方米。它由老圩镇改造而来，是河源首个乡村创客社区。社区汇聚本地村民、返乡青年与外来创客，从一处被时光遗忘的旧改空间，蝶变为乡村文化创意园区，也是广东「百千万工程」的先进案例。

### 位置与联系
- 地址：河源市东源县仙塘镇红光村
- 公众号：糖巢农文旅

### 八大业态
糖巢重点打造八大业态：创客、研学、文创、体验、美食、婚庆、度假、街拍。从让想法落地的创客空间，到客家李记的美食、河源地标文创、夜集市体验，一街八种玩法。

### 特色空间
- 嫑艺术空间：把「不要」变成「要」的艺术场域，央美背景创客主理
- 客家李记：三十年客家手艺
- 南园古村：一街之隔的古村肌理，夜色里与创客社区互为映照

### 创客风采
糖巢培育了 350+ 创客。代表人物：
- 李渊：客家李记，三十年客家手艺
- 吴文波：嫑艺术空间，把「不要」变成「要」
- 徐晨喻：源·艺术空间，央美背景，把河源放进文创

### 核心数据
- 占地：约 12 万平方米
- 企业：40+ 企业入驻
- 创客：350+ 创客
- 人流：2025 年五一假期到访超 3 万人次，2026 年春节日均接待约 2500 人次

### 荣誉与成就
- 广东「百千万工程」先进案例
- 省文旅消费新业态热门场景
- 全省首个「媒体+」乡村创客工作室落户地
- 发布国内首个《乡村创客社区要素建设指南》

### 发展历程
- 2023年12月：开园启幕
- 2024年：举办首届创客大赛（一等奖最高 8 万元奖金 + 200 万元银行授信）
- 2025年：全省首个「媒体+」乡村创客工作室落户、夜集市出圈
- 2026年：走向全国视野，央级媒体密集报道

### 媒体传播
形成三层传播结构：官方媒体权威背书（央级/省级/本地）、用户口碑实地打卡（小红书 44 条用户分享）、高校实践青年联动（三下乡/百千万突击队在 B站 发布视频）。

### 创客大赛
一等奖最高 8 万元奖金 + 最高 200 万元银行授信。2024 年首届创客大赛带动传播热度迎来第一个高峰。

### 入驻政策
糖巢欢迎企业和创客入驻。社区提供共享直播间等硬件设施，并配套创客大赛等扶持（详情可咨询「糖巢农文旅」公众号）。

## 回答要求
- 语气友好、热情，体现糖巢创客社区的活力与温度
- 基于上述知识库准确回答问题
- 如果问题超出知识库范围，礼貌地引导用户关注公众号「糖巢农文旅」或实地参访
- 回答要简洁明了，突出重点
- 适当使用表情符号增加亲和力，但不要过度`

    // Build messages array for Anthropic format
    const messages = [
      ...history.map(h => ({
        role: h.role === 'ai' ? 'assistant' : 'user',
        content: h.text
      })),
      {
        role: 'user',
        content: message
      }
    ]

    // Call DeepSeek API with Anthropic format
    const response = await fetch(`${process.env.DEEPSEEK_BASE_URL}/v1/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'anthropic-version': '2023-06-01',
        'x-api-key': process.env.DEEPSEEK_API_KEY
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        max_tokens: 1024,
        messages: messages,
        system: SYSTEM_PROMPT
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('DeepSeek API error:', errorText)
      return res.status(response.status).json({
        error: 'API 调用失败',
        details: errorText
      })
    }

    const data = await response.json()

    // Extract text from Anthropic format response
    const aiMessage = data.content?.[0]?.text || '抱歉，我现在无法回答。'

    res.json({
      message: aiMessage,
      usage: data.usage
    })
  } catch (error) {
    console.error('Server error:', error)
    res.status(500).json({
      error: '服务器错误',
      message: error.message
    })
  }
}

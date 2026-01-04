// scripts/generate-config.mjs
import { existsSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'

// 选择环境文件路径
const envPath = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'

async function main() {
  // 1. 检查 .env 文件是否存在
  if (!existsSync(envPath)) {
    console.error(`❌ 未找到 ${envPath}`)
    process.exit(1)
  }

  // 2. 读取原始 .env 文件内容（用于提取注释）
  const rawEnvContent = await readFile(envPath, 'utf-8')
  const lines = rawEnvContent.split('\n')

  // 3. 构建带注释的配置对象（支持注释在参数上方）
  let lastComment = ''
  const configEntries = []

  for (const line of lines) {
    const trimmedLine = line.trim()

    // 空行或纯注释行
    if (!trimmedLine) {
      continue
    }

    // 如果是注释行，暂存为下一个变量的注释
    if (trimmedLine.startsWith('#')) {
      lastComment = trimmedLine.replace(/^# */, '').trim()
      continue
    }

    // 变量行
    const [key, value] = trimmedLine.split('=')

    if (!key || !value || !key.startsWith('VITE_')) continue

    const cleanKey = key.replace('VITE_', '')
    configEntries.push({
      key: cleanKey,
      value,
      comment: lastComment
    })

    // 清空 lastComment，防止重复使用
    lastComment = ''
  }

  // 4. 构造 JS 文件内容（注释在参数上方）
  const jsLines = ['window.__APP_CONFIG__ = {']

  configEntries.forEach((entry, index) => {
    const isLast = index === configEntries.length - 1
    if (entry.comment) {
      jsLines.push(`    // ${entry.comment}`)
    }
    jsLines.push(`    ${entry.key}: '${entry.value}'${isLast ? '' : ','}`)
  })

  jsLines.push('}\n')

  const jsContent = jsLines.join('\n')

  // 5. 写入 public/config.js
  try {
    await writeFile('public/config.js', jsContent, 'utf-8')
    console.log(`✅ 已从 ${envPath} 写入 public/config.js`)
  } catch (err) {
    console.error('❌ 写入 config.js 失败:', err)
  }
}

main()

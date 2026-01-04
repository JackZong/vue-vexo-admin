import axios from 'axios'
import { exec } from 'child_process'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径（模拟 __dirname）
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Swagger JSON 的 URL
const swaggerUrl =
  'https://api.pax-admin-pro.dditzy.com/v2/api-docs?group=%E6%89%80%E6%9C%89%E6%8E%A5%E5%8F%A3'

// 步骤 1: 获取 Swagger JSON
const getSwaggerJson = async (url) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.error('Error fetching Swagger JSON:', error)
    return null
  }
}

// 步骤 2: 保存 Swagger JSON 文件
const saveSwaggerJsonToFile = async (swaggerJson) => {
  const jsonFilePath = path.resolve(__dirname, '../swagger.json')
  fs.writeFileSync(jsonFilePath, JSON.stringify(swaggerJson, null, 2)) // 保存为 swagger.json 文件
  return jsonFilePath
}

// 步骤 3: 使用 swagger-typescript-api 生成 TypeScript 类型
const generateTypesFromSwagger = async () => {
  const swaggerJson = await getSwaggerJson(swaggerUrl)

  if (swaggerJson) {
    const jsonFilePath = await saveSwaggerJsonToFile(swaggerJson)

    // 使用 swagger-typescript-api 生成 TypeScript 类型
    const outputDir = path.resolve(__dirname, '../src/api') // 输出目录
    const command = `npx swagger-typescript-api generate -p ${jsonFilePath} -o ${outputDir} -n api.ts`

    exec(command, (err, stdout, stderr) => {
      if (err) {
        console.error(`Error executing command: ${err}`)
        return
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`)
        return
      }
      console.log(`stdout: ${stdout}`)
      console.log('TypeScript types generated successfully')
    })
  }
}

// 执行生成过程
generateTypesFromSwagger()



// 预加载所有模型图片
const modelImages = import.meta.glob('@/assets/images/model/*.png', {
  eager: true,
  import: 'default'
}) as Record<string, string>

export function useModel() {
  const getModelImg = (model: string): string => {
    if (!model || typeof model !== 'string') {
      console.warn('Invalid model name provided, using default image.')
      return modelImages['/src/assets/images/model/default.png']
    }

    const normalizedModel = model.toLowerCase()
    const imagePath = `/src/assets/images/model/${normalizedModel}.png`

    try {
      // 可选：检查文件是否存在（需配合构建工具配置）
      return modelImages[imagePath]
    } catch (error) {
      console.error(`Image for model "${normalizedModel}" not found.`, error)
      return modelImages['/src/assets/images/model/default.png']
    }
  }
  return {
    getModelImg
  }
}

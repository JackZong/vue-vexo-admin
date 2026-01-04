

import { onUnmounted, type Ref, ref, unref, watch } from 'vue'

// 联合类型，包含所有支持的原始数据类型
type SupportedDataSource = any | Blob | ArrayBuffer | Ref<any>

/**
 * Hook 结果类型定义
 */
interface DownloadHookResult {
  downloadUrl: Ref<string | null>
  downloadFileName: Ref<string>
  /**
   * 更新数据源，可以是一个 Ref 对象，Hook 将自动监听其变化；也可以是普通数据、Blob 或 ArrayBuffer。
   * @param data 要下载的数据。
   * @param fileName 下载时建议使用的文件名。
   * @param type Blob 的 MIME 类型。
   */
  updateData: (data: SupportedDataSource, fileName?: string, type?: string) => void
  /** 清理当前的 Blob URL 以释放内存。 */
  cleanup: () => void
}

/**
 * 客户端数据下载 Hook。
 * @returns 包含下载URL、文件名、数据更新函数和清理函数的对象。
 */
export function useDataDownload(): DownloadHookResult {
  const currentBlobUrl: Ref<string | null> = ref(null)
  const downloadFileName: Ref<string> = ref('download.json')

  let stopWatcher: (() => void) | null = null

  /**
   * 清理当前的 Blob URL 和所有的监听器。
   */
  const cleanup = (): void => {
    if (currentBlobUrl.value) {
      URL.revokeObjectURL(currentBlobUrl.value)
    }
    currentBlobUrl.value = null

    if (stopWatcher) {
      stopWatcher()
      stopWatcher = null
    }
  }

  /**
   * 核心逻辑：将数据转换为 Blob URL
   * @param data 要下载的原始数据（已解包）
   * @param type Blob 的 MIME 类型 (仅当 data 不是 Blob 时使用)
   */
  const generateBlobUrl = (data: any, type = 'application/json'): void => {
    // 每次生成新的 URL 前，先清理旧的 URL
    if (currentBlobUrl.value) {
      URL.revokeObjectURL(currentBlobUrl.value)
    }

    let blob: Blob

    // --- 核心优化逻辑：判断数据类型 ---
    if (data instanceof Blob) {
      // 1. 如果数据已经是 Blob，直接使用
      blob = data
    } else if (data instanceof ArrayBuffer) {
      // 2. 如果是 ArrayBuffer，将其封装为 Blob
      // 注意：此时需要依赖传入的 MIME type
      blob = new Blob([data], { type })
    } else if (typeof data === 'object' && data !== null) {
      // 3. 如果是对象/数组，默认进行 JSON 序列化
      const blobData = JSON.stringify(data, null, 2)
      blob = new Blob([blobData], { type })
    } else {
      // 4. 其它类型 (如 string, number)，直接转为字符串后封装
      const blobData = String(data)
      blob = new Blob([blobData], { type })
    }
    // ------------------------------------

    currentBlobUrl.value = URL.createObjectURL(blob)
  }

  const updateData = (
    data: SupportedDataSource,
    fileName = 'data.json',
    type = 'application/json'
  ): void => {
    downloadFileName.value = fileName

    if (stopWatcher) {
      stopWatcher()
      stopWatcher = null
    }

    // 检查数据是否为 Vue 的 Ref 对象
    if (ref(data).value !== data) {
      const dataRef = data as Ref<any>

      // 首次生成 URL
      generateBlobUrl(unref(dataRef), type)

      // 监听 Ref 变化
      stopWatcher = watch(
        dataRef,
        (newVal) => {
          generateBlobUrl(newVal, type)
        },
        { deep: true, immediate: false }
      )
    } else {
      // 传入的是普通数据 (包括 Blob, ArrayBuffer, Object, String 等)，直接生成 URL
      generateBlobUrl(data, type)
    }
  }

  onUnmounted(() => {
    cleanup()
  })

  return {
    downloadUrl: currentBlobUrl,
    downloadFileName,
    updateData,
    cleanup
  }
}

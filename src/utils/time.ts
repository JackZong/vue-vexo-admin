

import { DateTime } from 'luxon'

import useUserStore from '@/stores/modules/user'

/**
 * 获取当前时区
 *
 * @returns {string} 当前时区的名称
 */
export function getCurrentZone(): string {
  const userStore = useUserStore()
  const zone = userStore.zone
  return zone || 'local'
}

/**
 * 获取当前时间的格式化字符串或时间戳
 *
 * 此函数根据指定的格式和时区返回当前时间它可以返回ISO格式的时间字符串、时间戳或自定义格式的时间字符串
 * 主要用途包括：
 * - 获取当前时间的ISO格式字符串，用于国际标准化时间表示
 * - 获取当前时间的时间戳，用于计算或存储时间数据
 * - 根据自定义格式获取当前时间的字符串表示，用于显示或其他目的
 *
 * @param format 时间格式，默认为'yyyy-MM-dd HH:mm:ss'它可以是具体的格式字符串、'iso'、或'timestamp'
 * @param zone 时区设置，默认为'local'，即本地时区如果指定其他时区，需传入相应的时区字符串
 * @returns 根据格式参数的不同，返回值可以是字符串或数字如果格式参数是'iso'，返回ISO格式的时间字符串；
 * 如果格式参数是'timestamp'，返回当前时间的时间戳；否则，返回根据指定格式格式化后的时间字符串
 */
export function getNow(
  format: 'iso' | 'timestamp' | string = 'yyyy-MM-dd HH:mm:ss',
  zone: string | undefined = undefined
): string | number {
  const timeZone = zone || getCurrentZone()
  const now = timeZone === 'local' ? DateTime.local() : DateTime.now().setZone(timeZone)

  if (format === 'iso') return now.toISO() || ''
  if (format === 'timestamp') return now.toMillis()

  return now.toFormat(format)
}

/**
 * 将 ISO 时间字符串转换为指定时区格式化时间（默认本地时区）
 * @param isoString ISO格式时间
 * @param zone 时区标识（如 'Asia/Shanghai'），默认 'local'
 * @param format 输出格式，默认 'yyyy-MM-dd HH:mm:ss'
 * @returns 格式化后的时间字符串
 */
export function formatTime(
  isoString: string,
  zone: string | undefined = undefined,
  format = 'yyyy-MM-dd HH:mm:ss'
): string {
  if (!isoString) return ''
  try {
    let dt = DateTime.fromISO(isoString)

    const timeZone = zone || getCurrentZone()

    dt = timeZone === 'local' ? dt.toLocal() : dt.setZone(timeZone)

    return dt.toFormat(format)
  } catch (e) {
    console.error('时间格式化失败:', e)
    return isoString
  }
}

/**
 * 将本地格式时间（如 yyyy-MM-dd HH:mm:ss）转为 ISO 字符串
 * @param timeStr 时间字符串
 * @param format 格式（默认：'yyyy-MM-dd HH:mm:ss'）
 * @param zone 时区（默认使用当前本地时区）
 * @returns ISO 8601 格式字符串
 */
export function formatToISO(
  timeStr: string,
  zone: string | undefined = undefined,
  format = 'yyyy-MM-dd HH:mm:ss'
): string {
  const timeZone = zone || getCurrentZone()
  const dt =
    timeZone === 'local'
      ? DateTime.fromFormat(timeStr, format).toUTC()
      : DateTime.fromFormat(timeStr, format, { zone }).toUTC()

  return dt.isValid ? dt.toISO() : ''
}

/**
 * 根据指定的天数偏移量，返回格式化后的日期或时间戳
 * 此函数允许开发者指定相对于当前日期的天数偏移量，并以多种格式返回结果
 * 它还支持本地时区和其他时区的切换
 *
 * @param daysOffset 天数的偏移量，正数表示未来日期，负数表示过去日期
 * @param zone 时区设置，默认为'local'（本地时区）
 * @param format 返回日期的格式，默认为自定义格式'yyyy-MM-dd HH:mm:ss'
 *               可选值包括'iso'（ISO格式）和'timestamp'（时间戳）
 * @returns 根据format参数的不同，返回字符串格式的日期或数字格式的时间戳
 */
export function getDateWithOffset(
  daysOffset: number,
  zone: string | undefined = undefined,
  format: 'iso' | 'timestamp' | string = 'yyyy-MM-dd HH:mm:ss'
): string | number {
  const timeZone = zone || getCurrentZone()
  const dt = timeZone === 'local' ? DateTime.local() : DateTime.now().setZone(timeZone)
  const target = dt.plus({ days: daysOffset })

  if (format === 'iso') return target.toISO() || ''
  if (format === 'timestamp') return target.toMillis()

  return target.toFormat(format)
}

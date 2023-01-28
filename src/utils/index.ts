/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string}
 */
export function parseTime(time: string | number | Date, cFormat: string): string {
  if (arguments.length === 0) {
    return ''
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (typeof time === 'string' && /^[0-9]+$/.test(time)) {
      time = parseInt(time)
    }
    if (typeof time === 'number' && time.toString().length === 10) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time: string | number | Date, option: string): string {
  if (('' + time).length === 10) {
    time = parseInt(time as string) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d.getMilliseconds()) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url: string): any {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"').replace(/\+/g, ' ') +
      '"}'
  )
}
export function isEmpty(val: string | number | null | undefined, includeZero = false): boolean {
  return val === '' || val === null || val === undefined || (includeZero && val === 0)
}

// 递归实现一个深拷贝
export function deepClone(source: Record<string, unknown> | Array<unknown>): Record<string, unknown> | Array<unknown> {
  if (!source || typeof source !== 'object') {
    throw new Error('error arguments shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

export function formatDate(date: any) {
  const timeArrive = Number(date)
  const timeNow = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000
  const timeDiffer = timeNow - timeArrive

  const dateVal = new Date(Number(date))
  const YY = dateVal.getFullYear() + '-'
  const MM = (dateVal.getMonth() + 1 < 10 ? '0' + (dateVal.getMonth() + 1) : dateVal.getMonth() + 1) + '-'
  const DD = dateVal.getDate() < 10 ? '0' + dateVal.getDate() : dateVal.getDate()
  const hh = (dateVal.getHours() < 10 ? '0' + dateVal.getHours() : dateVal.getHours()) + ':'
  const mm = dateVal.getMinutes() < 10 ? '0' + dateVal.getMinutes() : dateVal.getMinutes()
  const ss = dateVal.getSeconds() < 10 ? '0' + dateVal.getSeconds() : dateVal.getSeconds()

  if (timeDiffer >= 0 && timeDiffer <= 86400000) {
    return '今天' + hh + mm
  } else if (timeDiffer > -86400000 && timeDiffer < 0) {
    return '明天' + hh + mm
  } else {
    return MM + DD + ' ' + hh + mm
  }
}

export function formatDate1(date: any, options: number) {
  const dateVal = new Date(date)
  const YY = dateVal.getFullYear() + '-'
  const MM = (dateVal.getMonth() + 1 < 10 ? '0' + (dateVal.getMonth() + 1) : dateVal.getMonth() + 1) + '-'
  const DD = dateVal.getDate() < 10 ? '0' + dateVal.getDate() : dateVal.getDate()
  const hh = (dateVal.getHours() < 10 ? '0' + dateVal.getHours() : dateVal.getHours()) + ':'
  const mm = dateVal.getMinutes() < 10 ? '0' + dateVal.getMinutes() + ':' : dateVal.getMinutes() + ':'
  const ss = dateVal.getSeconds() < 10 ? '0' + dateVal.getSeconds() : dateVal.getSeconds()

  if (options === 1) {
    return YY + MM + DD + ' ' + hh + mm + ss
  } else if (options === 3) {
    return hh + mm + ss
  } else {
    return MM + DD
  }
}

export function timeLenght(time: number) {
  // time为毫秒数
  const day = Math.floor(time / 86400000) // 天
  const hours = Math.floor((time % 86400000) / 3600000) // 时
  const minutes = Math.floor((time % 3600000) / 60000) // 分

  const resultDay = day === 0 ? '' : day + '天'
  const resultHour = hours === 0 ? '' : hours + '小时'
  const resultMinute = minutes + '分钟'

  return resultDay + resultHour + resultMinute
}

export function timeLenghtArr(time: number) {
  // time为毫秒数
  const day = Math.floor(time / 86400000) // 天
  const hours = Math.floor((time % 86400000) / 3600000) // 时
  const minutes = Math.floor((time % 3600000) / 60000) // 分

  const resultDay = day === 0 ? '' : day
  const resultHour = hours === 0 ? '' : hours + day * 24
  const resultMinute = minutes.toString()

  return [resultHour.toString(), resultMinute]
}

export function valueFormat(value: number) {
  if (value === null) {
    return '0'
  }
  let result = ''
  const index = value.toString().indexOf('.')
  if (index > -1) {
    result = valueHandle(value)
  } else {
    if (value >= 10000) {
      result = valueHandle(value)
    } else {
      return Number(value).toFixed(0).toString()
    }
  }

  return result
}

function valueHandle(value: number) {
  if (value > 10000) {
    let result = (value / 10000).toString()
    result = Number(result).toFixed(2)
    const index = result.toString().indexOf('.')
    if (result.substring(0, index).length < 3) {
      result = Number(result).toFixed(2)
    } else if (result.substring(0, index).length === 3) {
      result = Number(result).toFixed(1)
    } else if (result.substring(0, index).length === 4) {
      result = Number(result).toFixed(0)
    } else {
      result = (value / 10000).toString()
      result = Number(result).toFixed(2)
      if (result.length > 4) {
        result = Number(result).toFixed(0)
      } else {
        result = Number(result).toFixed(2)
      }
    }
    return result.toString()
  } else {
    return Number(value).toFixed(0).toString()
  }
}

export function getWeekDate() {
  const now = new Date()
  const day = now.getDay()
  const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const week = weeks[day]
  return week
}

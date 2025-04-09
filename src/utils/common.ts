import dayjs from 'dayjs'
import { compile, pathToRegexp } from 'path-to-regexp'

import {
  API_ROUTE_TYPE,
  DATE_FORMAT,
  PAGE_ROUTER_TYPE,
  RouteParams,
} from '@/constants'

/* eslint-disable @typescript-eslint/no-explicit-any */
export const isEmptyObject = (obj: any) =>
  [Object, Array].includes(obj?.constructor) &&
  !Object.entries(obj || {}).length

export const filterObject = (obj: any, predicate: any) =>
  Object.fromEntries(Object.entries(obj).filter(predicate))

export const isEmpty = (value: any) =>
  value === undefined ||
  value === null ||
  value?.length === 0 ||
  value === false ||
  value === '' ||
  isEmptyObject(value)

/**
 * Select file(s).
 * @param {String} acceptType The content type of files you wish to select. For instance, use "image/*" to select all types of images.
 * @param {Boolean} multiple Indicates if the user can select multiple files.
 * @returns {Promise<File|File[]>} A promise of a file or array of files in case the multiple parameter is true.
 */
export const getFiles = (acceptType?: string, multiple?: boolean) => {
  return new Promise((resolve) => {
    const input = window.document.createElement('input')
    input.type = 'file'
    input.multiple = multiple || false
    input.accept = acceptType || 'image/*'

    input.onchange = () => {
      const files = Array.from(input.files || [])
      if (multiple) resolve(files)
      else resolve(files[0])
    }

    input.click()
  })
}

export const formatPhoneNumber = (value: string) => {
  if (!value) return value

  // Remove all non-numeric characters
  const phoneNumber = value.replace(/\D/g, '')

  if (phoneNumber.length === 9) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')
  } else if (phoneNumber.length === 10) {
    return phoneNumber.replace(/(\d{3})(\d{}3)(\d{4})/, '$1-$2-$3')
  } else {
    return phoneNumber
  }
}

export function removeZeroFirst(num: string) {
  if (num === '') {
    return num
  }
  const arr = num.split('')

  if (arr[0] === '0') {
    const indexdiff = arr.findIndex(
      (char, index) => index !== 0 && char !== '0',
    )
    if (indexdiff === -1) {
      return num
    }

    arr.splice(0, 1)
  }
  return arr.join('')
}

export function numberWithSpace(
  x: number | string | undefined,
  type = ' ',
): string {
  if (!x) {
    return '0'
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, type)
}

export function numberWithCommas(
  x: number | string | undefined,
  type = ',',
): string {
  if (!x) {
    return '0'
  }
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, type)
}

export const queryToString = (query: Record<string, string>) => {
  let result = '?'
  try {
    Object.keys(query).forEach((q) => {
      const key = q as keyof typeof query
      if (query[key]) {
        result += `${q}=${encodeURIComponent(query[key]!)}&`
      }
    })
  } catch (error) {
    console.log(error)
  }

  return result.substring(0, result.length - 1)
}

export const queryToObject = (search: string) => {
  const params: Record<string, string | number> = {}
  const keywords = search.split('?')[1]?.split('&')

  keywords.forEach((keyword) => {
    const [key, value] = keyword.split('=')
    const decodedValue = decodeURIComponent(value)

    if (
      ['page', 'limit'].some((ele) =>
        key.toLowerCase().includes(ele.toLowerCase()),
      )
    ) {
      params[key] = parseInt(decodedValue, 10)
    } else {
      params[key] = decodedValue
    }
  })

  return params
}

export const formatDate = (
  date?: Date | null | string,
  type?: keyof typeof DATE_FORMAT,
) => {
  if (!date) {
    return '-'
  }
  if (type) {
    return dayjs(date).format(DATE_FORMAT[type])
  }
  return dayjs(date).format(DATE_FORMAT.DATE)
}

export const pathToUrl = (
  url: API_ROUTE_TYPE | PAGE_ROUTER_TYPE,
  params: RouteParams<PAGE_ROUTER_TYPE> | RouteParams<API_ROUTE_TYPE>,
) => {
  const { keys } = pathToRegexp(url)
  // check keys in url has value in params object
  if (keys.every((key: any) => (params as any)[key.name])) {
    // Instead remove unnecessary property in params object, i create a new one and assign the needed key
    const newParams: any = {}
    keys.map((key: any) => {
      const value = (params as any)[key.name]
      newParams[key.name] = typeof value === 'number' ? String(value) : value
    })
    return compile(url)(newParams)
  }
  return ''
}

export const routerBlank = (router: string) => {
  const newWindow = window.open(router, '_blank')
  newWindow?.focus()
}

export const maskText = ({
  input,
  visibleStart = 3,
  visibleEnd = 2,
  maskChar = '*',
}: {
  input: string
  visibleStart?: number
  visibleEnd?: number
  maskChar?: string
}) => {
  if (input.length <= visibleStart + visibleEnd) return input

  const start = input.slice(0, visibleStart)
  const end = input.slice(-visibleEnd)
  const masked = maskChar.repeat(input.length - visibleStart - visibleEnd)
  return `${start}${masked}${end}`
}

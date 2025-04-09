export const __IS_DEV__ = import.meta.env.DEV

export const FILE_TYPE = {
  IMAGE: 'image/png,image/jpeg,image/jpg',
  VIDEO: '.gltf,.glb,.webm,.mp4,.m4v,.gov,.ocg,.gif',
  EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ZIP: 'zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed',
}

export const MAX_FILE_SIZE = 25 * 1024 * 1024

export const PAGE_SIZE_OPTIONS = [
  {
    label: '10',
    value: '10',
  },
  {
    label: '30',
    value: '30',
  },
  {
    label: '50',
    value: '50',
  },
]

export const DEFAULT_PAGE = 1

export const THEME_OPTIONS = {
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system',
} as const

export const COOKIE_LOCALE_NAME = 'NEXT_LOCALE'

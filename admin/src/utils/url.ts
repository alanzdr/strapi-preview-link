import type { IPreviewLinkConfig } from "strapi-preview-link/types"

interface IGenerateProps {
  uid: string,
  data: any,
  config: IPreviewLinkConfig,
  isDraft: boolean
}

const getContentType = (uid: string, config: IPreviewLinkConfig) => {
  if (!config) return null;
  return config.contentTypes?.find((ct) => ct.api === uid)
}

const replaceString = (value: string, data: any) => {
  return String(value).replace(/{(.*?)}/g, (dataKey) => {
    const dataValue = data[dataKey.replace(/[{}]/g, '')]

    if (!dataValue) return ''

    if (typeof dataValue === 'object' || Array.isArray(dataValue)) {
      return JSON.stringify(dataValue)
    }

    return String(dataValue)
  })
}

export const generatePreviewUrl = ({uid, data, config, isDraft}: IGenerateProps) => {
  if (!data.id || !config || !isDraft) return null;

  const contentType = getContentType(uid, config);

  if (!contentType || !contentType.preview || !contentType.preview.url) {
    return null
  }

  const { url, params } = contentType.preview

  const queryObject = {
    id: data.id,
    preview: '1',
    api: contentType.api,
    token: config.token,
  }

  if (typeof params === 'object') {
    for (const [key, value] of Object.entries(params)) {
      const param = replaceString(value, data)
      queryObject[key] = param
    }
  }
  
  const generatedUrl = new URL(replaceString(url, data))

  generatedUrl.search = new URLSearchParams(queryObject).toString()
  
  return generatedUrl.toString()
}

export const generateLiveUrl = ({uid, data, config, isDraft}: IGenerateProps) => {
  if (!data.id || !config) return null;

  const contentType = getContentType(uid, config);

  if (!contentType || !contentType.live || !contentType.live.url || !data.id) {
    return null
  }

  if (isDraft && !data.publishedAt) {
    return null
  }

  const { url, params } = contentType.live
  const queryObject = {}

  if (typeof params === 'object') {
    for (const [key, value] of Object.entries(params)) {
      const param = replaceString(value, data)
      queryObject[key] = param
    }
  }
  
  const generatedUrl = new URL(replaceString(url, data))

  generatedUrl.search = new URLSearchParams(queryObject).toString()
  
  return generatedUrl.toString()
}
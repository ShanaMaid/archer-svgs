const locale = {
  action: {
    en: 'Action',
    'zh-CN': '操作',
  },
  start: {
    en: 'Start Prefetch',
    'zh-CN': '开始预加载',
  },
  clear: {
    en: 'Clear Cache',
    'zh-CN': '清空本地缓存',
  },
  config: {
    en: 'Config',
    'zh-CN': '配置',
  },
  summary: {
    en: 'Total Svg',
    'zh-CN': '可加载svg总数',
  },
  maxSize: {
    en: 'max-size of cache',
    'zh-CN': '最大缓存空间',
  },
  loadingCount: {
    en: 'number of loading svg',
    'zh-CN': 'svg加载个数',
  },
  cacheCount: {
    en: 'max-number of caching svg',
    'zh-CN': '最大缓存svg个数',
  },
  apply: {
    en: 'Apply',
    'zh-CN': '应用',
  },
  downloadProgress: {
    en: 'Download Progress',
    'zh-CN': '下载进度',
  },
  downloadSingle: {
    en: 'Download Single Svg',
    'zh-CN': '下载单个svg',
  },
  currentList: {
    en: 'Current List Of Caching Svg',
    'zh-CN': '当前已经缓存svg列表',
  }
}

export type LANGUAGE = 'en' | 'zh-CN';

const languages = [
  {
    text: 'English',
    value: 'en',
  },
  {
    text: '简体中文',
    value: 'zh-CN'
  },
];

export {
  languages,
}

export default locale;

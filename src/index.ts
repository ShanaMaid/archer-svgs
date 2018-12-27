const LOCAL_STORAGE_KEY = 'archer-svgs-config';
const LOCAL_STORAGE_CAHCHE_KEY = 'archer-svgs-cache';

interface ISVG {
  [index: string]: {
    version: number | string; // svg图标版本号
    url: string; // svg地址
  }
}

interface IConfig {
  svgs: ISVG;
}

interface ILocalCache {
  [index: string]: string;
}

const { parse, stringify } = JSON;

class Archer {
  // 是否处于预加载状态
  isPrefetch = false;
  prefetchQueue: string[] = [];

  // 配置
  config: IConfig;
  
  getCache: () => ILocalCache = () => {
    const v = localStorage.getItem(LOCAL_STORAGE_CAHCHE_KEY);
    return v ? parse(v) : {};
  }

  setCache = (cache: ILocalCache) => {
    localStorage.setItem(LOCAL_STORAGE_CAHCHE_KEY, stringify(cache));
  }

  // 从localStorage里获取配置
  getCfgFromStorage: () => IConfig = () => {
    const v = localStorage.getItem(LOCAL_STORAGE_KEY);
    return parse(v!);
  }

  // 设置cfg到localstorage
  setCfgToStorage = (cfg: IConfig) => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, stringify(cfg));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // 设置单例中的配置
  setConfig = (cfg: IConfig) => {
    const localCfg = localStorage.getItem(LOCAL_STORAGE_KEY);

    // 对localStorage中的config进行初始化
    if (!localCfg) {
      this.setCfgToStorage(cfg);
    }
    this.config = cfg;
  };

  // 开启预下载  一般配置在onload后
  startPreFetch = async () => {
    if (this.isPrefetch) {
      throw(new Error('prefetching!'));
    }
    this.isPrefetch = true;
    const keys = Object.keys(this.config.svgs);

    // 没有需要预加载的内容
    if (keys.length === 0) {
      this.isPrefetch = false;
      return;
    } else {
      this.prefetchQueue = keys;
      await this.popQueue();
    }
  }

  // 下载svg
  fetchSvg = (url: string) => {
    return fetch(url).then((r) => {
      if (r.status === 200) {
        return r.text();
      }
      return '';
    });
  }

  // svg下载队列队列 - 出队
  popQueue = async () => {
    if (this.prefetchQueue.length === 0) {
      this.isPrefetch = false;
      return;
    }
    await this.downloadSvg(this.prefetchQueue[0]);
    this.prefetchQueue.shift();
    await this.popQueue();
    return true;
  }

  // 下载单个svg
  downloadSvg = async (name: string) => {
    const localCfg = this.getCfgFromStorage();
    const localSvg = localCfg.svgs[name];
    const cfgSvg = this.config.svgs[name];
    const content = this.getCache();

    if (!cfgSvg) {
      throw(`no ${name} svg in config! please check it!`);
    }

    // svg的信息和地址均匹配
    if (localSvg.url === cfgSvg.url && localSvg.version === cfgSvg.version) {
      if (content[name]) {
        // localstorage里有缓存，直接走缓存
        return content[name];
      } else {
        // 没有缓存，继续往下走，重新下载
      }
    } else {
      // 用cfg的配置覆盖localStorage的配置
      localCfg.svgs[name] = cfgSvg;
      this.setCfgToStorage(localCfg);
    }

    const url = cfgSvg.url;
    const svg = await this.fetchSvg(url);
    content[name] = svg;
    this.setCache(content);
    return svg;
  }

  // 清除所有svg cache
  clearSvgCache = () => {
    localStorage.setItem(LOCAL_STORAGE_CAHCHE_KEY, '{}');
  }
}


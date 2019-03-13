export interface IConfig {
  [index: string]: string;
}


class Archer {
  // 是否处于预加载状态
  isPrefetch = false;
  prefetchQueue: string[] = []; // svg预加载队列
  
  // 图标名称 -> 资源地址映射
  config: IConfig = {};

  // 内存缓存svg
  svgCaches: {[index: string]: string} = {};

  // 并发下载数
  private threadNum = 2;

  set = (config: IConfig) => {
    this.config = config;
  }

  add = (config: IConfig) => {
    this.config = Object.assign({}, this.config, config);
  }

  // 开启预下载  一般配置在onload后
  startPreFetch = async () => {
    if (this.isPrefetch) {
      throw(new Error('prefetching!'));
    }
    this.isPrefetch = true;
    const keys = Object.keys(this.config);

    // 没有需要预加载的内容
    if (keys.length === 0) {
      this.isPrefetch = false;
    } else {
      this.prefetchQueue = keys;
      await this.popQueue();
    }
    return true;
  }

  // 下载svg
  fetchSvg = async (url: string) => {
    return await new Promise<string>((r) => {
      if (url in this.svgCaches) {
        r(this.svgCaches[url]);
        return;
      }
      const xhr = new XMLHttpRequest();
      xhr.open('GET', url);
      xhr.send();
      xhr.onreadystatechange =  () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
          const svg = xhr.responseText;
          this.svgCaches[url] = svg;
          r(xhr.responseText);
        } else if (xhr.readyState == 4 && xhr.status !== 200) {
          r('');
        }
      }
    })
  }

  // svg下载队列队列 - 出队
  popQueue = async () => {
    if (this.prefetchQueue.length === 0) {
      this.isPrefetch = false;
      return;
    }
    const temp = this.prefetchQueue.splice(0, this.threadNum);
    await Promise.all(temp.map(this.downloadSvg));
    await this.popQueue();
    return true;
  }

  // 下载单个svg
  downloadSvg = async (name: string) => {
    const url = this.config[name];
    if (!url) {
      throw(new Error(`svg ${name} does not exist`));
    }
    return await this.fetchSvg(url);
  }

  // 修改并发下载数
  setThreadNum = (num: number) => {
    this.threadNum = num;
  }
}

export default Archer;
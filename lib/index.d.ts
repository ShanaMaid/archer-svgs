interface ISVG {
    [index: string]: {
        version: number | string;
        url: string;
        cache?: boolean;
    };
}
interface IConfig {
    svgs: ISVG;
}
interface ILocalCache {
    [index: string]: string;
}
declare const parse: (text: string, reviver?: ((key: any, value: any) => any) | undefined) => any, stringify: {
    (value: any, replacer?: ((key: string, value: any) => any) | undefined, space?: string | number | undefined): string;
    (value: any, replacer?: (string | number)[] | null | undefined, space?: string | number | undefined): string;
};
declare class Archer {
    LOCAL_STORAGE_KEY: string;
    LOCAL_STORAGE_CAHCHE_KEY: string;
    isPrefetch: boolean;
    prefetchQueue: string[];
    max: number;
    config: IConfig;
    getCache: () => ILocalCache;
    setCache: (cache: ILocalCache) => void;
    getCfgFromStorage: () => IConfig;
    setCfgToStorage: (cfg: IConfig) => boolean;
    setConfig: (cfg: IConfig) => void;
    startPreFetch: () => Promise<void>;
    fetchSvg: (url: string) => Promise<string>;
    popQueue: () => Promise<true | undefined>;
    downloadSvg: (name: string) => Promise<string>;
    clearSvgCache: () => void;
    setMax: (max: number) => void;
}

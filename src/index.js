"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var LOCAL_STORAGE_KEY = 'archer-svgs-config';
var LOCAL_STORAGE_CAHCHE_KEY = 'archer-svgs-cache';
var parse = JSON.parse, stringify = JSON.stringify;
var Archer = /** @class */ (function () {
    function Archer() {
        var _this = this;
        // 是否处于预加载状态
        this.isPrefetch = false;
        this.prefetchQueue = [];
        this.getCache = function () {
            var v = localStorage.getItem(LOCAL_STORAGE_CAHCHE_KEY);
            return v ? parse(v) : {};
        };
        this.setCache = function (cache) {
            localStorage.setItem(LOCAL_STORAGE_CAHCHE_KEY, stringify(cache));
        };
        // 从localStorage里获取配置
        this.getCfgFromStorage = function () {
            var v = localStorage.getItem(LOCAL_STORAGE_KEY);
            return parse(v);
        };
        // 设置cfg到localstorage
        this.setCfgToStorage = function (cfg) {
            try {
                localStorage.setItem(LOCAL_STORAGE_KEY, stringify(cfg));
                return true;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        };
        // 设置单例中的配置
        this.setConfig = function (cfg) {
            var localCfg = localStorage.getItem(LOCAL_STORAGE_KEY);
            // 对localStorage中的config进行初始化
            if (!localCfg) {
                _this.setCfgToStorage(cfg);
            }
            _this.config = cfg;
        };
        // 开启预下载  一般配置在onload后
        this.startPreFetch = function () { return __awaiter(_this, void 0, void 0, function () {
            var keys;
            return __generator(this, function (_a) {
                if (this.isPrefetch) {
                    throw (new Error('prefetching!'));
                }
                this.isPrefetch = true;
                keys = Object.keys(this.config.svgs);
                // 没有需要预加载的内容
                if (keys.length === 0) {
                    this.isPrefetch = false;
                    return [2 /*return*/];
                }
                else {
                    this.prefetchQueue = keys;
                    this.popQueue();
                }
                return [2 /*return*/];
            });
        }); };
        // 下载svg
        this.fetchSvg = function (url) {
            return fetch(url).then(function (r) {
                if (r.status === 200) {
                    return r.text();
                }
                return '';
            });
        };
        // svg下载队列队列 - 出队
        this.popQueue = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.prefetchQueue.length === 0) {
                            this.isPrefetch = false;
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, this.downloadSvg(this.prefetchQueue[0])];
                    case 1:
                        _a.sent();
                        this.prefetchQueue.shift();
                        this.popQueue();
                        return [2 /*return*/];
                }
            });
        }); };
        // 下载单个svg
        this.downloadSvg = function (name) { return __awaiter(_this, void 0, void 0, function () {
            var localCfg, localSvg, cfgSvg, content, url, svg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localCfg = this.getCfgFromStorage();
                        localSvg = localCfg.svgs[name];
                        cfgSvg = this.config.svgs[name];
                        content = this.getCache();
                        if (!cfgSvg) {
                            throw ("no " + name + " svg in config! please check it!");
                        }
                        // svg的信息和地址均匹配
                        if (localSvg.url === cfgSvg.url && localSvg.version === cfgSvg.version) {
                            if (content[name]) {
                                // localstorage里有缓存，直接走缓存
                                return [2 /*return*/, content[name]];
                            }
                            else {
                                // 没有缓存，继续往下走，重新下载
                            }
                        }
                        else {
                            // 用cfg的配置覆盖localStorage的配置
                            localCfg.svgs[name] = cfgSvg;
                            this.setCfgToStorage(localCfg);
                        }
                        url = cfgSvg.url;
                        return [4 /*yield*/, this.fetchSvg(url)];
                    case 1:
                        svg = _a.sent();
                        content[name] = svg;
                        this.setCache(content);
                        return [2 /*return*/, svg];
                }
            });
        }); };
    }
    return Archer;
}());
//# sourceMappingURL=index.js.map
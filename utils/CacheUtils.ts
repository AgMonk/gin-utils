interface DataWithTimestamp {
    time: number,
    data: any,
}

export class CacheUtils {
    /**
     * 如果缓存数据存在且可用，返回缓存数据，否则发送请求获取数据并存入缓存
     * @param caches 缓存Map
     * @param decode 取出缓存数据之后的解码方法
     * @param encode 保存缓存数据之前的编码方法
     * @param force 是否强制发送请求
     * @param usable 判断缓存数据是否可用的方法
     * @param requestMethod 请求方法
     * @param key 数据保存在数组中的key
     */
    static getCache = function (
        {caches, decode = (b) => b, encode = (b) => b, force = false, usable = () => true, requestMethod, key}: {
            caches: Map<any, any>,
            key: any,
            requestMethod: () => Promise<any>,
            force: boolean,
            usable?: (cache: any) => boolean,
            encode?: (cache: any) => any,
            decode?: (cache: any) => any,
        }): Promise<any> | undefined {
        const cache = caches.get(key);
        //如果缓存数据不存在，或者是强制模式，或者缓存已不可用
        if (!cache || force || !(usable(cache))) {
            return requestMethod().then(res => {
                console.debug(`保存缓存数据: key = ${key}`, res)
                caches.set(key, encode(res));
                return res;
            })
        }
        //否则取缓存数据返回
        const res = decode(cache);
        console.debug(`读取缓存数据: key = ${key}`, res)
        return new Promise((r) => r(res));
    }
    /**
     * 以时间为准判断缓存可用性
     * @param caches 缓存Map
     * @param decode 取出缓存数据之后的解码方法
     * @param force 是否强制发送请求
     * @param requestMethod 请求方法
     * @param seconds 过期时间
     * @param key 数据保存在数组中的key
     */
    static getCacheByTime = function ({caches, force = false, requestMethod, key, seconds}: {
        caches: Map<any, DataWithTimestamp>,
        key: any,
        requestMethod: () => Promise<any>,
        force: boolean,
        seconds:number,
    }) {
        function decode(cache: DataWithTimestamp) {
            return cache.data
        }

        function encode(cache: any): DataWithTimestamp {
            return {
                time: Math.floor(new Date().getTime() / 1000),
                data: cache
            }
        }

        function usable(cache: DataWithTimestamp): boolean {
            const now = Math.floor(new Date().getTime() / 1000);
            const cacheTime = cache.time;
            return now - cacheTime <= seconds;
        }

        return CacheUtils.getCache({
            caches, force, requestMethod, key,
            decode, encode, usable
        })
    }
}
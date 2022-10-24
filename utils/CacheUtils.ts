export class CacheUtils {
    static getCache = function (
        {caches, decode = (b) => b, encode = (b) => b, force, usable = () => true, requestMethod, key}: {
            //缓存Map
            caches: Map<any, any>,
            //数据保存在数组中的key
            key: any,
            //请求方法
            requestMethod: () => Promise<any>,
            //是否强制发送请求
            force: boolean,
            //判断缓存数据是否可用的方法
            usable?: ((cache: any) => boolean),
            //保存缓存数据之前的编码方法
            encode?: (cache: any) => any,
            //取出缓存数据之后的解码方法
            decode?: (cache: any) => any,
        }): Promise<any> | undefined {
        const cache = caches.get(key);
        //如果缓存数据不存在，或者是强制模式，或者缓存已不可用
        if (!cache || force || !(usable(cache))) {
            return requestMethod().then(res => {
                console.log(`保存缓存数据: key = ${key}`,res)
                caches.set(key, encode(res));
                return res;
            })
        }
        //否则取缓存数据返回
        const res = decode(cache);
        console.log(`读取缓存数据: key = ${key}`,res)
        return new Promise((r) => r(res));
    }
}
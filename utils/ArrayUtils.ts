export class ArrayUtils {
    /**
     * 去重
     * @param source 来源数组
     * @param getHash 根据数组成员生成唯一编号的方法
     */
    static distinct(source: Array<any>,getHash:(item: any)=>string): Array<any> {
        let map = new Map<string,any>();
        source.forEach(item=>{
            let hash = getHash(item);
            if (!map.has(hash)){
                map.set(hash,item);
            }
        })
        return [...map.values()];
    }
}
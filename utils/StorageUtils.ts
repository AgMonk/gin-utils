/**
 * 在Localstorage中保存对象的快捷工具
 */
export class StorageUtils {
    static storage = localStorage
    static put(key: string, value: any) {
        this.storage.setItem(key,JSON.stringify(value))
    }
    static get(key:string):object | undefined{
        let item = this.storage.getItem(key);
        if (item){
            return JSON.parse(item)
        }
        return undefined
    }
    static del(key:string){
        this.storage.removeItem(key)
    }
    static clear(){
        this.storage.clear()
    }
    /**
     * 获取指定前缀的key
     * @param prefix 前缀
     */
    static getKeyByPrefix(prefix:string):Array<string>{
        return Object.keys(this.storage).filter(key => key.startsWith(prefix))
    }

    /**
     * 获取指定前缀的value
     * @param prefix 前缀
     */
    static getValueByPrefix(prefix:string):Array<any>{
        return this.getKeyByPrefix(prefix).map(key=>this.get(key))
    }

    /**
     * 获取storage中保存数据的量
     */
    static size(){
        let size = 0;
        Object.keys(this.storage)
            .map(key=>this.storage.getItem(key))
            .forEach(item=>{
                if (item){
                    size+=item.length
                }
            })
        return size
    }
}
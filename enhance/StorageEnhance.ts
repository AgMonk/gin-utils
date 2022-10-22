/**
 * 让Storage可以直接保存对象
 */


Storage.prototype.put = function (key:string, value:any) {
    this.setItem(key, JSON.stringify(value))
}

Storage.prototype.get = function (key:string) :object|undefined{
    let item = this.getItem(key);
    if (item) {
        return JSON.parse(item)
    }
    return undefined
}
/**
 * 获取指定前缀的key
 * @param prefix 前缀
 */
Storage.prototype.getKeyByPrefix = function (prefix:string):Array<string> {
    return Object.keys(this.storage).filter(key => key.startsWith(prefix))
}
/**
 * 获取指定前缀的value
 * @param prefix 前缀
 */
Storage.prototype.getValueByPrefix = function (prefix:string) :Array<object> {
    return Object.keys(this.storage).filter(key => key.startsWith(prefix)).map(key => this.get(key))
}

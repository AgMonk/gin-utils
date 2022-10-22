//复制一个对象
export const copyObj = (obj) => JSON.parse(JSON.stringify(obj))

// 获取对象类型
export const getTypeOf = function (obj) {
    let type = Object.prototype.toString.call(obj);
    return type.replace("[object ", "").replace("]", "");
}

// 将对象转换为数组
export const obj2Array = (obj) => {
    let array = [];
    Object.keys(obj).forEach(key => {
        array.push(obj[key])
    })
    return array;
}
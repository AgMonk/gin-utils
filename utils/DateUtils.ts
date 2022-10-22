export class DateUtils {
    static format = function (date: Date, fmt: string): string {
        type group = {
            pattern:RegExp
            value:number
            maxLength:number
        }

        let groups:Array<group> = [
            {pattern:/y{1,4}/,value:date.getFullYear(),maxLength:4},
            {pattern:/M{1,2}/,value:date.getMonth()+1,maxLength:2},
            {pattern:/d{1,2}/,value:date.getDate(),maxLength:2},
            {pattern:/h{1,2}/,value:date.getHours(),maxLength:2},
            {pattern:/m{1,2}/,value:date.getMinutes(),maxLength:2},
            {pattern:/s{1,2}/,value:date.getSeconds(),maxLength:2},
            {pattern:/S{1,3}/,value:date.getMilliseconds(),maxLength:3},
        ]
        for (const groupsKey in groups) {
            let {pattern,maxLength,value} = groups[groupsKey]
            if (pattern.test(fmt)){
                fmt = fmt.replace(RegExp.$1, (value + "").substring(maxLength - RegExp.$1.length));
            }
        }

        return fmt;
    };
}
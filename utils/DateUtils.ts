export class DateUtils {
    /**
     * 从给定时间增加天
     * @param date 日期
     * @param day 天
     */
    static plusDays = function (date: Date, day: number): Date {
        return DateUtils.plusHours(date, 24 * day)
    }
/**
     * 从给定时间增加小时
     * @param date 日期
     * @param hour 小时
     */
    static plusHours = function (date: Date, hour: number): Date {
        return DateUtils.plusMinutes(date, 60 * hour)
    }

/**
     * 从给定时间增加分钟
     * @param date 日期
     * @param minute 分钟
     */
    static plusMinutes = function (date: Date, minute: number): Date {
        return DateUtils.plusSecond(date, 60 * minute)
    }

    /**
     * 从给定时间增加秒数
     * @param date 日期
     * @param second 秒
     */
    static plusSecond = function (date: Date, second: number): Date {
        return new Date(date.getTime() + second * 1000)
    }

    /**
     * 格式化输出日期
     * @param date 日期
     * @param fmt 格式 "yyyy-MM-dd" 等，默认为 "yyyy-MM-dd hh:mm:ss"
     */
    static format = function (date: Date, fmt?: string): string {
        fmt = fmt ? fmt : "yyyy-MM-dd hh:mm:ss";
        type Group = {
            pattern: RegExp
            value: string
            name: string
        }

        let groups: Group[] = [
            {pattern: /(y{1,4})/, value: date.getFullYear() + "", name: '年'},
            {pattern: /(M{1,2})/, value: date.getMonth() + 1 + "", name: '月'},
            {pattern: /(d{1,2})/, value: date.getDate() + "", name: '日'},
            {pattern: /(h{1,2})/, value: date.getHours() + "", name: '时'},
            {pattern: /(m{1,2})/, value: date.getMinutes() + "", name: '分'},
            {pattern: /(s{1,2})/, value: date.getSeconds() + "", name: '秒'},
            {pattern: /(S{1,3})/, value: date.getMilliseconds() + "", name: '毫秒'},
        ]
        for (const groupsKey in groups) {
            let {pattern, name, value} = groups[groupsKey]
            let matcher = pattern.exec(fmt)
            if (matcher) {
                //待替换的占位符
                let source = matcher[1]
                //如果占位符位数少于值位数
                if (source.length < value.length) {
                    if (name === '年') {
                        //年从前面截断
                        fmt = fmt.replace(source, value.substring(value.length - source.length))
                    } else if (name === '毫秒') {
                        //毫秒从后面截断
                        fmt = fmt.replace(source, value.substring(0, source.length))
                    } else {
                        //其他不截断
                        fmt = fmt.replace(source, value)
                    }
                } else {
                    //如果占位符位数大于等于值位数 前面补0 截断到占位符位数
                    let v = "0000" + value
                    fmt = fmt.replace(source, v.substring(v.length - source.length))

                }
            }
        }
        return fmt;
    };
}
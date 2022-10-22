export interface Url {
    protocol: string
    href: string
    host: string
    path: string
    query: Query[]
}

export interface Query {
    key: string
    value: string | number | Array<string | number>
}

/**
 * unicode编码范围
 */
class UnicodeRange {
    name: string;
    range: string[];

    /**
     * 从range中挨个取范围尝试匹配
     * @param s 单个字符
     */
    parse(s: string): string | undefined {
        for (let i = 0; i < this.range.length; i++) {
            let [min, max] = this.range[i].split("-").map(i => parseInt(i, 16))
            let code = s.charCodeAt(0);
            if (code >= min && code <= max) {
                return this.name;
            }
        }
        return undefined;
    }

    constructor(name: string, range: string[]) {
        this.name = name;
        this.range = range;
    }
}

const unicodeRanges: UnicodeRange[] = [
    //中文
    new UnicodeRange("cn", [
        "4E00-9FA5", "9FA6-9FFF", "3400-4DBF", "20000-2A6DF", "2A700-2B739", "2B740-2B81D", "2B820-2CEA1",
        "2CEB0-2EBE0", "30000-3134A", "31350-323AF", "2F00-2FD5", "2E80-2EF3", "F900-FAD9", "2F800-2FA1D",
        "E815-E86F", "E400-E5E8", "E600-E6CF", "31C0-31E3", "2FF0-2FFB", "3105-312F", "31A0-31BA",
    ]),
    //日文
    new UnicodeRange("jp", ["3040-309F", "30A0-30FF", "31F0-31FF"]),
    //英文
    new UnicodeRange("en", ["0041-005A", "0061-007A"]),
    //数字
    new UnicodeRange("number", ["0030-0039"]),
    //韩朝
    new UnicodeRange("ko", ["1100-11FF", "3130-318F", "AC00-D7AF"]),
]

interface Language {
    cn: number;
    ko: number;
    jp: number;
    en: number;
    unknown: number;
}

export class StringUtils {
    /**
     * 反转义
     * @param text 待转义字符串
     */
    static unEscape = function (text: string): string | null {
        let temp: HTMLDivElement | undefined = document.createElement("div");
        temp.innerHTML = !text ? "" : text
            .replace(/<br\/>/g, '\n');
        return temp.innerText || temp.textContent;
    }
    /**
     * 解析一个URL
     * @param fullUrl url
     */
    static parseUrl = function (fullUrl: string): Url {
        let [url, search] = fullUrl.split('?')
        let protocol = url.substring(0, url.indexOf(":"))
        url = url.substring(url.indexOf("//") + 2)
        let host = url.substring(0, url.indexOf("/"))
        let path = url.substring(url.indexOf("/"))

        let query: Query[] = []
        let parseValue = function (value: string): string | number {
            return isNaN(Number(value)) ? value : Number(value);
        }

        search.split("&")
            .forEach(item => {
                const [key, value] = item.split("=");
                if (key.endsWith("[]")) {
                    //如果以[]结尾，认为是重复参数，查询可能存在的组
                    let dest = query.filter(i => i.key === key)[0];
                    if (dest) {
                        (<Array<string | number>>dest.value).push(value)
                    } else {
                        query.push({key, value: [parseValue(value)]})
                    }
                } else {
                    //独立参数，直接添加
                    query.push({key, value: parseValue(value)})
                }
            })
        return {protocol, host, href: fullUrl, path, query,}
    }
    /**
     * 解码unicode 各语言范围: https://baike.baidu.com/item/%E7%BB%9F%E4%B8%80%E7%A0%81/2985798
     * @param str 字符串
     */
    static decodeUnicode = function (str: string): string {
        return str.replace(/&#(x)?([^&]{1,5});?/g, function ($, $1, $2) {
            return String.fromCharCode(parseInt($2, $1 ? 16 : 10));
        });
    }
    /**
     * 编码unicode
     * @param str 字符串
     * @param radix 是否转换为16进制
     */
    static encodeUnicode = function (str: string, radix?: 16 | 10): string {
        let s = "";
        for (let i = 0; i < str.length; i++) {
            s += `&#${radix === 16 ? 'x' : ''}${str.charCodeAt(i).toString(radix)};`
        }
        return s;
    }
    /**
     * 识别几种常用字符:中、日、韩、英、数字
     * @param str 字符
     */
    static language = function (str: string): string {
        for (let i = 0; i < unicodeRanges.length; i++) {
            let item = unicodeRanges[i]
            let parse = item.parse(str);
            if (parse){
                return parse;
            }
        }
        return "other";
    }
}
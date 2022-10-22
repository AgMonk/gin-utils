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
}
// document工具类

export class DomUtils {
    //获取屏幕信息，客户端宽度，滚动位置
    static getScreenInfo() {
        const {body} = document
        const {clientWidth, clientHeight, clientLeft, clientTop, scrollWidth, scrollHeight} = body

        const clientInfo = {clientWidth, clientHeight, clientLeft, clientTop}
        const scrollInfo = {scrollWidth, scrollHeight}

        return {clientInfo, scrollInfo};
    }
    /**
     * 滚动y轴
     * @param y 距离
     */
    static scrollY(y: number) {
        document.documentElement.scrollTop += y
        document.body.scrollTop += y
    }

    /**
     * 滚动到底部
     */
    static scrollYToBottom() {
        document.documentElement.scrollTop = document.documentElement.scrollHeight - document.documentElement.clientHeight
        document.body.scrollTop = document.body.scrollHeight - document.body.clientHeight
    }

    /**
     * 滚动到顶部
     */
    static scrollYToTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}
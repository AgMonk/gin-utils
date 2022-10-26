// document工具类

import {InsertParam, StringUtils} from "./StringUtils";

export interface ScreenInfo {
    clientInfo: { clientWidth: number, clientHeight: number, clientLeft: number, clientTop: number },
    scrollInfo: { scrollWidth: number, scrollHeight: number }
}

export class DomUtils {
    private static screenInfo(body: HTMLElement) {
        const {clientWidth, clientHeight, clientLeft, clientTop, scrollWidth, scrollHeight} = body
        const clientInfo = {clientWidth, clientHeight, clientLeft, clientTop}
        const scrollInfo = {scrollWidth, scrollHeight}
        return {clientInfo, scrollInfo};
    }

    //获取屏幕信息，客户端宽度，滚动位置
    static getScreenInfo(): { body: ScreenInfo, documentElement: ScreenInfo } {
        const {body, documentElement} = document
        return {
            body: DomUtils.screenInfo(body),
            documentElement: DomUtils.screenInfo(documentElement),
        }
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

/**
 * 文本框工具类
 */
export class TextAreaUtils {
    /**
     * 使一个textarea获得焦点，并选中指定位置的文字
     * @param textarea textarea
     * @param start 开始位置
     * @param end 结束位置
     */
    static select(textarea: HTMLTextAreaElement, start: number, end?: number) {
        textarea.focus()
        setTimeout(() => {
            textarea.selectionStart = start
            textarea.selectionEnd = end || start
        }, 50)
    }

    /**
     * 向一个文本框中光标当前位置插入文本
     * @param textarea textarea
     * @param sourceText 原文本
     * @param prefix 前缀
     * @param suffix 后缀
     * @param callback 拼接完成后的操作(一般为更新绑定的值)
     */
    static insertText(textarea: HTMLTextAreaElement, {sourceText = textarea.value, prefix, suffix, callback}
        : { sourceText?: string, prefix: string, suffix?: string, callback: (result: string, position: number[]) => void }) {
        const {position, result} = StringUtils.insertText({
            sourceText, prefix, suffix,
            start: textarea.selectionStart, end: textarea.selectionEnd
        })
        callback(result, position)
        TextAreaUtils.select(textarea, position[1], position[2])
    }
}

export class Title {
    static suffix = "";
    static prefix = "";

    static set(text: string) {
        const p = Title.prefix ? `${Title.prefix} - ` : ''
        const s = Title.suffix ? ` - ${Title.suffix}` : ''
        document.title = p + text + s;
    }
}
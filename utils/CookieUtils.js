export class CookieUtils{
    static getMap = (cookieString = document.cookie) => {
        let map = {};
        cookieString.split("; ").forEach(line => {
            let s = line.split("=");
            map[s[0]] = s[1];
        })
        return map;
    }

    static set = (key, value, expires, path) => {
        let day = 24 * 60 * 60 * 1000;
        let date = new Date();
        date.setTime(date.getTime() + expires * day);
        document.cookie = `${key}=${value};path=${path};expires=${date.toUTCString()}`;
    }

    static get = (key) => {
        return CookieUtils.getMap()[key];
    }

    static setBatch = (cookieString, expires, path) => {
        let cookies = cookieString.split("; ");
        cookies.forEach(cookie => {
            let s = cookie.split("=");
            CookieUtils.set(s[0], s[1], expires, path)
        })
    }
}
/**
 * 时间插件
 */

const timer = {
    // 小于10的数字前面补0
    to2: (number) => (Number(number) < 10 ? `0${Number(number)}` : String(number)),

    // 获取指定时间
    time(format = "y-m-d", time = null) {
        let date = time ? new Date(time) : new Date();
        format = format.replace("y", date.getFullYear());
        format = format.replace("m", this.to2(date.getMonth() + 1));
        format = format.replace("d", this.to2(date.getDate()));
        format = format.replace("h", this.to2(date.getHours()));
        format = format.replace("i", this.to2(date.getMinutes()));
        format = format.replace("s", this.to2(date.getSeconds()));
        format = format.replace("w", date.getDay());
        return format;
    },

    // 获取当前月份有多少天
    monthLength(time = null) {
        let y = this.time("y", time) * 1;
        let m = this.to2(this.time("m", time) * 1 + 1);
        if (m == 13) {
            return 31;
        } else {
            let unix = new Date(`${y}-${m}-01`).getTime() - 24 * 60 * 60 * 1000;
            return Number(this.time("d", unix));
        }
    },

    // 获取上个月有多少天
    preMonthLenggth(time = null) {
        let y = this.time("y", time) * 1;
        let m = this.to2(this.time("m", time) * 1);
        let unix = new Date(`${y}-${m}-01`).getTime() - 24 * 60 * 60 * 1000;
        return Number(this.time("d", unix));
    },

    // 获取下个月有多少天
    nextMonthLenggth(time = null) {
        let y = this.time("y", time) * 1;
        let m = this.to2(this.time("m", time) * 1 + 2);
        let unix = new Date(`${y}-${m}-01`).getTime() - 24 * 60 * 60 * 1000;
        return Number(this.time("d", unix));
    },

    // 获取当月第一天
    monthFirst(time = null) {
        let unix = this.time("y-m", time) + "-01";
        return this.time("y-m-d", unix);
    },

    // 获取当月最后一天
    monthLast(time = null) {
        let y = this.time("y", time) * 1;
        let m = this.to2(this.time("m", time) * 1 + 1);
        let unix = new Date(`${y}-${m}-01`).getTime() - 24 * 60 * 60 * 1000;
        return this.time("y-m-d", unix);
    },

    // 获取上个月的今天
    preMonthToday(time = null) {
        let y = Number(time.substr(0, 4));
        let m = Number(time.substr(5, 2));
        let d = Number(time.substr(8));

        if (d > this.preMonthLenggth(`{y}-${m}-01`)) {
            d = this.preMonthLenggth(`{y}-${m}-01`);
        }

        if (m == 1) {
            y = y - 1;
            m = 12;
        } else {
            m = m - 1;
        }

        return `${y}-${m}-${d}`;
    },

    // 获取下个月的今天
    nextMonthToday(time = null) {
        let y = Number(time.substr(0, 4));
        let m = Number(time.substr(5, 2));
        let d = Number(time.substr(8));

        if (d > this.nextMonthLenggth(`{y}-${m}-01`)) {
            d = this.nextMonthLenggth(`{y}-${m}-01`);
        }

        if (m == 12) {
            y = y + 1;
            m = 1;
        } else {
            m = m + 1;
        }

        return `${y}-${m}-${d}`;
    },

    // 已经过去了多少时间
    timeout(time) {},

    // 倒计时
    timeRemaining(format, time) {
        time = time - parseInt(new Date().getTime() / 1000);
        return this.unixToString(format, time);
    },

    // 时间戳的差值转化为时间字符串
    unixToString(format, time) {
        let d = parseInt(time / 60 / 60 / 24);
        let h = parseInt((time - d * 86400) / 3600);
        let i = parseInt((time - d * 86400 - h * 3600) / 60);
        let s = time - d * 86400 - h * 3600 - i * 60;
        format = format.replace("d", timer.to2(timer.low(d)));
        format = format.replace("h", timer.to2(timer.low(h)));
        format = format.replace("i", timer.to2(timer.low(i)));
        format = format.replace("s", timer.to2(timer.low(s)));
        return format;
    },

    // 小于0的直接输出0
    low(num) {
        return num < 0 ? 0 : num;
    },

    // 把日期转成对象
    parse(string) {
        return new Date(string);
    },
};

export default timer;

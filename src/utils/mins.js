/**
 * 私有工具库 by mins
 */

/**
 * 时间拓展
 */
const timer = {
    /**
     * 获取时间
     * format: 输出格式，ymdhisk，默认 y-m-d h:i:s
     * time: 时间，支持时间戳、时间字符串等，默认为当前时间
     */
    time(format = "y-m-d h:i:s", time = null) {
        let date = this.parse(time);
        format = format.replace("y", date.getFullYear());
        format = format.replace("m", this.to2(date.getMonth() + 1));
        format = format.replace("d", this.to2(date.getDate()));
        format = format.replace("h", this.to2(date.getHours()));
        format = format.replace("i", this.to2(date.getMinutes()));
        format = format.replace("s", this.to2(date.getSeconds()));
        format = format.replace("w", date.getDay());
        return format;
    },
    /**
     * 获取农历
     */
    chineseDate(time) {
        let date = time ? new Date(time) : new Date();
        let dateString = date.toLocaleString("zh-CN-u-ca-chinese");
        dateString = dateString.replace(/(\d+)\s*?年/, (x, y) => {
            let result = "";
            result = "甲乙丙丁戊己庚辛壬癸".charAt((y - 4) % 10); // 天干
            result += "子丑寅卯辰巳午未申酉戌亥".charAt((y - 4) % 12); // 地支
            return result;
        });
        dateString = dateString.split(" ")[0]; // 取年月日
        let g = dateString.substr(0, 2) + "年";
        let m = dateString.substring(2, dateString.match("月").index) + "月";
        let d = dateString.match(/\d+/)[0];
        d = d < 11 ? "初" + number.toChinese(d) : number.toChinese(d);
        let animals = ["猴", "鸡", "狗", "猪", "鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊"];
        let index = date.toLocaleString("zh-CN-u-ca-chinese").substr(0, 4) % 12;
        let a = animals[index];
        return {
            g, // 干支
            m, // 月
            d, // 日
            a, // 生肖
        };
    },
    /**
     * 普通对象转为日期对象
     * time: 时间，默认为当前时间
     */
    parse(time = null) {
        return time ? new Date(time) : new Date();
    },
    /**
     * 数字补位，小于10的在前面加0
     */
    to2(number) {
        return Number(number) < 10 ? "0" + number : number;
    },
    /**
     * 获取当前时间的月份有多少天
     * time: 时间，默认为当前时间
     */
    monthCount(time = null) {
        let date = this.parse(time);

        // 当前时间的下个月一号的时间戳
        let year = date.getFullYear();
        let month = this.to2(date.getMonth() + 2);
        let nextMonthStart = this.parse(`${year}-${month}-01`).getTime() / 1000;

        // 减去24小时，即为上个月的最后一天
        let lastDate = this.parse((nextMonthStart - 24 * 60 * 60) * 1000);
        return lastDate.getDate();
    },
    /**
     * 获取当前时间的，下个月有多少天
     * 原理同上，月份再+1即可
     */
    nextMonthCount(time = null) {
        let date = this.parse(time);
        let year = date.getFullYear();
        let month = this.to2(date.getMonth() + 3);
        let nextMonthStart = this.parse(`${year}-${month}-01`).getTime() / 1000;
        let lastDate = this.parse((nextMonthStart - 24 * 60 * 60) * 1000);
        return lastDate.getDate();
    },
    /**
     * 获取当前时间的，上个月有多少天
     * 原理同上，月份再-1即可
     */
    preMonthCount(time = null) {
        let date = this.parse(time);

        // 当前时间的下个月一号的时间戳
        let year = date.getFullYear();
        let month = this.to2(date.getMonth() + 1);
        let nextMonthStart = this.parse(`${year}-${month}-01`).getTime() / 1000;

        // 减去24小时，即为上个月的最后一天
        let lastDate = this.parse((nextMonthStart - 24 * 60 * 60) * 1000);
        return lastDate.getDate();
    },
    /**
     * 倒计时
     * 到指定时间点剩余时间
     */
    timeRemaining(time, format = "d天h小时i分s秒") {
        let number = this.parse(time).getTime() / 1000 - this.parse().getTime() / 1000;
        return this.unixToString(format, number);
    },
    /**
     * 正计时
     * 到指定时间已经过去了多久时间
     */
    timePast(time, format = "d天h小时i分s秒") {
        let number = this.parse().getTime() / 1000 - this.parse(time).getTime() / 1000;
        return this.unixToString(format, number);
    },
    /**
     * 数字转化为时间字符串
     * 如：300秒，输出 0天0时05分
     */
    unixToString(format, number) {
        number = parseInt(number);
        let d = parseInt(number / 86400);
        let h = parseInt((number - d * 86400) / 3600);
        let i = parseInt((number - d * 86400 - h * 3600) / 60);
        let s = number - d * 86400 - h * 3600 - i * 60;
        format = format.replace("d", timer.to2(d));
        format = format.replace("h", timer.to2(h));
        format = format.replace("i", timer.to2(i));
        format = format.replace("s", timer.to2(s));
        return format;
    },
};

/**
 * 文件拓展
 */
const file = {
    /**
     * 获取后缀名
     */
    lastName(name) {
        return "." + name.split(".").pop();
    },
    /**
     * 获取文件类型
     */
    type(name) {
        let lastName = this.lastName(name).toLowerCase();
        let list = {
            // 视频
            ".mp4": "video",
            ".avi": "video",
            ".wmv": "video",
            ".rmvb": "video",
            ".mov": "video",
            ".m4v": "video",
            ".mkv": "video",
            ".flv": "video",
            ".3gp": "video",

            // 音频
            ".mp3": "audio",
            ".wav": "audio",
            ".midi": "audio",
            ".ape": "audio",
            ".aac": "audio",
            ".wma": "audio",

            // 图片
            ".png": "img",
            ".jpg": "img",
            ".jpeg": "img",
            ".gif": "img",
            ".bmp": "img",
            ".svg": "img",
            ".webp": "img",
        };
        return list[lastName] ?? "other";
    },
    /**
     * 生成时间戳文件名
     */
    createName(lastName) {
        return new Date().getTime() + this.lastName(lastName).toLowerCase();
    },
};

/**
 * 对象拓展
 */
const object = {
    /**
     * 深拷贝
     */
    copy(data) {
        return JSON.parse(JSON.stringify(data));
    },
    /**
     * 对象查询节点
     */
    find(object, string) {
        let tags = string.split(".");
        let tagsCopy = JSON.parse(JSON.stringify(tags));
        tagsCopy.map((item) => {
            object = object[tags[0]];
            tags.shift();
        });
        return object;
    },
};

/**
 * 数组拓展
 */
const array = {
    /**
     * 数据合计
     * data: 源数据
     * tag: 合并依据，根据此字段作为id
     * num: 计数字段，此项用来相加
     * options:
     * out: 输出的字段，k-v, k = 字段名，v = 替换字段名
     * sortBy: 按当前字段排序
     * orderBy: 排序规则，asc = 正序，desc = 倒叙,
     */
    total(data, options = {}) {
        let result = [];
        let list = [];
        let tag = options.tag || "id";
        let num = options.total || "num";

        // 列出所有的tag
        let tags = data.map((item) => item[tag]);
        tags = Array.from(new Set(tags));

        // 根据tags把数据填充到result
        data.map((item) => {
            let index = list.indexOf(item[tag]);
            if (index > -1) {
                result[index][num] += item[num];
            } else {
                list.push(item[tag]);
                result.push(item);
            }
        });

        // 输出
        if (options.out) {
            let outK = Object.keys(options.out);
            result = result.map((item) => {
                let row = {};
                outK.map((o) => {
                    if (options.out[o] == null) {
                        row[o] = item[o];
                    } else {
                        row[options.out[o]] = item[o];
                    }
                });
                return row;
            });
        }

        // 排序
        if (options.sortBy && result[0][options.sortBy]) {
            return this.objSort(result, options.sortBy, options.orderBy);
        }

        return result;
    },
    /**
     * 一维数组数字排序
     */
    sort(data, order = "asc") {
        let result = [];
        while (data.length > 0) {
            let r = order == "asc" ? this.min(data) : this.max(data);
            result.push(r.value);
            data.splice(r.index, 1);
        }
        return result;
    },
    /**
     * 数组对象排序
     */
    objSort(data, sortBy, orderBy = "asc") {
        let result = [];
        let list = this.sort(
            data.map((item) => item[sortBy]),
            orderBy
        );
        list.map((item) => {
            data.map((r) => {
                if (item == r[sortBy]) {
                    result.push(r);
                }
            });
        });
        return result;
    },
    /**
     * 获取数组中的最小值
     */
    min(data) {
        let min = object.copy(data)[0];
        let index = 0;
        data.map((item, i) => {
            if (item < min) {
                min = item;
                index = i;
            }
        });
        return {
            value: min,
            index,
        };
    },
    /**
     * 获取数组中的最大值
     */
    max(data) {
        let max = object.copy(data)[0];
        let index = 0;
        data.map((item, i) => {
            if (item > max) {
                max = item;
                index = i;
            }
        });
        return {
            value: max,
            index,
        };
    },
};

/**
 * 字符串拓展
 */
const string = {
    /**
     * 是否是合法的身份证号码
     */
    isIdcard(string) {
        let reg = new RegExp(/^[1-9]\d{5}(19|20)\d{2}((0[1-9]|1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/);
        return reg.test(string);
    },
    /**
     * 是否是合法的手机号码
     */
    isPhone(string) {
        let reg = new RegExp(/^1(3|5|6|7|8|9)\d{9}$/);
        return reg.test(string);
    },
    /**
     * 是否是合法的邮箱地址
     */
    isMail(string) {
        let reg = new RegExp(/^([0-9a-zA-Z]|-|_)+@[0-9a-z]+.[a-z]+$/);
        return reg.test(string);
    },
    /**
     * 字符串转为unicode，防止中文乱码
     */
    encodeUnicode(string) {
        let res = [];
        for (let i = 0; i < string.length; i++) res[i] = ("00" + string.charCodeAt(i).toString(16)).slice(-4);
        return "\\u" + res.join("\\u");
    },
    /**
     * unicode转字符串
     */
    decodeUnicode(string) {
        string = string.replace(/\\/g, "%");
        return decodeURI(string);
    },
};

/**
 * 数字拓展
 */
const number = {
    /**
     * 数字转金额
     */
    money(number) {},
    /**
     * 数字转中文
     */
    toChinese(number) {
        number = String(number);
        if (number.match(/\D/) || number.length >= 14) return;

        // 数字对应中文
        let zhArray = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];

        //进位填充字符，第一位是 个位，可省略
        let baseArray = ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "万"];

        // 把数字切割成数组并倒序排列，然后进行遍历转成中文
        let string = String(number)
            .split("")
            .reverse()
            .map((item, index) => {
                // 如果当前位为0，直接输出数字， 否则输出 数字 + 进位填充字符
                item = Number(item) == 0 ? zhArray[Number(item)] : zhArray[Number(item)] + baseArray[index];
                return item;
            })
            .reverse()
            .join(""); // 倒叙回来数组，拼接成字符串
        string = string.replace(/^一十/, "十"); // 如果以 一十 开头，可省略一
        string = string.replace(/零+/, "零"); // 如果有多位相邻的零，只写一个即可
        string = string.replace(/零$/, ""); // 省去最后一个零
        return string;
    },
};

/**
 * dom拓展
 */
const dom = {
    /**
     * dom 转 js对象
     */
    toObject(dom) {
        // 获取元素的属性，输出对象，如果没有属性输出null
        const getAttribute = (dom) => {
            let attributes = {};
            let empty = true;
            Array.from(dom.attributes).map((item) => {
                attributes[item.nodeName] = item.nodeValue;
                empty = false;
            });
            return empty ? null : attributes;
        };

        // 将dom转为js-dom
        const domTrans = (dom) => {
            // 总dom树
            let tree = [];

            // 递归, node = 当前的节点，dataNode = 数据插入的节点
            const loop = (node, dataNode) => {
                // 当前节点的模板
                let temp = {
                    typeName: this.nodeTypes(node.nodeType),
                    nodeType: node.nodeType,
                };

                // 如果是文本节点 或 单标签节点
                if (temp.nodeType == 3 && node.nodeValue.match(/\S/)) {
                    temp["content"] = node.nodeValue;
                    temp["tag"] = node.nodeName;
                    dataNode.push(temp);
                }

                // 元素节点
                if (temp.nodeType == 1) {
                    let attributes = getAttribute(node);

                    // 如果没有属性，不添加 attributes
                    if (attributes) temp["attributes"] = attributes;

                    // 当前节点下只有文本 或 单标签节点
                    if (node.childNodes.length <= 1) {
                        temp["content"] = node.innerHTML;
                        temp["tag"] = node.nodeName.toLowerCase();
                    }

                    // 当前节点下还有子节点
                    if (node.childNodes.length > 1) {
                        temp["children"] = [];
                        temp["tag"] = node.nodeName.toLowerCase();
                        for (let i = 0; i < node.childNodes.length; i++) {
                            loop(node.childNodes[i], temp.children);
                        }
                    }
                    dataNode.push(temp);
                }
            };
            loop(dom, tree);
            return tree[0].children;
        };
        return domTrans(dom);
    },
    /**
     * 节点类型列表
     */
    nodeTypes(type) {
        const list = [
            "",
            "元素节点",
            "属性节点",
            "文本节点",
            "字符数据节点(文本不会被解析器解析)",
            "实体引用节点",
            "实体节点",
            "处理指令节点",
            "注释节点",
            "文档节点 (DOM树的根节点)",
            "向为文档定义的实体提供接口",
            "表示邻接节点和它们的子树",
            "代表一个符号在DTD中的声明",
        ];
        return type ? list[type] : list;
    },
};

/**
 * 设备代理
 */
const agent = {
    /**
     * 获取设备类型
     * 移动端 < 200， PC > 200
     */
    device() {
        let ua = navigator.userAgent.toLowerCase();
        let code = null;
        if (ua.match("android")) code = 101; // android
        else if (ua.match("iphone")) code = 102; // iphone
        else if (ua.match("ipad") || ua.match("macintosh")) code = 103; // ipad
        else if (ua.match("intel mac")) code = 203; // apple mac
        else if (ua.match("msie")) code = 202; // IE
        else code = 201; // PC
        return code;
    },
    /**
     * 获取系统版本信息
     */
    system() {
        let ua = navigator.userAgent.toLowerCase();
        let code = null;
        if (ua.match("windows nt 5")) code = 5; // win xp
        else if (ua.match("windows nt 6.1")) code = 7; // win 7
        else if (ua.match("windows nt 6.2")) code = 8; // win 8
        else if (ua.match("windows nt 6.3")) code = 81; // win 8.1
        else if (ua.match("windows nt 10")) code = 10; // win 10
        else if (ua.match("intel mac")) code = 100; // apple mac
        else if (ua.match("x11")) code = 200; // linux
        else code = 300; // 未知系统
        return code;
    },
};

/**
 * ajax
 */
const ajax = {};

// 输出
export default {
    object,
    array,
    string,
    number,
    dom,
    agent,
    timer,
    file,
    ajax,
};

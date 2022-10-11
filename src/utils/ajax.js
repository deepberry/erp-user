/**
 * ajax 封装
 */

import { ElMessage } from "element-plus";
import { MessageBox } from "element-plus";

const HOST = "https://erp.deepberry.cn";
const ajax = {};

// ajax处理
const callback = (xhr, reslove, reject) => {
    // 状态监听
    xhr.onreadystatechange = () => {
        if (xhr.status == 200 && xhr.readyState == 4) {
            let data = JSON.parse(xhr.response);
            if (data.code == 200) {
                if (!data.data.message) {
                    reslove(data);
                } else {
                    ElMessage({
                        type: "error",
                        message: data.data.message,
                    });
                    reject(data);
                }
            } else {
                ElMessage({
                    type: "error",
                    message: data.message,
                });
                reject(data);
            }
        }
    };

    // 错误处理
    xhr.onerror = () => {
        MessageBox({
            title: "System Error: #500",
            message: "网络错误，请联系管理员！错误代码：500",
            type: "error",
            closeOnPressEscape: false,
            closeOnClickModal: false,
            showClose: false,
            confirmButtonClass: "el-button--danger",
        });
    };
};

// get请求
ajax.get = (url) => {
    return new Promise((reslove, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", `${HOST}${url}`, true);
        xhr.setRequestHeader("token", "");
        xhr.send();
        callback(xhr, reslove, reject);
    });
};

// post请求
ajax.post = (url, data) => {
    return new Promise((reslove, reject) => {
        let xhr = new XMLHttpRequest();

        // 处理参数
        // let form = new FormData();
        // Object.keys(data).map(item => {
        //     form.append(item, data[item]);
        // })
        let form = JSON.stringify(data);

        xhr.open("POST", `${HOST}${url}`, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("token", localStorage.getItem("erp_token") || "1");
        xhr.send(form);
        callback(xhr, reslove, reject);
    });
};

// 上传文件
ajax.upload = (url, data, progress) => {
    return new Promise((reslove, reject) => {
        let xhr = new XMLHttpRequest();

        // 处理参数
        let form = new FormData();
        Object.keys(data).map((item) => {
            form.append(item, data[item]);
        });

        // 上传进度
        xhr.upload.onprogress = (e) => {
            progress(parseFloat((e.loaded / e.total) * 100).toFixed(2));
        };

        xhr.open("POST", `${HOST}${url}`, true);
        xhr.send(form);
        callback(xhr, reslove, reject);
    });
};

export default {
    install: (app) => {
        app.config.globalProperties.ajax = ajax;
    },
};

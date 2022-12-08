import { $cms } from "@deepberry/common/js/https";
import OSS from "ali-oss";
import ajax from "./ajax.js";

const getToken = () => {
    return new Promise((a) => {
        ajax.ajax.getUrlBearer("/api/cms/system/upload/sts-token").then((token) => {
            a(token.data);
        });
    });
};

const upload = async function (file, path) {
    let token = await getToken();

    const client = new OSS({
        accessKeyId: token.AccessKeyId,
        accessKeySecret: token.AccessKeySecret,
        stsToken: token.SecurityToken,
        region: token.region,
        bucket: token.bucket,
        refreshSTSToken: getToken(),
        refreshSTSTokenInterval: 3600000,
    });
    return client.put(`upload/${path}`, file);
};

export default upload;

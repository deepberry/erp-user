/**
 * 工具库
 */
export default {
    // 合并相同类型的数据，data = 数据源，tag = 按标签合并
    total(data, tagBy) {
        // 列出所有标签，去重
        let tags = data.map((item) => {
            return this.findAttr(item, tagBy);
        });
        let tagsSet = Array.from(new Set(tags));

        // 合并数据
        let result = tagsSet.map((tag) => {
            let rows = {
                title: tag,
                num: 0,
            };
            data.map((item) => {
                if (this.findAttr(item, tagBy) == tag) {
                    rows.num += Number(item.agriculturalBo.agriculturalCount);
                }
            });
            return rows;
        });

        return result;
    },
    // 多层属性查源
    findAttr(object, string) {
        let tags = string.split(".");
        let tagsCopy = JSON.parse(JSON.stringify(tags));
        tagsCopy.map((item) => {
            object = object[tags[0]];
            tags.shift();
        });
        return object;
    },
};

<template>
    <div class="box">
        <div class="wrap">
            <div class="left">
                <div class="title">作物现场数据</div>
                <el-select
                    v-model="selectValue"
                    multiple
                    placeholder="请选择属性，可选择多个"
                    style="width: 100%; margin-top: 20px"
                >
                    <el-option
                        v-for="(item, index) in select"
                        :key="index"
                        :label="item.title"
                        :value="item.id"
                    ></el-option>
                </el-select>
                <div class="tags">
                    <el-tag
                        style="width: 30%; margin: 5px 1%"
                        size="large"
                        v-for="(item, index) in selected"
                        :key="index"
                        closable
                        >{{ item.title }}</el-tag
                    >
                </div>
            </div>
            <div class="right">
                <div class="title">作物实时数据 <span>（获取更多作物生长环境数据，请联系客服接入相关设备）</span></div>
                <div style="margin-top: 20px">环境数据：</div>
                <div class="items">
                    <div>
                        <p>
                            <img src="../../assets/img/icon-wendu.png" alt="" />
                        </p>
                        <p>28.5℃</p>
                        <p>空气温度</p>
                    </div>
                    <div>
                        <p>
                            <img src="../../assets/img/icon-guanghe.png" alt="" />
                        </p>
                        <p>150 μmol/㎡·s</p>
                        <p>光合有效辐射</p>
                    </div>
                    <div>
                        <p>
                            <img src="../../assets/img/icon-turang.png" alt="" />
                        </p>
                        <p>483 uS/cm</p>
                        <p>土壤EC</p>
                    </div>
                    <div>
                        <p>
                            <img src="../../assets/img/icon-hanshui.png" alt="" />
                        </p>
                        <p>30%</p>
                        <p>土壤含水量</p>
                    </div>
                    <div>
                        <p>
                            <img src="../../assets/img/icon-shidu.png" alt="" />
                        </p>
                        <p>70%</p>
                        <p>空气相对湿度</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="wrap">
            <div class="left">
                <div class="title">数据图表</div>
            </div>
            <div class="right">
                <div class="title">农事照片</div>
                <div class="imgs">
                    <img v-for="(item, index) in imgs" :key="index" src="../../assets/img/ds.png" alt="" />
                    <div v-for="(item, index) in imgSpace" :key="index"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            selectValue: [],
            select: [
                { id: 1, title: "一" },
                { id: 2, title: "二" },
                { id: 3, title: "三" },
                { id: 4, title: "四" },
            ],
            imgs: [1, 2, 3, 4, 5],
        };
    },
    computed: {
        selected() {
            return this.selectValue.map((item) => {
                let r = {};
                this.select.map((i) => {
                    if (item == i.id) r = i;
                });
                return r;
            });
        },
        imgSpace() {
            let r = 0;
            r = 4 - (this.imgs.length % 4);
            return r;
        },
    },
};
</script>

<style lang="less" scoped>
.box {
    .wrap {
        padding: 20px 0;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .title {
            span {
                color: #1c82d7;
                font-size: 12px;
            }
        }
        .left {
            width: 50%;
            .tags {
                display: flex;
                justify-content: flex-start;
                align-content: flex-start;
                flex-wrap: wrap;
                margin-top: 20px;
            }
        }
        .right {
            width: 50%;
            margin-left: 100px;
            .imgs {
                display: flex;
                justify-content: space-between;
                align-content: flex-start;
                flex-wrap: wrap;
                img {
                    width: 23%;
                    margin-right: 2%;
                    margin-top: 20px;
                    border-radius: 10px;
                }
                div {
                    width: 23%;
                    margin-right: 2%;
                }
            }
            .items {
                margin-top: 20px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                div {
                    width: 120px;
                    height: 100px;
                    text-align: center;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    margin-right: 10px;
                    img {
                        width: 25px;
                        margin-top: 10px;
                    }
                    p:nth-child(2) {
                        color: #333333;
                        margin-top: 5px;
                    }
                    p:nth-child(3) {
                        color: #979797;
                        margin-top: 5px;
                    }
                }
            }
        }
    }
    .wrap:first-child {
        border-bottom: 1px solid #ccc;
    }
}
</style>

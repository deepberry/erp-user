<template>
    <div class="purchaseShopDetail inner">
        <div class="box">
            <div class="head">
                <el-button link type="primary" @click="back"
                    ><i
                        class="erp erpfanhui"
                        style="font-size: 14px; margin-right: 5px; position: relative; top: -1px"
                    ></i>
                    返回</el-button
                >
                <span style="position: relative; top: 2px; font-size: 15px">农资详情</span>
            </div>
            <div class="content" v-loading="loading">
                <div class="top">
                    <div class="swiperBox">
                        <img src="../../assets/img/ds.png" alt="" />
                    </div>
                    <div class="info">
                        <div class="infoItem">
                            <p>{{ detail.agriculturalBo.title }}</p>
                            <p class="price">￥{{ detail.agriculturalBo.agriculturalPrice }}元</p>
                        </div>
                        <div class="infoItem">
                            <span class="tag">{{ detail.agriculturalBo.agriculturalCategory }}</span>
                        </div>
                        <div class="infoItem">
                            <p>{{ detail.agriculturalBo.manufacturers }}</p>
                            <p class="unit">
                                ({{ detail.agriculturalBo.agriculturalCount }}{{ detail.agriculturalBo.unitweight }}/{{
                                    detail.agriculturalBo.unitmeasurement
                                }})
                            </p>
                        </div>
                        <div class="infoItem">
                            <el-badge :value="12" class="item">
                                <i class="erp erpgouwuche3-mianxing"></i>
                            </el-badge>
                            <el-button type="primary" round>加入购物车</el-button>
                            <el-button type="primary" plain round>联系客服</el-button>
                        </div>
                    </div>
                </div>
                <div class="detail">
                    <p class="title">产品详情：</p>
                    <div class="detailContent" v-html="detail.richContent"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Swiper from "swiper";
export default {
    name: "purchaseShopDetail",
    data() {
        return {
            loading: false,
            detail: {
                agriculturalBo: {},
            },
        };
    },
    mounted() {
        this.getData();
    },
    methods: {
        // 获取数据
        getData() {
            this.loading = true;
            this.ajax
                .post("/api/v1/adam/agricultural/getAgriculturalById", {
                    id: this.$route.query.id,
                })
                .then((r) => {
                    this.detail = r.data;
                    this.loading = false;
                });
        },
        // 返回列表
        back() {
            this.$router.push("/erp/purchase/shop");
        },
    },
};
</script>

<style lang="less" scoped>
@import url("../../../node_modules/swiper/swiper-bundle.min.css");
@import url("@/assets/css/inner.less");
.content {
    width: calc(100% - 200px);
    height: calc(100% - 100px);
    overflow-x: hidden;
    overflow-y: auto;
    padding: 20px 100px;
    .top {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid rgba(0, 0, 0, 0.09);
        .swiperBox {
            width: 270px;
            height: 150px;
            overflow: hidden;
            border-radius: 10px;
            img {
                width: 270px;
                height: 150px;
            }
        }
        .info {
            width: 300px;
            height: 150px;
            margin-left: 50px;
            display: flex;
            justify-content: flex-start;
            align-content: space-between;
            flex-wrap: wrap;
            > div {
                width: 100%;
            }
            .infoItem {
                display: flex;
                justify-content: space-between;
                align-items: center;
                i.erpgouwuche3-mianxing {
                    display: inline-block;
                    font-size: 34px;
                    color: #538dff;
                    cursor: pointer;
                }
                p {
                    color: #333333;
                    font-size: 14px;
                }
                p.price {
                    color: #e01d1d;
                }
                p.unit {
                    color: #8c8c8c;
                    font-size: 12px;
                }
                .tag {
                    background: #c3f8c7;
                    color: #000000;
                    display: inline-block;
                    padding: 5px 10px;
                    font-size: 12px;
                    border-radius: 3px;
                }
            }
        }
    }
    .detail {
        padding: 20px 0;
        .title {
            color: #333333;
        }
        .detailContent {
            margin-top: 20px;
            line-height: 34px;
            color: #535353;
            p {
                padding: 10px 0;
            }
            img {
                margin-right: 15px;
                border-radius: 10px;
            }
        }
    }
}
</style>

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
                        <div class="swiper">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide" v-for="(item, swiperIndex) in bannerList" :key="swiperIndex">
                                    <img :src="item" alt="" />
                                </div>
                            </div>
                            <div class="swiper-pagination"></div>
                            <div class="swiper-button-prev"></div>
                            <div class="swiper-button-next"></div>
                        </div>
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
                            <el-badge :value="carCount" class="item" @click="showCarBox = true">
                                <i class="erp erpgouwuche3-mianxing"></i>
                            </el-badge>
                            <el-button type="primary" :loading="addToCaring" round @click="addToCar"
                                >加入购物车</el-button
                            >
                            <el-button type="primary" plain round @click="showServer">联系客服</el-button>
                        </div>
                    </div>
                </div>
                <div class="detail">
                    <p class="title">产品详情：</p>
                    <div class="detailContent" v-html="detail.richContent"></div>
                </div>
            </div>
        </div>
        <PurchaseCar v-if="showCarBox" @closeCarBox="closeCarBox"></PurchaseCar>
    </div>
</template>

<script>
import PurchaseCar from "@/components/purchase/PurchaseCar.vue";
import Swiper, { Autoplay, Navigation, Pagination } from "swiper";
Swiper.use(Autoplay);
Swiper.use(Navigation);
Swiper.use(Pagination);
export default {
    name: "purchaseShopDetail",
    data() {
        return {
            loading: false,
            detail: {
                agriculturalBo: {},
            },
            bannerList: [],
            showCarBox: false,
            carCount: "",
            addToCaring: false,
        };
    },
    components: {
        PurchaseCar,
    },
    mounted() {
        let t = this;
        let ajax = async function () {
            await t.getData();
            await t.getCarCount();
            t.$nextTick(() => {
                t.swiper();
            });
        };
        ajax();
    },
    methods: {
        // 初始化swiper
        swiper() {
            new Swiper(".swiper", {
                autoplay: {
                    delay: 2000,
                },
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
            });
        },

        // 获取数据
        getData() {
            return new Promise((a, b) => {
                this.loading = true;
                this.ajax
                    .post("/api/v1/adam/agricultural/getAgriculturalById", {
                        id: this.$route.query.id,
                    })
                    .then((r) => {
                        this.detail = r.data;
                        this.bannerList = r.data.bannerList.split(",");
                        this.loading = false;
                        a();
                    });
            });
        },
        // 获取购物车数量
        getCarCount() {
            return new Promise((a, b) => {
                this.ajax.post("/api/v1/adam/agricultural/cart-count").then((r) => {
                    this.carCount = r.data || "";
                    a();
                });
            });
        },
        addToCar() {
            this.addToCaring = true;
            this.ajax
                .post("/api/v1/adam/agricultural/cart-in", {
                    id: this.$route.query.id,
                })
                .then((r) => {
                    this.addToCaring = false;
                    if (r.code == 200) {
                        this.$message.success("添加成功");
                        this.carCount++;
                    } else {
                        this.$message.error(r.message);
                    }
                });
        },
        showServer() {
            this.$alert("客服电话：18012345678", "联系客服");
        },
        // 返回列表
        back() {
            this.$router.push("/erp/purchase/shop");
        },
        // 关闭购物车
        closeCarBox() {
            this.getCarCount();
            let timer = setTimeout(() => {
                this.showCarBox = false;
                clearTimeout(timer);
            }, 500);
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
            .swiper-pagination {
                position: relative;
                top: -30px;
            }
            .swiper-button-prev,
            .swiper-button-next {
                top: 75px;
            }
            .swiper {
                --swiper-theme-color: rgba(255, 255, 255);
                --swiper-navigation-size: 20px;
            }
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

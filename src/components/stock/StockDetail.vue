<template>
    <div class="stockDetail">
        <el-dialog
            custom-class="stockDetailBox"
            :before-close="onClose"
            append-to-body
            v-model="showDetailBox"
            title="库存明细"
            width="600px"
        >
            <div class="stockDetailBoxInner" v-loading="loading">
                <div class="head">
                    <p>{{ detail.agriculturalBo.title }}</p>
                    <p>{{ detail.agriculturalUnit }}袋 (共{{ detail.agriculturalCount }}公斤)</p>
                    <p>
                        <span>{{ detail.agriculturalBo.agriculturalCategory }}</span>
                    </p>
                    <p>{{ detail.agriculturalBo.manufacturers }}</p>
                    <p>
                        ({{ detail.agriculturalBo.agriculturalCount }}{{ detail.agriculturalBo.unitweight }}/{{
                            detail.agriculturalBo.unitmeasurement
                        }})
                    </p>
                </div>
                <div class="card">
                    <div>
                        <p>已领用退回</p>
                        <p>2022.10.14</p>
                    </div>
                    <div>
                        <p class="add">+1000公斤</p>
                        <p>张三</p>
                    </div>
                </div>
                <div class="card">
                    <div>
                        <p>领用出库</p>
                        <p>2022.10.14</p>
                    </div>
                    <div>
                        <p class="miuns">-1000公斤</p>
                        <p>张三</p>
                    </div>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="js">
export default {
    props: ['id'],
    name: 'stockDetail',
    data (){
        return {
            loading: false,
            detail: {
                agriculturalBo: {}
            },
            showDetailBox: true
        }
    },
    mounted (){
        this.getDetail();
    },
    methods: {
        // 获取详情数据
        getDetail (){
            this.loading = true;
            this.ajax.post('/api/v1/adam/farmLand/agricultural-detail', {
                id: this.id
            }).then(r => {
                this.detail = r.data;
                this.loading = false;
            })
        },
        onClose (){
            this.$emit("closeDetailBox", 0);
            this.showDetailBox = false;
        }
    }
}
</script>

<style lang="less" scoped>
.stockDetailBoxInner {
    position: relative;
    top: -20px;
    .head {
        display: flex;
        justify-content: flex-start;
        align-content: flex-start;
        flex-wrap: wrap;
        padding-top: 20px;
        border-top: 1px solid rgba(0, 0, 0, 0.09);
        p {
            width: 33%;
            color: rgba(0, 0, 0, 1);
            padding: 5px 0;
        }
        p:nth-child(2) {
            color: rgba(83, 141, 255, 1);
        }
        p:nth-child(3) {
            text-align: right;
            span {
                background: #c3f8c7;
                color: #000000;
                display: inline-block;
                padding: 5px 10px;
                font-size: 12px;
                border-radius: 3px;
            }
        }
        p:nth-child(5) {
            color: rgba(156, 156, 156, 1);
        }
    }
    .card {
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0px 0px 21px 0px #e5ecf2;
        margin-top: 20px;
        padding: 20px;
        div {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 7px;
            p.add {
                color: rgba(61, 201, 71, 1);
            }
            p.miuns {
                color: rgba(243, 95, 95, 1);
            }
        }
    }
}
</style>

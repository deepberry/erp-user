<template>
    <div class="stockReg">
        <el-dialog
            custom-class="stockRegBox"
            :before-close="onClose"
            append-to-body
            v-model="showBox"
            title="选择农资"
            width="500px"
        >
            <div class="box" v-loading="loading">
                <div class="search">
                    <el-input style="width: 390px" v-model="searchKey" placeholder="关键字搜索：农资名称、厂家名称" />
                    <el-button type="primary" plain @click="getData">查询</el-button>
                </div>
                <div class="list">
                    <div class="item" @click="chose(item, index)" v-for="(item, index) in list" :key="index">
                        <div>
                            <p>{{ item.agriculturalBo.title }}</p>
                            <i :class="item.check ? 'erp erpduoxuankuangxuanzhong' : 'erp erpduoxuan-01'"></i>
                        </div>
                        <div>
                            <p>
                                <span class="tag">{{ item.agriculturalBo.agriculturalCategory }}</span>
                            </p>
                            <p style="color: #409eff">
                                库存量：{{ item.agriculturalUnit }}{{ item.agriculturalBo.unitmeasurement }}共{{
                                    item.agriculturalCount
                                }}{{ item.agriculturalBo.unitweight }}
                            </p>
                        </div>
                        <div>
                            <p>{{ item.agriculturalBo.manufacturers }}</p>
                            <p>
                                ({{ item.agriculturalBo.agriculturalCount }}{{ item.agriculturalBo.unitweight }}/{{
                                    item.agriculturalBo.unitmeasurement
                                }})
                            </p>
                        </div>
                    </div>
                    <el-empty description="暂无数据" v-if="list.length == 0" />
                </div>
                <el-button @click="submit" type="primary" style="width: calc(100% - 40px); margin: 20px"
                    >确定选择</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script lang="js">
export default {
    name: 'myStartChose',
    data (){
        return {
            loading: false,
            searchKey: '',
            list: [],
            showBox: true,
            chosed: []
        }
    },
    mounted (){
        this.getData();
    },
    methods: {
        getData (){
            this.loading = true;
            this.ajax.post('/api/v1/adam/farmLand/agriculturalSearch-list', {
                "pageNum": 1,
                "pageSize": 10,
                "param": {
                    "categoryId": 0,
                    "inventory": 0,
                    "keyWord": this.searchKey
                }
            }).then(r => {
                this.list = r.data.map(item => {
                    item.check = false;
                    return item;
                })
                this.loading = false;
            })
        },
        onClose (){
            this.$emit('onClose', 0);
            this.showBox = false;
        },
        chose (item, index){
            this.list[index].check = !this.list[index].check;
            this.chosed.push(item);
        },
        submit (){
            this.$emit('submit', this.chosed);
            this.onClose();
        }
    }
}
</script>

<style lang="less" scoped>
.box {
    position: relative;
    top: -20px;
    .search {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        border-top: 1px solid rgba(0, 0, 0, 0.09);
    }
    .list {
        overflow-y: auto;
        max-height: 500px;
        .item {
            padding: 10px 20px;
            background: #ffffff;
            box-shadow: 0px 0px 10px 0px #e5ecf2;
            border-radius: 8px;
            margin-top: 15px;
            cursor: pointer;
            i.erpduoxuankuangxuanzhong {
                color: #409eff;
            }
            div {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 8px 0;
                .tag {
                    background: #c3f8c7;
                    color: #000000;
                    display: inline-block;
                    padding: 2px 10px;
                    font-size: 12px;
                    border-radius: 3px;
                }
            }
            div:last-child {
                p {
                    color: #aaaaaa;
                }
            }
        }
        .item:hover {
            background: #f7fcff;
        }
    }
}
</style>

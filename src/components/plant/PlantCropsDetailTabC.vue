<template>
    <div class="box">
        <div class="list">
            <div class="table">
                <div class="tableTitle">（采收统计）</div>
                <div class="tableItem tableHead">
                    <p>采收时间</p>
                    <p>重量</p>
                </div>
                <div class="tableItems">
                    <el-empty description="暂无数据" v-if="reap.length == 0" />
                    <div class="tableItem" v-for="(item, index) in reap" :key="index">
                        <p>{{ item.workTime }}</p>
                        <p>{{ item.weightAll || 0 }}</p>
                    </div>
                    <div class="tableItem tableAll" v-if="reap.length > 0">
                        <p>合计</p>
                        <p>{{ reapCount }}</p>
                    </div>
                </div>
            </div>
            <div class="table">
                <div class="tableTitle">（农资使用）</div>
                <div class="tableItem tableHead">
                    <p>类型</p>
                    <p>用量</p>
                </div>
                <div class="tableItems">
                    <el-empty description="暂无数据" v-if="farmUseBos.length == 0" />
                    <div class="tableItem" v-for="(item, index) in farmUseBos" :key="index">
                        <p>{{ item.agricultural }}</p>
                        <p
                            style="color: #6397fd; cursor: pointer; text-decoration: underline"
                            @click="showDialogBox('农资使用统计', item.id)"
                        >
                            {{ item.agriculturalCount || 0 }}{{ item.agriculturalUnit }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="table">
                <div class="tableTitle">（工时统计）</div>
                <div class="tableItem tableHead">
                    <p>农事类型</p>
                    <p>工时（小时）</p>
                </div>
                <div class="tableItems">
                    <el-empty description="暂无数据" v-if="farmWorkBos.length == 0" />
                    <div class="tableItem" v-for="(item, index) in farmWorkBos" :key="index">
                        <p>{{ item.agricultural }}</p>
                        <p
                            style="color: #6397fd; cursor: pointer; text-decoration: underline"
                            @click="showDialogBox('工时使用统计', item.id)"
                        >
                            {{ item.agriculturalCount || 0 }}
                        </p>
                    </div>
                    <div class="tableItem tableAll" v-if="farmWorkBos.length > 0">
                        <p>合计</p>
                        <p>{{ farmWorkBosCount }}</p>
                    </div>
                </div>
            </div>
        </div>
        <PlantCropsDetailCDialog :title="dialogTitle" v-if="showDialog" @close="closeDialog"></PlantCropsDetailCDialog>
    </div>
</template>

<script lang="js">
import PlantCropsDetailCDialog from '@/components/plant/PlantCropsDetailCDialog';
export default {
    data() {
        return {
            loading: false,
            detail: {},
            reap: [],
            farmUseBos: [],
            farmWorkBos: [],
            showDialog: false,
            dialogTitle: '',
            dialogId: ''
        }
    },
    components: {
        PlantCropsDetailCDialog
    },
    computed: {
        farmWorkBosCount (){
            let r = 0;
            this.farmWorkBos.map(item => {
                r += item.agriculturalCount || 0;
            })
            return r;
        },
        reapCount (){
            let r = 0;
            this.reap.map(item => {
                r += item.weightAll || 0;
            })
            return r;
        }
    },
    watch: {
        $route (v){
            if(v.query.tab == 3){
                let t = this;
                let ajax = async function (){
                    t.loading = true;
                    await t.getReap();
                    await t.getStat();
                    t.loading = false;
                }
                ajax();
            }
        }
    },
    mounted() {
        let t = this;
        let ajax = async function (){
            t.loading = true;
            await t.getReap();
            await t.getStat();
            t.loading = false;
        }
        ajax();
    },
    methods: {
        showDialogBox (title, id){
            this.dialogTitle = title;
            this.dialogId = id;
            this.showDialog = true;
        },
        closeDialog (){
            setTimeout(() => {
                this.showDialog = false;
            }, 500);
        },
        // 获取采收统计
        getReap (){
            return new Promise((a,b) => {
                this.ajax.post('/api/v1/adam/farm/getFarmRecoveryByPlantsId', {
                    "plantsId": this.$route.query.id
                }).then(r => {
                    this.reap = r.data;
                    a();
                })
            })
        },
        // 获取统计数据
        getStat (){
            return new Promise((a,b) => {
                this.ajax.post('/api/v1/adam/farm/searchfarmUseRecoveryByPlantsId', {
                    "endTime": "",
                    "id": this.$route.query.id,
                    "keyWord": "",
                    "startTime": ""
                }).then(r => {
                    this.farmUseBos = r.data.farmUseBos;
                    this.farmWorkBos = r.data.farmWorkBos;
                    a();
                })
            })
        }
    },
}
</script>

<style lang="less" scoped>
.box {
    padding: 0 20px;
    .list {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .table {
            margin-right: 20px;
            width: 360px;
            .tableTitle {
                background: #f5f7f9;
                text-align: center;
                padding: 12px 0;
            }
            .tableItems {
                overflow-y: scroll;
                height: 420px;
            }
            .tableItems::-webkit-scrollbar {
                width: 0px;
            }
            .tableItem {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border-left: 1px solid #d2e8fd;
                border-right: 1px solid #d2e8fd;
                p {
                    width: 180px;
                    text-align: center;
                    padding: 10px 0;
                    border-bottom: 1px solid #d2e8fd;
                    color: #777777;
                }
                p:first-child {
                    border-right: 1px solid #d2e8fd;
                }
            }
            .tableItem.tableHead {
                background: #e8f2fc;
                p {
                    color: #5a91ff;
                }
            }
            .tableItem.tableAll {
                p {
                    color: #262628;
                    font-weight: bold;
                }
            }
        }
    }
}
</style>

<template>
    <div class="stockReg">
        <el-dialog
            custom-class="stockRegBox"
            :before-close="onClose"
            append-to-body
            v-model="showDetailBox"
            title="请选择登记方式"
            width="400px"
        >
            <div class="stockRegBoxInner">
                <p @click="input">手动输入农资信息</p>
                <p @click="_import">选择平台农资信息</p>
            </div>
        </el-dialog>

        <el-dialog
            custom-class="stockRegBox"
            :before-close="onClose"
            append-to-body
            v-model="showInput"
            title="手动输入农资信息"
            width="600px"
        >
            <div class="form">
                <div class="formBox">
                    <el-form :model="form" label-width="70px">
                        <el-form-item label="农资名称">
                            <el-input v-model="form.title" placeholder="请输入农资名称" />
                        </el-form-item>
                        <el-form-item label="农资类型">
                            <el-select style="width: 450px" v-model="defaultType" placeholder="请选择农资类型">
                                <el-option
                                    v-for="item in typeList"
                                    :key="item.id"
                                    :label="item.title"
                                    :value="item.id"
                                />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="生产厂家">
                            <el-input v-model="form.company" placeholder="请输入生产厂家" />
                        </el-form-item>
                        <el-form-item label="规格">
                            <el-col :span="18">
                                <el-input v-model="form.weightNum" placeholder="请输入规格" class="input-with-select">
                                    <template #append>
                                        <el-select v-model="defaultWeight" placeholder="-" style="width: 75px">
                                            <el-option
                                                v-for="item in weightList"
                                                :key="item.id"
                                                :label="item.title"
                                                :value="item.id"
                                            />
                                        </el-select>
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="2" style="text-align: center">
                                <span>/</span>
                            </el-col>
                            <el-col :span="4">
                                <el-select v-model="defaultUnit" placeholder="-" style="width: 75px">
                                    <el-option
                                        v-for="item in unitList"
                                        :key="item.id"
                                        :label="item.title"
                                        :value="item.id"
                                    />
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="submit">
                    <el-button type="primary" @click="submitA" :loading="saveing">提交</el-button>
                </div>
            </div>
        </el-dialog>

        <el-dialog
            custom-class="stockRegBox"
            :before-close="onClose"
            append-to-body
            v-model="showImport"
            title="选择平台农资信息"
            width="800px"
        >
            <div class="_import">
                <div class="search">
                    <el-input
                        v-model="searchKey"
                        style="width: 360px"
                        placeholder="关键字搜索：农资类型、农资名称、厂家名称"
                    />
                    <el-button style="margin-left: 10px" type="primary" plain @click="getData">查询</el-button>
                </div>
                <el-table
                    size="large"
                    :data="tableData"
                    ref="table"
                    max-height="500"
                    style="width: 100%"
                    v-loading="loading"
                >
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="agriculturalBo.title" label="农资名称" />
                    <el-table-column prop="agriculturalBo.agriculturalCategory" label="农资类型" width="150" />
                    <el-table-column prop="agriculturalBo.manufacturers" label="生产厂家" />
                    <el-table-column label="规格" width="150">
                        <template #default="scope">
                            {{ scope.row.agriculturalBo.agriculturalCount }}{{ scope.row.agriculturalBo.unitweight }}/{{
                                scope.row.agriculturalBo.unitmeasurement
                            }}
                        </template>
                    </el-table-column>
                </el-table>
                <div class="submit">
                    <el-button type="primary" @click="submitB" :loading="submitting">提交</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="js">
export default {
    name: 'stockReg',
    props: ['default', 'needSubmit'],
    data (){
        return {
            loading: false,
            showDetailBox: true,
            showInput: false,
            showImport: false,
            form: {},
            defaultType: '',
            typeList: [], // 农事类型列表
            defaultUnit: '', // 数量单位列表 袋、包、桶等
            unitList: [],
            defaultWeight: '', // 重量单位列表 公斤、升、立方等
            weightList: [],
            searchKey: '',
            tableData: [],
            saveing: false,
            submitting: false
        }
    },
    mounted (){
        if(this.default == 0){
            this.input();
        }
        if(this.default == 1){
            this._import();
        }
    },
    methods: {
        onClose (){
            this.$emit("closeReg", 0);
            this.showDetailBox = false;
            this.showInput = false;
            this.showImport = false;
        },
        input (){
            let t = this;
            t.showDetailBox = false;
            t.showInput = true;
            t.showImport = false;
            const ajax = async function (){
                await t.getTypeList();
                await t.getUnitList();
                await t.getWeightList();
            }
            ajax();
        },
        _import (){
            this.showDetailBox = false;
            this.showInput = false;
            this.showImport = true;
            console.log(2)
            this.getData();
        },
        // 获取农资数据列表
        getData (){
            this.loading = true;
            this.ajax.post('/api/v1/adam/farmLand/agriculturalSearch-list', {
                "pageNum": 1,
                "pageSize": 100,
                "param": {
                    "categoryId": 0,
                    "inventory": 0,
                    "keyWord": this.searchKey
                }
            }).then(r => {
                this.loading = false;
                this.tableData = r.data;
            })
        },
        // 获取农资类型列表
        getTypeList (){
            return new Promise ((a,b) => {
                this.ajax.post('/api/v1/adam/farm/getAgriculturalCategory').then(r => {
                    this.typeList = r.data;
                    a();
                })
            })
        },
        // 获取数量单位列表 袋、包、桶等
        getUnitList (){
            return new Promise ((a,b) => {
                this.ajax.post('/api/v1/adam/farm/getUnitMeasurement').then(r => {
                    this.unitList = r.data;
                    a();
                })
            })
        },
        // 获取重量单位列表 公斤、升、立方等
        getWeightList (){
            return new Promise ((a,b) => {
                this.ajax.post('/api/v1/adam/farm/getWeightUnit').then(r => {
                    this.weightList = r.data;
                    a();
                })
            })
        },
        // 提交农资表单
        submitA (){
            let agriculturalCategory = '';
            this.typeList.map(item => {
                if(item.id == this.defaultType){
                    agriculturalCategory = item.title;
                }
            })
            let unitweight = '';
            this.weightList.map(item => {
                if(item.id == this.defaultWeight){
                    unitweight = item.title;
                }
            })
            let unitmeasurement = '';
            this.unitList.map(item => {
                if(item.id == this.defaultUnit){
                    unitmeasurement = item.title;
                }
            })
            let data = {
                agriculturalCategory,
                agriculturalCategoryId: this.defaultType,
                title: this.form.title,
                manufacturers: this.form.company,
                agriculturalCount: this.form.weightNum,
                unitweight,
                unitweightid: this.defaultWeight,
                unitmeasurement,
                unitmeasurementid: this.defaultUnit
            }
            this.saveing = true;
            this.ajax.post('/api/v1/adam/farmLand/saveDefinition', {
                agriculturalBoList: [data]
            }).then(r => {
                this.saveing = false;
                if(r.code == 200){
                    this.$message.success('保存成功');
                    this.$emit('onSave');
                    this.onClose();
                }
            })
        },
        // 提交平台农资
        submitB (){
            // 选择农资入口
            if(typeof this.needSubmit == 'undefined'){
                this.$emit('onSubmit', this.$refs.table.getSelectionRows());
                this.onClose();
            }else{
                // 登记新农资入口
                let id = this.$refs.table.getSelectionRows().map(item => {
                    return item.id;
                })
                this.submitting = true;
                this.ajax.post('/api/v1/adam/farmLand/savePlatform', {
                    id
                }).then(r => {
                    this.submitting = false;
                    if(r.code == 200){
                        this.$message.success('保存成功');
                        this.$emit('onSave');
                        this.onClose();
                    }
                })
            }
        },
    }
}
</script>

<style lang="less" scoped>
.stockRegBoxInner {
    position: relative;
    top: -20px;
    p {
        width: 80%;
        margin: 30px 10% 0 10%;
        padding: 30px 0;
        font-size: 16px;
        box-shadow: 0px 0px 10px 0px #e5ecf2;
        border-radius: 8px;
        text-align: center;
        cursor: pointer;
    }
    p:first-child {
        color: rgba(56, 56, 56, 1);
        background: #ffffff;
    }
    p:last-child {
        color: rgb(255, 255, 255);
        background: rgba(83, 141, 255, 1);
    }
}
.form {
    position: relative;
    top: -20px;
    padding-top: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    .formBox {
        background: rgba(244, 248, 251, 1);
        padding: 20px;
    }
    .submit {
        margin-top: 20px;
        text-align: right;
    }
}
._import {
    position: relative;
    top: -20px;
    padding-top: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.09);
    .search {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-bottom: 20px;
    }
    .submit {
        margin-top: 20px;
        text-align: right;
    }
}
</style>

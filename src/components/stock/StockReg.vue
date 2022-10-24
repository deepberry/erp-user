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
                            <el-input v-model="form.name" placeholder="请输入农资名称" />
                        </el-form-item>
                        <el-form-item label="农资类型">
                            <el-select style="width: 450px" v-model="form.region" placeholder="请选择农资类型">
                                <el-option label="类型一" value="1" />
                                <el-option label="类型二" value="2" />
                            </el-select>
                        </el-form-item>
                        <el-form-item label="生产厂家">
                            <el-input v-model="form.name" placeholder="请输入生产厂家" />
                        </el-form-item>
                        <el-form-item label="规格">
                            <el-col :span="18">
                                <el-input v-model="form.input" placeholder="请输入规格" class="input-with-select">
                                    <template #append>
                                        <el-select v-model="defaultUnitA" placeholder="-" style="width: 75px">
                                            <el-option label="公斤" value="1" />
                                            <el-option label="升" value="2" />
                                        </el-select>
                                    </template>
                                </el-input>
                            </el-col>
                            <el-col :span="2" style="text-align: center">
                                <span>/</span>
                            </el-col>
                            <el-col :span="4">
                                <el-select v-model="defaultUnitB" placeholder="Select" style="width: 75px">
                                    <el-option label="袋" value="1" />
                                    <el-option label="箱" value="2" />
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="submit">
                    <el-button type="primary">提交</el-button>
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
                    <el-button style="margin-left: 10px" type="primary" plain>查询</el-button>
                </div>
                <el-table :data="tableData" style="width: 100%" v-loading="loading">
                    <el-table-column type="selection" width="55" />
                    <el-table-column prop="title" label="农资名称" />
                    <el-table-column prop="type" label="农资类型" width="150" />
                    <el-table-column prop="company" label="生产厂家" />
                    <el-table-column prop="unit" label="规格" width="150" />
                </el-table>
                <div class="submit">
                    <el-button type="primary">提交</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script lang="js">
export default {
    name: 'stockReg',
    props: ['default'],
    data (){
        return {
            loading: false,
            showDetailBox: true,
            showInput: false,
            showImport: false,
            form: {},
            defaultUnitA: '1',
            defaultUnitB: '1',
            searchKey: '',
            tableData: []
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
            this.showDetailBox = false;
            this.showInput = true;
            this.showImport = false;
        },
        _import (){
            this.showDetailBox = false;
            this.showInput = false;
            this.showImport = true;
            this.loading = true;
            this.ajax.post('/api/v1/adam/farmLand/agriculturalSearch-list', {}).then(r => {
                this.loading = false;
                this.tableData = r.data;
            })
        }
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

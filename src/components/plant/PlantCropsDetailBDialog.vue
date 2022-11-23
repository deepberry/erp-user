<template>
    <el-dialog :before-close="onClose" append-to-body v-model="showDetailBox" title="添加农事" width="700px">
        <div class="form">
            <div class="item">
                <div class="title">种植植物：</div>
                <div class="content">
                    <el-input v-model="input" placeholder="请输入种植植物" />
                </div>
            </div>
            <div class="item">
                <div class="title"><span>*</span>农事类型：</div>
                <div class="content">
                    <el-select style="width: 100%" v-model="value" placeholder="请选择农事类型">
                        <el-option label="sdssd" value="asdas"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="item">
                <div class="title">使用农资：</div>
                <div class="content nz">
                    <div class="nzItem">
                        <div class="nzBox">
                            <span class="tag">化肥</span>
                            <span>复合肥5号</span>
                            <span>8000公斤</span>
                        </div>
                        <i class="erp erpshanchu"></i>
                    </div>
                    <div class="nzItem">
                        <div class="nzBox">
                            <span class="tag">化肥</span>
                            <span>复合肥5号</span>
                            <span>8000公斤</span>
                        </div>
                        <i class="erp erpshanchu"></i>
                    </div>
                    <div class="nzAdd" @click="showChose = true"><i class="erp erpicon_tianjia"></i> 添加农资</div>
                </div>
            </div>
            <div class="item">
                <div class="title">工时：</div>
                <div class="content">
                    <el-input v-model="input" placeholder="请输入工时">
                        <template #append>小时</template>
                    </el-input>
                </div>
            </div>
            <div class="item">
                <div class="title">农事照片：</div>
                <div class="content">
                    <div class="pics">
                        <div class="img" v-for="(item, imgIndex) in imgs" :key="imgIndex">
                            <img :src="item" alt="" />
                            <i class="erp erpguanbi" @click="removeImg(imgIndex)"></i>
                        </div>
                        <div class="upload" v-if="imgs.length < 2">
                            <input v-if="!uploading" @change="uploadFile" ref="file" type="file" />
                            <p v-if="!uploading"><i class="erp erpshangchuan"></i></p>
                            <p v-if="!uploading">点击上传照片</p>
                            <el-progress v-if="uploading" :width="90" type="circle" :percentage="percentage" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="title">备注：</div>
                <div class="content">
                    <el-input v-model="input" :rows="5" type="textarea" placeholder="请输入备注内容" />
                </div>
            </div>
            <div class="item">
                <div class="title"></div>
                <div class="content">
                    <div class="showMore" @click="showMore = true" v-if="!showMore">
                        查看更多 <i class="erp erp31xiala"></i>
                    </div>
                </div>
            </div>
            <div class="item" v-if="showMore">
                <div class="title">作业方式：</div>
                <div class="content">
                    <el-select style="width: 100%" v-model="value" placeholder="请选择作业方式">
                        <el-option label="sdssd" value="asdas"></el-option>
                    </el-select>
                </div>
            </div>
            <div class="item" v-if="showMore">
                <div class="title">操作时间：</div>
                <div class="content">
                    <el-date-picker
                        style="width: 100%"
                        v-model="value1"
                        type="date"
                        placeholder="请选择日期"
                        format="YYYY-MM-DD"
                        value-format="YYYY-MM-DD"
                    />
                </div>
            </div>
            <div class="item" v-if="showMore">
                <div class="title">操作人：</div>
                <div class="content">
                    <p class="text">Davy</p>
                </div>
            </div>
            <div class="btn">
                <el-button type="primary" plain>取消</el-button>
                <el-button type="primary">保存</el-button>
            </div>
        </div>
        <PlantCropsDetailBDialogChose v-if="showChose" @close="closeChose"></PlantCropsDetailBDialogChose>
    </el-dialog>
</template>

<script>
import PlantCropsDetailBDialogChose from "@/components/plant/PlantCropsDetailBDialogChose";
export default {
    props: ["id"],
    data() {
        return {
            showDetailBox: true,
            imgs: [],
            uploading: false,
            percentage: 0,
            showMore: false,
            showChose: false,
        };
    },
    mounted() {},
    components: {
        PlantCropsDetailBDialogChose,
    },
    methods: {
        // 移除图片
        removeImg(index) {
            console.log(index);
            this.imgs.splice(index, 1);
        },
        // 上传图片
        uploadFile() {
            this.uploading = true;
            let file = this.$refs.file.files[0];
            this.ajax
                .upload(
                    "/api/v1/adam/upload",
                    {
                        file,
                    },
                    (num) => {
                        this.percentage = parseInt(num);
                    }
                )
                .then((r) => {
                    this.imgs.push(r.data.imageUrl);
                    this.uploading = false;
                    this.percentage = 0;
                });
        },
        onClose(params = null) {
            if (typeof params == "function") {
                params = null;
            }
            this.$emit("onCloseDetail", params);
            this.showDetailBox = false;
        },
        closeChose() {
            setTimeout(() => {
                this.showChose = false;
            }, 300);
        },
    },
};
</script>

<style lang="less" scoped>
.form {
    width: 660px;
    position: relative;
    top: -20px;
    border-top: 1px solid rgb(231, 231, 231);
    .item {
        width: 660px;
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        .title {
            width: 100px;
            text-align: right;
            line-height: 35px;
            span {
                color: red;
            }
        }
        .content {
            width: 540px;
            .showMore {
                height: 40px;
                text-align: center;
                cursor: pointer;
                background: #f4f8ff;
                color: #538dff;
                line-height: 40px;
                margin-bottom: 20px;
            }
            .nzItem {
                width: 540px;
                display: flex;
                justify-content: space-between;
                .nzBox {
                    width: 480px;
                    border: 1px solid rgb(236, 236, 236);
                    padding: 7px 10px;
                    margin-bottom: 5px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: 13px;
                    span:nth-child(1) {
                        background: #c3f8c7;
                        color: #2ac726;
                        display: inline-block;
                        padding: 2px 10px;
                        font-size: 12px;
                        border-radius: 3px;
                    }
                    span:nth-child(2) {
                        margin-left: 50px;
                        width: 200px;
                    }
                }
                i {
                    width: 40px;
                    font-size: 20px;
                    color: #538dff;
                    cursor: pointer;
                    line-height: 35px;
                    text-align: center;
                }
            }
            .nzAdd {
                height: 35px;
                color: #538dff;
                line-height: 35px;
                cursor: pointer;
                font-size: 12px;
                text-align: center;
                background: #f4f8ff;
                position: relative;
                top: -5px;
                i {
                    font-size: 13px;
                }
            }
            .pics {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                flex-wrap: wrap;
                .img {
                    width: 180px;
                    height: 100px;
                    border-radius: 5px;
                    margin: 0 10px;
                    position: relative;
                    overflow: hidden;
                    img {
                        width: 180px;
                        height: 100px;
                    }
                    i {
                        display: inline-block;
                        font-size: 14px;
                        color: #ffffff;
                        position: absolute;
                        top: 0;
                        right: 0;
                        cursor: pointer;
                        background: rgba(0, 0, 0, 0.5);
                        padding: 5px;
                    }
                }
                .upload {
                    width: 180px;
                    height: 100px;
                    border-radius: 5px;
                    background: rgba(244, 248, 251, 1);
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    flex-wrap: wrap;
                    font-size: 12px;
                    color: rgba(107, 145, 242, 1);
                    cursor: pointer;
                    position: relative;
                    p {
                        width: 100%;
                        text-align: center;
                        padding: 5px 0;
                        i {
                            font-size: 22px;
                        }
                    }
                    input {
                        width: 180px;
                        height: 100px;
                        background: rgba(0, 0, 0, 0.5);
                        position: absolute;
                        top: 0;
                        left: 0;
                        cursor: pointer;
                        opacity: 0;
                    }
                    .el-progress--circle {
                        position: absolute;
                        top: 5px;
                        z-index: 10;
                    }
                }
            }
            p.text {
                line-height: 35px;
            }
        }
    }
    .btn {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }
}
</style>

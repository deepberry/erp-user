<template>
    <div class="stock inner">
        <div class="box" v-loading="loading">
            <div class="head">
                <div class="headBox">
                    <div>
                        <span class="active">{{ gardenList[currentGarden].title }}</span>
                    </div>
                    <el-button type="primary">新增作物</el-button>
                </div>
                <router-view></router-view>
            </div>
            <div class="btn" @click="showGardenList = true">
                <i class="erp erpanniu_jiantouxiangzuo_o"></i>
                <p>园区列表</p>
            </div>
            <el-drawer
                v-model="showGardenList"
                :before-close="onCloseGardenList"
                size="300px"
                :show-close="false"
                append-to-body
            >
                <div class="gardenList">
                    <div class="head">
                        <p @click="showGardenList = false">
                            <i class="erp erpanniu_jiantouxiangzuo_o"></i>
                            园区列表
                        </p>
                        <el-button type="primary" @click="addGarden">新增园区</el-button>
                    </div>
                    <div class="list">
                        <div
                            class="item"
                            @click="gardenListClick(index)"
                            v-for="(item, index) in gardenList"
                            :key="index"
                        >
                            <img :src="item.listImage" alt="" />
                            <div class="c">
                                <p>{{ item.title }}</p>
                                <p>
                                    <span v-for="plant in item.tagList" :key="plant.id">{{ plant.title }}</span>
                                </p>
                            </div>
                            <i class="erp erpcaidan" @click.stop="item.showMenu = true"></i>
                            <transition name="el-zoom-in-top">
                                <div v-if="item.showMenu" class="menu" @mouseleave="item.showMenu = false">
                                    <div class="menuPoint"></div>
                                    <p @click.stop="">历史种植</p>
                                    <p @click.stop="edit(item.id, index)">编辑园区</p>
                                    <p @click.stop="del(item.id, index)">删除园区</p>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </el-drawer>
        </div>
        <PlantAdd :isEdit="isEdit" :id="editId" v-if="showAddBox" @onCloseAdd="onCloseAdd"></PlantAdd>
    </div>
</template>

<script>
import PlantAdd from "@/components/plant/PlantAdd";
export default {
    name: "stock",
    data() {
        return {
            gardenList: [{ title: "" }], // 园区列表
            currentGarden: 0,
            loading: false,
            showGardenList: false,
            showAddBox: false, // 显示新增园区的弹窗
            isEdit: false, // 是否是编辑状态
            editId: 0,
        };
    },
    components: {
        PlantAdd,
    },
    mounted() {
        // 默认进入订单列表
        if (this.$route.name == "erpPlant") {
            this.$router.push("/erp/plant/detail");
        }

        this.getGardenList();
    },
    methods: {
        // 编辑园区
        edit(id, index) {
            this.showAddBox = true;
            this.isEdit = true;
            this.editId = id;
        },
        // 添加园区
        addGarden() {
            this.showAddBox = true;
            this.isEdit = false;
        },
        // 删除园区
        del(id, index) {
            this.ajax
                .post("/api/v1/adam/garden/deleteGarden", {
                    id,
                })
                .then((r) => {
                    this.$message.success("删除成功");
                    this.gardenList.splice(index, 1);
                });
        },
        // 点击园区
        gardenListClick(index) {
            this.currentGarden = index;
            this.showGardenList = false;
        },
        // 获取园区列表
        getGardenList() {
            this.loading = true;
            this.ajax
                .post("/api/v1/adam/garden/list", {
                    pageNum: 1,
                    pageSize: 100,
                    param: {},
                })
                .then((r) => {
                    this.gardenList = r.data.map((i) => {
                        i.showMenu = false;
                        return i;
                    });
                    this.loading = false;
                });
        },
        // 关闭园区列表
        onCloseGardenList(done) {
            done();
        },
        // 关闭创建弹窗
        onCloseAdd(params) {
            console.log(params);
            if (params == 1) {
                this.getGardenList();
            }
            setTimeout(() => {
                this.showAddBox = false;
            }, 500);
        },
    },
};
</script>

<style lang="less" scoped>
@import url("@/assets/css/inner.less");
.inner .box .ctrl .search .searchInput {
    width: 320px;
}
.headBox {
    width: calc(100% - 200px);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.btn {
    width: 94px;
    height: 45px;
    padding: 0 20px;
    position: absolute;
    top: 30px;
    right: 0;
    display: flex;
    cursor: pointer;
    justify-content: space-between;
    align-items: center;
    background: #ffffff;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.18);
    border-radius: 100px 0px 0px 100px;
    color: #538dff;
    i {
        display: inline-block;
        font-size: 18px;
    }
}
.gardenList {
    position: relative;
    right: -20px;
    .head {
        padding: 10px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.18);
        border-radius: 100px 0px 0px 100px;
        cursor: pointer;
        > p {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: #538dff;
            i.erpanniu_jiantouxiangzuo_o {
                display: inline-block;
                transform: rotate(180deg);
                font-size: 20px;
                position: relative;
                top: 1px;
                margin-right: 5px;
            }
        }
    }
    .list {
        width: 240px;
        position: relative;
        left: 12px;
        margin-top: 5px;
        border-top: 1px solid #e9e9e9;
        .item {
            width: 210px;
            padding: 15px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            border: 1px solid #e9e9e9;
            border-top: 0;
            position: relative;
            cursor: pointer;
            img {
                width: 65px;
                height: 65px;
                border-radius: 5px;
            }
            .c {
                height: 60px;
                margin-left: 10px;
                display: flex;
                justify-content: flex-start;
                align-content: space-between;
                flex-wrap: wrap;
                p {
                    width: 100%;
                    color: #4c4c4c;
                    span {
                        margin-right: 5px;
                    }
                }
                p:last-child {
                    font-size: 12px;
                    color: #538dff;
                }
            }
            i {
                display: inline-block;
                position: absolute;
                top: 20px;
                cursor: pointer;
                right: 10px;
                color: #999999;
                transform: rotate(90deg);
            }
            .menu {
                width: 50px;
                padding: 0 20px;
                background: rgb(76, 76, 76);
                position: absolute;
                top: 50px;
                right: 0px;
                border-radius: 5px;
                z-index: 2;
                opacity: 0.92;
                .menuPoint {
                    width: 16px;
                    height: 16px;
                    position: absolute;
                    top: -5px;
                    right: 10px;
                    background: rgb(76, 76, 76);
                    transform: rotate(60deg);
                }
                p {
                    cursor: pointer;
                    font-size: 12px;
                    text-align: center;
                    color: #ffffff;
                    padding: 10px 0;
                    border-bottom: 1px solid #ffffff;
                }
                p:last-child {
                    border: 0;
                }
            }
        }
    }
}
</style>

<template>
    <div class="stock inner">
        <div class="box" v-loading="loading">
            <div class="head" v-if="gardenList.length > 0">
                <div class="headBox">
                    <div>
                        <span class="active">{{ gardenList[currentGarden].title }}</span>
                    </div>
                    <el-button type="primary" @click="addCrops" v-if="$store.state.power.addPlantBtn"
                        >新增作物</el-button
                    >
                </div>
                <router-view></router-view>
            </div>
            <div class="nodata" v-if="gardenList.length == 0">
                <el-empty description="暂无园区" style="padding-top: 200px">
                    <el-button type="primary" @click="addGarden" v-if="$store.state.power.addParkBtn">
                        <i class="erp erpicon_tianjia" style="font-size: 14px; margin-right: 5px"></i>
                        添加园区</el-button
                    >
                </el-empty>
            </div>
            <div class="btn" @click="showGardenList = true" v-if="$store.state.power.parkList">
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
                                    <p @click.stop="history(item.id)" v-if="$store.state.power.historyPlantBtn">
                                        历史种植
                                    </p>
                                    <p @click.stop="edit(item.id, index)" v-if="$store.state.power.editParkBtn">
                                        编辑园区
                                    </p>
                                    <p @click.stop="del(item.id, index)" v-if="$store.state.power.delParkBtn">
                                        删除园区
                                    </p>
                                </div>
                            </transition>
                        </div>
                    </div>
                </div>
            </el-drawer>
        </div>
        <PlantAdd :isEdit="isEdit" :id="editId" v-if="showAddBox" @onCloseAdd="onCloseAdd"></PlantAdd>
        <PlantAddCrops
            :isEdit="isEdit"
            :id="editCropsId"
            v-if="showAddCropsBox"
            @onCloseAdd="onCloseAddCrops"
        ></PlantAddCrops>
    </div>
</template>

<script>
import PlantAdd from "@/components/plant/PlantAdd";
import PlantAddCrops from "@/components/plant/PlantAddCrops";
export default {
    name: "stock",
    data() {
        return {
            gardenList: [{ title: "" }], // 园区列表
            currentGarden: 0,
            loading: false,
            showGardenList: false,
            showAddBox: false, // 显示新增园区的弹窗
            showAddCropsBox: false, // 显示新增作物的弹窗
            isEdit: false, // 是否是编辑状态
            editCropsId: 0,
            editId: 0,
        };
    },
    components: {
        PlantAdd,
        PlantAddCrops,
    },
    mounted() {
        this.getGardenList();
    },
    methods: {
        // 添加作物
        addCrops() {
            this.showAddCropsBox = true;
            this.isEdit = false;
        },
        // 历史种植
        history(id) {
            this.$router.push({
                path: "/erp/plant/history",
                query: {
                    id,
                },
            });
        },
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
            this.editId = "";
        },
        // 删除园区
        del(id, index) {
            let t = this;
            let name = t.gardenList[index].title;
            t.$confirm(
                `
                <div style="color: #F59103">园区名称：${name}</div>
                <div>确定要删除此园区？</div>
            `,
                "删除园区",
                {
                    dangerouslyUseHTMLString: true,
                    type: "warning",
                    beforeClose(action, instance, done) {
                        if (action == "confirm") {
                            t.ajax
                                .post("/api/v1/adam/garden/deleteGarden", {
                                    id,
                                })
                                .then((r) => {
                                    if (r.code == 200) {
                                        t.$message.success("删除成功");
                                        t.gardenList.splice(index, 1);
                                        done();
                                        t.$router.push({
                                            path: "/erp/plant/detail",
                                            query: {
                                                id: t.gardenList[0].id,
                                            },
                                        });
                                    } else {
                                        t.$message.error(r.message);
                                    }
                                });
                        } else {
                            done();
                        }
                    },
                }
            ).catch(() => {});
        },
        // 点击园区
        gardenListClick(index) {
            this.currentGarden = index;
            this.showGardenList = false;
            this.$router.push({
                path: "/erp/plant/detail",
                query: {
                    id: this.gardenList[index].id,
                },
            });
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

                    if (this.gardenList.length > 0) {
                        // 默认进入第一个园区
                        let id = this.$route.query.gardenId || r.data[0].id;
                        this.$router.push({
                            path: "/erp/plant/detail",
                            query: {
                                id,
                            },
                        });
                        if (this.$route.query.gardenId) {
                            this.gardenList.map((item, index) => {
                                if (item.id == this.$route.query.gardenId) this.currentGarden = index;
                            });
                        }
                    }
                    this.loading = false;
                });
        },
        // 关闭园区列表
        onCloseGardenList(done) {
            done();
        },
        // 关闭创建弹窗
        onCloseAdd(params) {
            if (typeof params == "string" && params == "add") {
                this.getGardenList();
            }
            if (typeof params == "object" && params) {
                this.gardenList = this.gardenList.map((item) => {
                    if (item.id == params.id) {
                        item.title = params.title;
                        item.detailImage = params.detailImage;
                    }
                    return item;
                });
            }
            setTimeout(() => {
                this.showAddBox = false;
            }, 500);
        },
        onCloseAddCrops(params) {
            if (params == 1) {
                // 通过触发路由刷新数据
                this.$router.push({
                    path: "/erp/plant/detail",
                    query: {
                        id: this.$route.query.id,
                        re: 1,
                    },
                });
            }
            setTimeout(() => {
                this.showAddCropsBox = false;
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
    top: 17px;
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

<template>
    <el-dialog :before-close="onClose" append-to-body v-model="showBox" :title="title" width="400px">
        <div>
            <el-input v-model="name" placeholder="请输入名称"></el-input>
        </div>
        <div style="margin-top: 20px">
            <el-input v-model="num" placeholder="请输入数量"></el-input>
        </div>
        <div style="margin-top: 20px; text-align: center">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="primary" text @click="save2">保存并继续添加</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    props: ["type"],
    data() {
        return {
            showBox: true,
            title: "",
            name: "",
            num: "",
        };
    },
    mounted() {
        this.title = "添加" + (this.type == 1 ? "虫子" : "天敌");
    },
    methods: {
        save() {
            let r = this.save2();
            if (r) this.$emit("close");
        },
        save2() {
            console.log(this.type);
            if (!this.name) {
                this.$message.error("请输入名称");
                return false;
            }
            if (!this.num) {
                this.$message.error("请输入数量");
                return false;
            }
            this.$emit("save", {
                type: this.type,
                name: this.name,
                num: this.num,
            });
            this.name = "";
            this.num = "";
            return true;
        },
        onClose() {
            this.showBox = false;
            this.$emit("close");
        },
    },
};
</script>

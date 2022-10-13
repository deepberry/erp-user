<template>
    <div class="stockDetail">
        <el-dialog
            custom-class="purchaseDetailBox"
            :before-close="onClose"
            append-to-body
            v-model="showDetailBox"
            title="库存明细"
            width="700px"
        >
        </el-dialog>
    </div>
</template>

<script lang="js">
export default {
    name: 'stockDetail',
    data (){
        return {

        }
    }
}
</script>

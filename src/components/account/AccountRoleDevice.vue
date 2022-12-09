<template>
    <div class="roleErp">
        <el-tree :props="props" :data="list" show-checkbox />
    </div>
</template>

<script>
export default {
    name: "roleErp",
    data() {
        return {
            props: {
                label: "name",
                children: "menuParentBoList",
            },
            list: [],
            role: [],
        };
    },
};
</script>

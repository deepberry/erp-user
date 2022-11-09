<template>
    <div class="box">
        <div class="list">
            <div class="table">
                <div class="tableTitle">（采购统计）</div>
                <div class="tableItem tableHead">
                    <p>采购时间</p>
                    <p>重量</p>
                </div>
                <div class="tableItem">
                    <p>2022.11.08</p>
                    <p>2000公斤</p>
                </div>
                <div class="tableItem">
                    <p>2022.11.08</p>
                    <p>2000公斤</p>
                </div>
                <div class="tableItem">
                    <p>2022.11.08</p>
                    <p>2000公斤</p>
                </div>
                <div class="tableItem">
                    <p>2022.11.08</p>
                    <p>2000公斤</p>
                </div>
                <div class="tableItem tableAll">
                    <p>合计</p>
                    <p>2000公斤</p>
                </div>
            </div>
            <div class="table">
                <div class="tableTitle">（采购统计）</div>
                <div class="tableItem tableHead">
                    <p>采购时间</p>
                    <p>重量</p>
                </div>
                <div class="tableItem">
                    <p>2022.11.08</p>
                    <p>2000公斤</p>
                </div>
                <div class="tableItem">
                    <p>2022.11.08</p>
                    <p>2000公斤</p>
                </div>
                <div class="tableItem">
                    <p>2022.11.08</p>
                    <p>2000公斤</p>
                </div>
                <div class="tableItem">
                    <p>2022.11.08</p>
                    <p>2000公斤</p>
                </div>
                <div class="tableItem tableAll">
                    <p>合计</p>
                    <p>2000公斤</p>
                </div>
            </div>
            <div class="table">
                <div class="tableTitle">（采购统计）</div>
                <div class="tableItem tableHead">
                    <p>采购时间</p>
                    <p>重量</p>
                </div>
                <div class="tableItem">
                    <p>2022.11.08</p>
                    <p>2000公斤</p>
                </div>
                <div class="tableItem">
                    <p>2022.11.08</p>
                    <p>2000公斤</p>
                </div>
                <div class="tableItem">
                    <p>2022.11.08</p>
                    <p>2000公斤</p>
                </div>
                <div class="tableItem">
                    <p>2022.11.08</p>
                    <p>2000公斤</p>
                </div>
                <div class="tableItem tableAll">
                    <p>合计</p>
                    <p>2000公斤</p>
                </div>
            </div>
        </div>
    </div>
</template>

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
            .tableItem {
                display: flex;
                justify-content: flex-start;
                align-items: center;
                border-left: 1px solid #d2e8fd;
                border-right: 1px solid #d2e8fd;
                p {
                    width: 180px;
                    text-align: center;
                    padding: 12px 0;
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

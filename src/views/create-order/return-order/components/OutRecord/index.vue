<template>
  <div class="ub ub-ac top-box">
    <div class="mr-3">
      <span>{{ $t('return-order.outRecord.outQuantity') }}:</span>
      <span>100000</span>
    </div>
    <div class="mr-3">
      <span>{{ $t('return-order.outRecord.outAmount') }}:</span>
      <span>100000</span>
    </div>
  </div>
  <a-divider class="my-1" />
  <div class="mt-1 w100">
    <a-table
      class="ant-table-striped"
      :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
      bordered
      size="small"
      :columns="outRecordColumns"
      :row-key="(record: any) => record.id"
      :data-source="tableData"
      :pagination="pagination"
      :loading="loading"
      :scroll="{ x: 1550, y: scrollY }"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, index }">
        <template v-if="column.dataIndex === 'index'">
          <a>
            {{ (pagination.current - 1) * pagination.pageSize + parseInt(index) + 1 }}
          </a>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import useTable from '@/hooks/useTable'
import { useList } from '../../hooks/useReturnOrder'
const { pagination, loading, scrollY } = useTable()
// import { messageApi } from "@/helpers/msg-helper";
const { outRecordColumns } = useList()
// import { init } from "./server";
import { $t } from '@/i18n'
let tableData = reactive<any[]>([])

// 初始化
onMounted(() => {
  initData()
})
const initData = async () => {
  loading.value = true
  // let params = {
  //   pageNum: pagination.current,
  //   pageSize: pagination.pageSize
  // }
  // let { result } = await init(params);
  setTimeout(() => {
    const records = [
      {
        id: uuidv4(),
        productName: '品名',
        materialPN: '物料PN',
        materialNmae: '物料名称',
        unit: '单位',
        actualPurchaseUnitPrice: '实际采购单价（含税）',
        purchaseQuantity: '采购数量',
        actualPurchaseAmount: '实际采购金额（含税）',
        taxRate: '税率',
        taxAmount: '税额',
        remark: '备注'
      },
      {
        id: uuidv4(),
        productName: '品名',
        materialPN: '物料PN',
        materialNmae: '物料名称',
        unit: '单位',
        actualPurchaseUnitPrice: '实际采购单价（含税）',
        purchaseQuantity: '采购数量',
        actualPurchaseAmount: '实际采购金额（含税）',
        taxRate: '税率',
        taxAmount: '税额',
        remark: '备注'
      }
    ]
    loading.value = false
    tableData = records
  }, 1000)
}

// 改变页数
const handleTableChange = (page: any) => {
  pagination.current = page.current
  pagination.pageSize = page.pageSize
  initData()
}
</script>

<style lang="scss" scoped>
.top-box {
}
</style>

<template>
  <div class="ub ub-ac top-box">
    <div class="mr-3">
      <span>{{ $t('purchase.purchaseDetail.purchaseQuantity') }}:</span>
      <span>100000</span>
    </div>
    <div class="mr-3">
      <span>{{ $t('purchase.purchaseDetail.actualPurchaseAmount') }}:</span>
      <span>100000</span>
    </div>
    <div>
      <span>{{ $t('purchase.purchaseDetail.taxAmount') }}:</span>
      <span>100000</span>
    </div>
  </div>
  <a-divider class="my-1" />
  <div class="ub ub-ac top-opt w100" v-if="status === 'edit'">
    <a-button type="primary" @click="showAddBox">
      {{ $t('opts.add') }}
    </a-button>
    <a-button class="ml-1" type="primary" @click="showUploadPurchase = true">
      {{ $t('opts.import') }}
    </a-button>
    <x-confirm :data="{ orderId }" :confirm="deleteAll">
      <a-button class="ml-1" type="primary" danger>
        {{ $t('opts.deleteAll') }}
      </a-button>
    </x-confirm>
  </div>
  <div class="mt-1 w100">
    <a-table
      class="ant-table-striped"
      :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
      bordered
      size="small"
      :columns="columnsList"
      :row-key="(record: any) => record.id"
      :data-source="tableData"
      :pagination="pagination"
      :loading="loading"
      :scroll="{ x: 1550, y: scrollY }"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.dataIndex === 'index'">
          <a>
            {{ (pagination.current - 1) * pagination.pageSize + parseInt(index) + 1 }}
          </a>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-button type="link" size="small" @click="showEditBox(record)">{{ $t('opts.edit') }}</a-button>
          <x-confirm :data="record" :confirm="deleteItem">
            <a-button type="link" size="small" danger>{{ $t('opts.delete') }}</a-button>
          </x-confirm>
        </template>
      </template>
    </a-table>
  </div>
  <form-model v-model:show="formShow" :status="statusAdd" :cur-data="curData" />
  <UploadImport :title="$t('purchase.tab1')" v-model:show="showUploadPurchase" :order-id="orderId" />
</template>

<script setup lang="ts">
import { computed, ref, reactive, onMounted } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import FormModel from './formModel.vue'
import useTable from '@/hooks/useTable'
import { useList } from '../../hooks/usePurchase'
const { pagination, loading, scrollY } = useTable()
const { purchaseColumns } = useList()
// import { init } from "./server";
import { $t } from '@/i18n'
const props = defineProps({
  status: {
    type: String,
    default: ''
  },
  orderId: {
    type: String,
    default: ''
  }
})
const formShow = ref<boolean>(false)
const showUploadPurchase = ref<boolean>(false)
const statusAdd = ref<string>('add')
let tableData = reactive<any[]>([])
let curData = reactive({})
const columnsList = computed(() => {
  if (props.status === 'edit') {
    return purchaseColumns
  } else if (props.status === 'detail') {
    return purchaseColumns.filter((item) => item.dataIndex !== 'operation')
  } else {
    return purchaseColumns
  }
})
// 初始化
onMounted(() => {
  initData()
})
const deleteAll = (data: any) => {
  console.log(data, 111)
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 3000)
  })
}
const deleteItem = (record: any) => {
  console.log(record, 'record')
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), 3000)
  })
}
const showAddBox = () => {
  statusAdd.value = 'add'
  formShow.value = true
}
const showEditBox = (record: any) => {
  curData = record
  statusAdd.value = 'edit'
  formShow.value = true
}
const initData = async () => {
  loading.value = true
  // let params = {
  //   pageNum: pagination.current,
  //   pageSize: pagination.pageSize
  // }
  // let { result } = await init(params);
  setTimeout(() => {
    const result = {
      total: 2,
      records: [
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
    }
    loading.value = false
    const { total, records } = result
    console.log(records.length, 'recordsrecordsrecordsrecords')
    pagination.total = total
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

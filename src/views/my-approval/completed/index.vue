<template>
  <div class="search-wrapper">
    <a-card size="small">
      <a-form :model="formData" layout="inline">
        <a-form-item :label="$t('completed.columns.supplierName')">
          <a-select
            show-search
            :options="supplierList"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 240px"
            v-model:value="formData.belongOrg"
          />
        </a-form-item>
        <a-form-item :label="$t('completed.columns.customerName')">
          <a-select
            show-search
            :options="customerList"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 240px"
            v-model:value="formData.belongOrg"
          />
        </a-form-item>
        <a-form-item :label="$t('completed.columns.warehouseName')">
          <a-select
            show-search
            :options="warehouseList"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 240px"
            v-model:value="formData.belongOrg"
          />
        </a-form-item>
        <a-form-item :label="$t('completed.columns.businessTime')">
          <a-range-picker style="width: 340px" v-model:value="formData.businessTime" show-time />
        </a-form-item>
        <a-form-item :label="$t('completed.columns.orderType')">
          <a-select
            show-search
            :options="[]"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 240px"
            v-model:value="formData.belongOrg"
          />
        </a-form-item>
        <a-form-item :label="$t('completed.columns.orderNum')">
          <a-input style="width: 240px" allowClear :placeholder="$t('inputTips')" v-model:value="formData.version" />
        </a-form-item>
        <a-form-item :label="$t('completed.columns.OrderCompletionTime')">
          <a-range-picker style="width: 340px" v-model:value="formData.OrderCompletionTime" show-time />
        </a-form-item>
        <a-form-item>
          <div>
            <a-button type="primary"> {{ $t('opts.search') }}</a-button>
            <a-button class="ml-1">{{ $t('opts.reset') }}</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
  <a-card size="small">
    <div class="mt-1 w100">
      <a-table
        class="ant-table-striped"
        :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
        bordered
        size="small"
        :columns="columns"
        :row-key="(record: any) => record.id"
        :data-source="tableData"
        :pagination="pagination"
        :loading="loading"
        @change="handleTableChange"
        :scroll="{ x: 2450, y: scrollY }"
      >
        <template #bodyCell="{ column, index }">
          <template v-if="column.dataIndex === 'index'">
            <a>
              {{ (pagination.current - 1) * pagination.pageSize + parseInt(index) + 1 }}
            </a>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-button type="link" size="small">{{ $t('opts.view') }}</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { reactive, onMounted, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { useDicStore } from '@/store/modules/dic'
import useTable from '@/hooks/useTable'
import { useList } from './hooks/useCompleted'
const dic = useDicStore()
const { pagination, loading, scrollY } = useTable()
// import { messageApi } from "@/helpers/msg-helper";
// import { init } from "./server";
const { columns } = useList()
import { $t } from '@/i18n'
let tableData = reactive<any[]>([])
const formData = reactive({
  belongOrg: undefined,
  version: '',
  businessTime: [],
  OrderCompletionTime: []
})
const supplierList = computed(() => {
  return dic.supplierList
})
const customerList = computed(() => {
  return dic.customerList
})
const warehouseList = computed(() => {
  return dic.warehouseList
})
// 初始化
onMounted(() => {
  dic.initSupplierList()
  dic.initCustomerList()
  dic.initWarehouseList()
  initData()
})
const initData = async () => {
  loading.value = true
  // let params = {
  //   // belongOrg: formData.belongOrg,
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
          businessTime: '2024-02-28 12:10:13',
          approvalFinishTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单服务网VB方便发点吧',
          supplierName: '出VS啊AV大Vv',
          creater: '测试',
          orderNum: '242143532',
          orderType: '份额额度'
        },
        {
          id: uuidv4(),
          businessTime: '2024-02-28 12:10:13',
          approvalFinishTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单服务网VB方便发点吧',
          supplierName: '出VS啊AV大Vv',
          creater: '测试',
          orderNum: '242143532',
          orderType: '份额额度'
        }
      ]
    }
    loading.value = false
    const { total, records } = result
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

<style lang="scss" scoped></style>

<template>
  <div class="search-wrapper">
    <a-card size="small">
      <a-form :model="formData" layout="inline">
        <a-form-item :label="$t('return-order.columns.supplierName')">
          <a-select
            show-search
            :options="supplierList"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 240px"
            v-model:value="formData.belongOrg"
          />
        </a-form-item>
        <a-form-item :label="$t('return-order.columns.customerName')">
          <a-select
            show-search
            :options="customerList"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 240px"
            v-model:value="formData.belongOrg"
          />
        </a-form-item>
        <a-form-item :label="$t('return-order.columns.approvalStatus')">
          <a-select
            show-search
            :options="approvalStatusList"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 240px"
            v-model:value="formData.belongOrg"
          />
        </a-form-item>
        <a-form-item :label="$t('return-order.columns.paymentStatus')">
          <a-select
            show-search
            :options="payStatusList"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 240px"
            v-model:value="formData.belongOrg"
          />
        </a-form-item>
        <a-form-item :label="$t('return-order.columns.outStatus')">
          <a-select
            show-search
            :options="outStatusList"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 240px"
            v-model:value="formData.belongOrg"
          />
        </a-form-item>
        <a-form-item :label="$t('return-order.columns.returnOrder')">
          <a-input style="width: 240px" allowClear :placeholder="$t('inputTips')" v-model:value="formData.version" />
        </a-form-item>
        <a-form-item :label="$t('return-order.columns.returnReasons')">
          <a-select
            show-search
            :options="[]"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 240px"
            v-model:value="formData.belongOrg"
          />
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
    <div class="ub ub-ac top-opt w100">
      <a-button type="primary" @click="formShow = true">
        <template #icon>
          <PlusOutlined />
        </template>
        {{ $t('return-order.title') }}
      </a-button>
    </div>
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
        :scroll="{ x: 2450, y: scrollY }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, index }">
          <template v-if="column.dataIndex === 'index'">
            <a>
              {{ (pagination.current - 1) * pagination.pageSize + parseInt(index) + 1 }}
            </a>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-button type="link" size="small">{{ $t('opts.edit') }}</a-button>
            <a-button type="link" size="small" danger>{{ $t('opts.delete') }}</a-button>
            <a-button type="link" size="small">{{ $t('opts.cancel') }}</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </a-card>
  <CreateOrderForm v-model:show="formShow" @success="success" />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { v4 as uuidv4 } from 'uuid'
import CreateOrderForm from './components/CreateOrderForm.vue'
import { useDicStore } from '@/store/modules/dic'
import useTable from '@/hooks/useTable'
import { useList } from './hooks/useReturnOrder'
const dic = useDicStore()
const { pagination, loading, scrollY } = useTable()
// import { messageApi } from "@/helpers/msg-helper";
const { columns } = useList()
// import { init } from "./server";
import { $t } from '@/i18n'
const formShow = ref<boolean>(false)
let tableData = reactive<any[]>([])
const formData = reactive({
  belongOrg: undefined,
  version: '',
  createTime: []
})
const supplierList = computed(() => {
  return dic.supplierList
})
const customerList = computed(() => {
  return dic.customerList
})
const outStatusList = computed(() => {
  return dic.outStatusList
})
const payStatusList = computed(() => {
  return dic.payStatusList
})
const approvalStatusList = computed(() => {
  return dic.approvalStatusList
})
// 初始化
onMounted(() => {
  dic.initSupplierList()
  dic.initCustomerList()
  initData()
})
const success = () => {}
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
      total: 33,
      records: [
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单服务网VB方便发点吧',
          supplierName: '出VS啊AV大Vv',
          creater: '测试',
          orderNum: '242143532',
          orderType: '份额额度'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧',
          supplierName: '出VS啊AV大Vv',
          creater: '测试',
          orderNum: '242143532',
          orderType: '份额度'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服VB方便发点吧',
          supplierName: '出VS啊AV大Vv',
          creater: '测试',
          orderNum: '242143532',
          orderType: '份额额度'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服VB方便发点吧',
          supplierName: '出VS啊AV大Vv',
          creater: '测试',
          orderNum: '242143532',
          orderType: '份额额度'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB便发点吧',
          supplierName: '出VS啊AV大Vv',
          creater: '测试',
          orderNum: '242143532',
          orderType: '份额额度'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便发巴巴v的',
          warehouseName: '单位服务网方便发点吧',
          supplierName: '出VS啊AV大Vv',
          creater: '测试',
          orderNum: '242143532',
          orderType: '份额额度'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧',
          supplierName: '出VS啊AV大Vv',
          creater: '测',
          orderNum: '2421532',
          orderType: '份额度'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐D方便v发巴巴v的',
          warehouseName: '单位服务网VB方点吧',
          supplierName: '出VS啊AV大Vv',
          creater: '测试',
          orderNum: '242132',
          orderType: '份额额度'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐D方便v发巴巴v的',
          warehouseName: '单位VB方便发点吧',
          supplierName: '出VS啊大Vv',
          creater: '测试',
          orderNum: '242143532',
          orderType: '份额额度'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
        },
        {
          id: uuidv4(),
          createTime: '2024-02-28 12:10:13',
          customerName: '吃大餐DVDv方便v发巴巴v的',
          warehouseName: '单位服务网VB方便发点吧单位服务网VB方便发点吧',
          supplierName: '出VV大Vv',
          creater: '测试ss',
          orderNum: '242143532',
          orderType: '份额'
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

<style lang="scss" scoped></style>

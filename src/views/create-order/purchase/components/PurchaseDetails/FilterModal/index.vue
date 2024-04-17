<template>
  <div class="filter-modal-wrapper" ref="mymodal">
    <!-- <a-modal
      centered
      :getContainer="() => $refs.mymodal"
      v-model:open="showValue"
      :title="$t('emissionDataReport.factor.title')"
      width="80%"
      :cancelText="$t('opts.cancel')"
      :okText="$t('opts.sure')"
      @ok="handleOk"
    > -->
    <a-drawer
      v-model:open="showValue"
      :title="$t('purchase.purchaseDetail.materialPN')"
      width="80%"
      placement="right"
      @onAfterOpenChange="afterVisibleChange"
    >
      <a-form :model="formData" layout="inline">
        <a-form-item>
          <a-select
            :options="pnTypeList"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 180px"
            v-model:value="formData.pnTypeValue"
          />
        </a-form-item>
        <a-form-item>
          <a-select
            :options="pnList"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 180px"
            v-model:value="formData.pnValue"
          />
        </a-form-item>
        <a-form-item :label="$t('purchase.purchaseDetail.materialName')">
          <a-select
            :options="materialNameList"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 180px"
            v-model:value="formData.materialName"
          />
        </a-form-item>

        <a-form-item>
          <div style="text-align: right">
            <a-button type="primary" @click="search">{{ $t('opts.search') }}</a-button>
            <a-button class="ml-1" @click="reset">{{ $t('opts.reset') }}</a-button>
          </div>
        </a-form-item>
      </a-form>
      <div class="mt-1 w100">
        <a-table
          class="ant-table-striped"
          :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
          size="small"
          bordered
          :row-selection="rowSelection()"
          :columns="columns"
          :row-key="(record: any) => record.id"
          :data-source="dataSource"
          :pagination="pagination"
          :loading="loading"
          :scroll="{ y: 'calc(100vh - 400px)' }"
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
      <div class="ub w100 ub-ac ub-pc opts">
        <a-button class="mr-1" @click="cancel">{{ $t('opts.cancel') }}</a-button>
        <a-button type="primary" @click="handleOk"> {{ $t('opts.sure') }}</a-button>
      </div>
    </a-drawer>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, reactive, ref, onMounted } from 'vue'
// import { init } from './server'
import useFilterModal from './hooks/useFilterModal'
const { columns } = useFilterModal()
import useTable from '@/hooks/useTable'
const { pagination, selectedRowKeys, selectedRows, rowSelection, clearTableSelected } = useTable()
import { $t } from '@/i18n'
const emit = defineEmits(['update:show', 'success'])
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  selectedIds: {
    type: Array,
    default: () => []
  }
})
const pnTypeList = ref([
  {
    label: $t('purchase.purchaseDetail.materialPN'),
    value: 'skuPn'
  },
  {
    label: $t('purchase.purchaseDetail.manufacturerPN'),
    value: 'manufacturerPn'
  },
  {
    label: $t('purchase.purchaseDetail.supplierPN'),
    value: 'supplierPn'
  }
])
const pnList = ref([])

const materialNameList = ref([])

const formData = reactive({
  pnTypeValue: 'skuPn',
  pnValue: undefined,
  materialName: undefined
})
const showValue = computed({
  get() {
    return props.show
  },
  set(value: boolean) {
    emit('update:show', value)
  }
})
const loading = ref<boolean>(false)
let dataSource = reactive<any[]>([])

onMounted(() => {})
watch(
  () => formData.pnTypeValue,
  (newValue) => {
    if (newValue) {
      initPNList()
    }
  }
)
// 初始化pn列表
const initPNList = () => {
  // let params = {
  //   pageNum: pagination.current,
  //   pageSize: pagination.pageSize
  // }
  // pnList.value = []
}
watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      if (props.selectedIds.length) {
        selectedRowKeys.value = props.selectedIds.map((item: any) => item)
      }
      initData()
    } else {
      resetForm()
      pagination.current = 1
    }
  }
)
// 初始化物料PN列表
const initData = async () => {
  loading.value = true
  // let params = {
  //   name: formData.name,
  //   publishYear: formData.publishYear,
  //   publishOrg: formData.publishOrg,
  //   sitable: formData.sitable,
  //   pageNum: pagination.current,
  //   pageSize: pagination.pageSize
  // }
  // let { result } = await init(params)
  // loading.value = false
  // const { total, records } = result
  // pagination.total = total
  // dataSource = records
  setTimeout(() => {
    loading.value = false
    pagination.total = 5
    dataSource = [
      {
        id: '1',
        productName: '测试',
        materialPN: '1425436frgrr',
        materialName: '测试',
        supplierPN: '测试',
        manufacturerPN: '测试'
      },

      {
        id: '2',
        productName: '测试',
        materialPN: '1425436frgrr',
        materialName: '测试',
        supplierPN: '测试',
        manufacturerPN: '测试'
      }
    ]
  }, 1000)
}
// 查询
const search = () => {
  pagination.current = 1
  initData()
}
// 重置
const reset = () => {
  resetForm()
  pagination.current = 1
  initData()
}
// 改变页数
const handleTableChange = (page: any) => {
  pagination.current = page.current
  pagination.pageSize = page.pageSize
  initData()
}
const resetForm = () => {
  clearTableSelected()
  formData.pnTypeValue = 'skuPn'
  formData.pnValue = undefined
  formData.materialName = undefined
}
const cancel = () => {
  emit('update:show', false)
  resetForm()
}
const handleOk = () => {
  emit('success', selectedRows.value)
  emit('update:show', false)
}

const afterVisibleChange = (val: boolean) => {
  if (!val) {
    formData.pnTypeValue = 'skuPn'
    formData.pnValue = undefined
    formData.materialName = undefined
  }
}
</script>

<style lang="scss" scoped>
.opts {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 50px;
}
</style>

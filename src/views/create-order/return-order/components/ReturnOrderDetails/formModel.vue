<template>
  <div class="modal-wrapper" ref="mymodal">
    <a-modal
      centered
      :getContainer="() => $refs.mymodal"
      v-model:open="showValue"
      :title="$t('opts.add')"
      width="70%"
      :cancelText="$t('opts.cancel')"
      :okText="$t('opts.sure')"
      :afterClose="afterClose"
      @ok="handleOk"
    >
      <a-form :model="formData" layout="inline">
        <a-form-item :label="$t('return-order.returnOrderDetail.batch')">
          <a-input allowClear :placeholder="$t('inputTips')" v-model:value="formData.batchNo" />
        </a-form-item>

        <a-form-item>
          <div style="text-align: right">
            <a-button type="primary" @click="search">{{ $t('opts.search') }}</a-button>
            <a-button class="ml-1" @click="reset">{{ $t('opts.reset') }}</a-button>
          </div>
        </a-form-item>
        <div class="mt-1 w100">
          <a-table
            class="ant-table-striped"
            :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
            size="small"
            bordered
            :columns="returnOrderSourceColumns"
            :row-key="(record: any) => record.id"
            :data-source="dataSource"
            :pagination="false"
            :loading="loading"
          >
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.dataIndex === 'index'">
                <a>
                  {{ parseInt(index) + 1 }}
                </a>
              </template>
              <template v-if="column.dataIndex === 'returnQuantity'">
                <a-form-item :validate-status="getValidateStatus(record, 'returnQuantity')">
                  <a-input
                    allowClear
                    :placeholder="$t('placeholder10')"
                    v-model:value="record.returnQuantity"
                    @blur="blurWay(record, 'returnQuantity')"
                  />
                </a-form-item>
              </template>
              <template v-if="column.dataIndex === 'remark'">
                <a-input :maxlength="100" allowClear :placeholder="$t('placeholder9')" v-model:value="record.remark" />
              </template>
            </template>
          </a-table>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
// import { Form,message } from 'ant-design-vue';
// import FilterModal from './FilterModal/index.vue'
import { message } from 'ant-design-vue'
import { $t } from '@/i18n'
import { useList } from '../../hooks/useReturnOrder'
// import dayjs, { Dayjs } from 'dayjs'
// import { add } from './server'

const { returnOrderSourceColumns } = useList()
const emit = defineEmits(['update:show', 'success'])

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    default: 'add'
  },
  curData: {
    type: Object,
    default: () => {}
  }
})
const loading = ref<boolean>(false)
const dataSource = ref<any[]>([])
onMounted(() => {
  initData()
})

interface formDataProp {
  batchNo: string
}
const formData = reactive<formDataProp>({
  batchNo: ''
})
const pattern = /^[1-9]\d*$/
const getValidateStatus = (record: any, field: string) => {
  if (pattern.test(record[field]) || record[field] === '') {
    return 'success'
  } else {
    return 'error'
  }
}
const blurWay = (record: any, field: string) => {
  if (record[field] === '') {
    return
  }
  if (!pattern.test(record[field]) || record[field] === '0') {
    message.warning($t('return-order.tip2'))
    record[field] = ''
  }
  if (record.inventoryQuantity && record[field] > record.inventoryQuantity) {
    message.warning($t('return-order.tip1'))
    record[field] = ''
  }
}
const handleOk = () => {
  const _dataSource = dataSource.value.filter((item) => item.returnQuantity !== '')
  if (_dataSource.length > 0) {
    if (_dataSource.some((item) => !pattern.test(item.returnQuantity) || item.returnQuantity === '0')) {
      message.warning($t('return-order.tip2'))
      return
    }
    if (_dataSource.some((item) => item.inventoryQuantity && record.returnQuantity > record.inventoryQuantity)) {
      message.warning($t('return-order.tip1'))
      return
    }
    // 处理接口
  }
}
// 初始化退货明细数据源列表
const initData = async () => {
  loading.value = true
  // let params = {
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
    dataSource.value = [
      {
        id: '1',
        batch: '批次号',
        productName: '品名',
        materialPN: '物料PN',
        materialName: '物料名称',
        unit: '单位',
        returnQuantity: '2',
        remark: '424',
        boxNum: '箱号',
        qualityLevel: '物料品质',
        inventoryQuantity: 20
      }
    ]
  }, 1000)
}
// 查询
const search = () => {
  initData()
}
// 重置
const reset = () => {
  resetForm()
  initData()
}

const showValue = computed({
  get() {
    return props.show
  },
  set(value: boolean) {
    emit('update:show', value)
  }
})
const afterClose = () => {
  resetForm()
}
const resetForm = () => {
  formData.batchNo = ''
}
</script>

<style lang="scss" scoped></style>

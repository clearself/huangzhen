<template>
  <div class="modal-wrapper" ref="mymodal">
    <a-modal
      centered
      :getContainer="() => $refs.mymodal"
      v-model:open="showValue"
      :title="$t('purchase.title')"
      width="800px"
      :cancelText="$t('opts.cancel')"
      :okText="$t('opts.nextStep')"
      :afterClose="afterClose"
      @ok="handleOk"
    >
      <a-form :model="formData" layout="vertical">
        <s-row :gutter="20">
          <s-col :span="12">
            <a-form-item :label="$t('purchase.columns.warehouseName')" v-bind="validateInfos.warehouseName">
              <a-select
                show-search
                :options="warehouseList"
                allowClear
                :placeholder="$t('selectTips')"
                style="width: 100%"
                v-model:value="formData.warehouseName"
              />
            </a-form-item>
          </s-col>
          <s-col :span="12">
            <a-form-item :label="$t('purchase.columns.customerName')" v-bind="validateInfos.customerName">
              <a-select
                show-search
                :options="customerList"
                allowClear
                :placeholder="$t('selectTips')"
                style="width: 100%"
                v-model:value="formData.customerName"
              />
            </a-form-item>
          </s-col>
        </s-row>
        <s-row :gutter="20">
          <s-col :span="12">
            <a-form-item :label="$t('purchase.columns.supplierName')" v-bind="validateInfos.supplierName">
              <a-select
                show-search
                :options="supplierList"
                allowClear
                :placeholder="$t('selectTips')"
                style="width: 100%"
                v-model:value="formData.supplierName"
              />
            </a-form-item>
          </s-col>
          <s-col :span="12">
            <a-form-item :label="$t('purchase.columns.businessTime')" v-bind="validateInfos.businessTime">
              <a-date-picker
                style="width: 100%"
                allowClear
                value-format="YYYY-MM-DD HH:mm:ss"
                :placeholder="$t('selectTips')"
                :disabled-date="disabledDate"
                v-model:value="formData.businessTime"
              />
            </a-form-item>
          </s-col>
        </s-row>
        <s-row :gutter="20">
          <s-col :span="12">
            <a-form-item :label="$t('purchase.columns.purchaseReasons')" v-bind="validateInfos.purchaseReasons">
              <a-select
                show-search
                :options="purchaseReasons"
                allowClear
                :placeholder="$t('selectTips')"
                style="width: 100%"
                v-model:value="formData.purchaseReasons"
              />
            </a-form-item>
          </s-col>
          <s-col :span="12">
            <a-form-item :label="$t('purchase.columns.payMethod')" v-bind="validateInfos.payMethod">
              <a-select
                show-search
                :options="payMethodList"
                allowClear
                :placeholder="$t('selectTips')"
                style="width: 100%"
                v-model:value="formData.payMethod"
              />
            </a-form-item>
          </s-col>
        </s-row>

        <s-row :gutter="20">
          <s-col :span="12">
            <a-form-item :label="$t('purchase.columns.currency')" v-bind="validateInfos.currency">
              <a-select
                show-search
                :options="currencyList"
                allowClear
                :placeholder="$t('selectTips')"
                style="width: 100%"
                v-model:value="formData.currency"
              />
            </a-form-item>
          </s-col>
          <s-col :span="12">
            <a-form-item
              :label="$t('purchase.columns.otherExpenses')"
              name="otherExpenses"
              v-bind="validateInfos.otherExpenses"
            >
              <a-input allowClear :placeholder="$t('placeholder0')" v-model:value="formData.otherExpenses" />
            </a-form-item>
          </s-col>
        </s-row>
        <s-row :gutter="20">
          <s-col :span="12">
            <a-form-item :label="$t('purchase.columns.planArrivalTime')" v-bind="validateInfos.planArrivalTime">
              <a-date-picker
                style="width: 100%"
                allowClear
                value-format="YYYY-MM-DD HH:mm:ss"
                :placeholder="$t('selectTips')"
                v-model:value="formData.planArrivalTime"
              />
            </a-form-item>
          </s-col>
          <s-col :span="12">
            <a-form-item :label="$t('purchase.columns.sendOrderNumber')">
              <a-input
                :maxlength="100"
                allowClear
                :placeholder="$t('placeholder9')"
                v-model:value="formData.sendOrderNum"
              />
            </a-form-item>
          </s-col>
        </s-row>
        <s-row :gutter="20">
          <s-col :span="12">
            <a-form-item :label="$t('purchase.columns.remark')">
              <a-input :maxlength="100" allowClear :placeholder="$t('placeholder9')" v-model:value="formData.remark" />
            </a-form-item>
          </s-col>
        </s-row>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
// import { Form,message } from 'ant-design-vue';
import { useRouter } from 'vue-router' //路由
import { Form } from 'ant-design-vue'

import { $t } from '@/i18n'
import { overZeroSaveTwo } from '@/utils/rule'
import dayjs, { Dayjs } from 'dayjs'
// import { add } from './server'
import { useDicStore } from '@/store/modules/dic'
const dic = useDicStore()
const useForm = Form.useForm

const router = useRouter() // 路由
const emit = defineEmits(['update:show', 'success'])

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
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
const currencyList = computed(() => {
  return dic.currencyList
})
const purchaseReasons = computed(() => {
  return dic.purchaseReasons
})
const payMethodList = computed(() => {
  return dic.payMethodList
})

onMounted(() => {
  dic.initSupplierList()
  dic.initCustomerList()
  dic.initWarehouseList()
})
const disabledDate = (current: Dayjs) => {
  return current && current > dayjs().endOf('day')
}
const formData = reactive({
  warehouseName: undefined,
  customerName: undefined,
  supplierName: undefined,
  businessTime: '',
  purchaseReasons: undefined,
  payMethod: undefined,
  currency: undefined,
  otherExpenses: '',
  planArrivalTime: '',
  sendOrderNum: '',
  remark: ''
})
const rulesRef = reactive({
  warehouseName: [
    {
      required: true,
      message: $t('selectTips')
    }
  ],
  customerName: [
    {
      required: true,
      message: $t('selectTips')
    }
  ],
  supplierName: [
    {
      required: true,
      message: $t('selectTips')
    }
  ],
  businessTime: [
    {
      required: true,
      message: $t('selectTips')
    }
  ],
  purchaseReasons: [
    {
      required: true,
      message: $t('selectTips')
    }
  ],
  payMethod: [
    {
      required: true,
      message: $t('selectTips')
    }
  ],
  currency: [
    {
      required: true,
      message: $t('selectTips')
    }
  ],
  otherExpenses: [
    {
      validator: overZeroSaveTwo
    }
  ],
  planArrivalTime: [
    {
      message: $t('selectTips')
    }
  ]
})
const { resetFields, validate, validateInfos } = useForm(formData, rulesRef, {
  onValidate: (...args) => console.log(...args)
})
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
  resetFields()
  formData.remark = ''
}
const handleOk = () => {
  validate()
    .then(async () => {
      // const params = {
      //   belongOrg: formData.belongOrg,
      //   versionName: formData.version,
      //   estableContent: formData.developContent,
      //   estableDate: formData.developTime,
      //   remark: formData.remark
      // }
      // 添加接口
      // const reponse = await add(params)
      // if (reponse?.code === '0') {
      //   showValue.value = false
      //   messageApi.success($t('opeateSuccess'))
      //   emit('success')
      // }
      localStorage.setItem('orderInfo', JSON.stringify(formData))
      router.push({
        path: '/views/create-order/purchase/edit/1213213',
        query: {
          type: 1
        }
      })
    })
    .catch((err) => {
      console.log('error', err)
    })
}
</script>

<style lang="scss" scoped></style>

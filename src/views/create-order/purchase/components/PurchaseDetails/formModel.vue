<template>
  <div class="modal-wrapper" ref="mymodal">
    <a-modal
      centered
      :getContainer="() => $refs.mymodal"
      v-model:open="showValue"
      :title="status === 'add' ? $t('opts.add') : $t('opts.edit')"
      width="600px"
      :cancelText="$t('opts.cancel')"
      :okText="$t('opts.sure')"
      :afterClose="afterClose"
      @ok="handleOk"
    >
      <a-form class="w100" :model="formData" labelWrap :labelCol="{ style: { width: '180px' } }">
        <a-form-item :label="$t('purchase.purchaseDetail.materialPN')" v-bind="validateInfos.materialPN">
          <div v-if="status === 'add'" class="select-box" @click="showSelector = true">
            {{ formData.materialPN ? formData.materialPN : $t('selectTips') }}
          </div>
          <span v-else>{{ formData.materialPN }}</span>
        </a-form-item>
        <a-form-item :label="$t('purchase.purchaseDetail.productName')">
          <span />
        </a-form-item>
        <a-form-item :label="$t('purchase.purchaseDetail.materialName')">
          <span />
        </a-form-item>
        <a-form-item :label="$t('purchase.purchaseDetail.unit')" v-bind="validateInfos.unit">
          <a-input
            allowClear
            :maxlength="20"
            :placeholder="$t('purchase.placeholder1')"
            v-model:value.trim="formData.unit"
          />
        </a-form-item>
        <a-form-item
          :label="$t('purchase.purchaseDetail.actualPurchaseUnitPrice')"
          v-bind="validateInfos.actualPurchaseUnitPrice"
        >
          <a-input
            allowClear
            :placeholder="$t('purchase.placeholder2')"
            v-model:value.trim="formData.actualPurchaseUnitPrice"
          />
        </a-form-item>
        <a-form-item :label="$t('purchase.purchaseDetail.purchaseQuantity')" v-bind="validateInfos.purchaseQuantity">
          <a-input allowClear :placeholder="$t('purchase.placeholder3')" v-model:value="formData.purchaseQuantity" />
        </a-form-item>
        <a-form-item :label="$t('purchase.purchaseDetail.actualPurchaseAmount')">
          <span>{{ formData.actualPurchaseAmount }}</span>
        </a-form-item>
        <a-form-item :label="$t('purchase.purchaseDetail.taxRate')" v-bind="validateInfos.taxRate">
          <a-input allowClear :placeholder="$t('purchase.placeholder4')" v-model:value="formData.taxRate" />
        </a-form-item>

        <a-form-item :label="$t('purchase.purchaseDetail.taxAmount')">
          <span>{{ formData.taxAmount }}</span>
        </a-form-item>
        <a-form-item :label="$t('purchase.purchaseDetail.remark')">
          <a-textarea
            :maxlength="100"
            showCount
            allowClear
            :placeholder="$t('purchase.placeholder9')"
            v-model:value="formData.remark"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
  <FilterModal v-model:show="showSelector" @success="onSuccess" :selectedIds="selectedIds" />
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watchEffect, watch } from 'vue'
// import { Form,message } from 'ant-design-vue';
import FilterModal from './FilterModal/index.vue'
// import { messageApi } from '@/helpers/msg-helper'
import { useRouter } from 'vue-router' //路由

import { Form } from 'ant-design-vue'
import type { Rule } from 'ant-design-vue/es/form'
import { accAdd, accMul, accDiv } from '@/utils/tools'
import { $t } from '@/i18n'
// import dayjs, { Dayjs } from 'dayjs'
// import { add } from './server'
const useForm = Form.useForm

const router = useRouter() // 路由
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
const showSelector = ref(false)
const selectedIds = ref([])
onMounted(() => {})
// const disabledDate = (current: Dayjs) => {
//   return current && current > dayjs().endOf('day')
// }

const onSuccess = (keys: any) => {
  console.log(keys, 'keys')
  // 赋值选中的物料pn
}
interface formDataProp {
  materialPN: string
  productName: string
  materialName: string
  unit: string
  actualPurchaseUnitPrice: string | number
  purchaseQuantity: string | number
  actualPurchaseAmount: string | number
  taxRate: string | number
  taxAmount: string | number
  remark: string
}
const formData = reactive<formDataProp>({
  materialPN: '',
  productName: '',
  materialName: '',
  unit: '',
  actualPurchaseUnitPrice: '',
  purchaseQuantity: '',
  actualPurchaseAmount: '',
  taxRate: '',
  taxAmount: '',
  remark: ''
})
watch(
  () => formData.unit,
  (newVal) => {
    console.log(newVal, 'newVal')
  }
)
watchEffect(() => {
  const num = accMul(formData.actualPurchaseUnitPrice, formData.purchaseQuantity)
  formData.actualPurchaseAmount = num.toFixed(2)
  // 分子
  const nominator = accDiv(formData.taxRate, 100)
  // 分母
  const denominator = accAdd(1, nominator)
  // 税率
  const taxRate = accDiv(nominator, denominator)
  // 税额
  formData.taxAmount = accMul(num, taxRate).toFixed(2)
})
const validActualPurchaseUnitPrice = async (_rule: Rule, value: string) => {
  const re = /^\d+(\.\d{1,2})?$/
  if (!re.test(value)) {
    return Promise.reject($t('purchase.placeholder2'))
  } else if (value === '0') {
    return Promise.resolve()
  } else {
    return Promise.resolve()
  }
}
const validPurchaseQuantity = async (_rule: Rule, value: string) => {
  const re = /^[1-9]\d*$/
  if (re.test(value)) {
    return Promise.resolve()
  } else {
    return Promise.reject($t('purchase.placeholder3'))
  }
}

const rulesRef = reactive({
  materialPN: [
    {
      required: true,
      message: $t('selectTips')
    }
  ],
  unit: [
    {
      required: true,
      message: $t('purchase.placeholder1')
    }
  ],
  actualPurchaseUnitPrice: [
    {
      required: true,
      validator: validActualPurchaseUnitPrice
    }
  ],
  purchaseQuantity: [
    {
      required: true,
      validator: validPurchaseQuantity
    }
  ],
  actualPurchaseAmount: [
    {
      required: true,
      message: $t('inputTips')
    }
  ],
  taxRate: [
    {
      validator: validActualPurchaseUnitPrice
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

<style lang="scss" scoped>
.select-box {
  position: relative;
  display: inline-flex;
  width: 100%;
  min-width: 0;
  padding: 4px 11px;
  color: rgba(0, 0, 0, 0.2);
  font-size: 14px;
  line-height: 1.5714285714285714;
  background-color: #ffffff;
  background-image: none;
  border-width: 1px;
  border-style: solid;
  border-color: #d9d9d9;
  border-radius: 6px;
  transition: all 0.2s;
  cursor: pointer;
}
</style>

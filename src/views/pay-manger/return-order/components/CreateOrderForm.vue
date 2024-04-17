<template>
  <div class="modal-wrapper" ref="mymodal">
    <a-modal
      :getContainer="() => $refs.mymodal"
      v-model:open="showValue"
      :title="$t('return-pay-order.title')"
      width="600px"
      :cancelText="$t('opts.cancel')"
      :okText="$t('opts.nextStep')"
      :afterClose="afterClose"
      @ok="handleOk"
    >
      <a-form :model="formData" labelWrap :labelCol="{ style: { width: '150px' } }">
        <a-form-item :label="$t('return-pay-order.columns.mappingOrder')" v-bind="validateInfos.purchaseOrder">
          <div class="select-box" @click="showSelector = true">
            {{ formData.purchaseOrder ? formData.purchaseOrder : $t('selectTips') }}
          </div>
        </a-form-item>
        <a-form-item :label="$t('return-pay-order.columns.payTime')" v-bind="validateInfos.payTime">
          <a-date-picker
            style="width: 100%"
            allowClear
            show-time
            value-format="YYYY-MM-DD HH:mm:ss"
            :placeholder="$t('selectTips')"
            v-model:value="formData.payTime"
          />
        </a-form-item>
        <a-form-item :label="$t('return-pay-order.columns.payType')" v-bind="validateInfos.payType">
          <a-select
            show-search
            :options="payTypeList"
            allowClear
            :placeholder="$t('selectTips')"
            style="width: 100%"
            v-model:value="formData.payType"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
  <MapPurchaseOrder v-model:show="showSelector" @success="onSuccess" :selectedIds="selectedIds" from="3" />
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router' //路由

import { Form } from 'ant-design-vue'

import { $t } from '@/i18n'
// import dayjs, { Dayjs } from 'dayjs'
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
const showSelector = ref(false)
const selectedIds = ref([])

const payTypeList = computed(() => {
  return dic.payTypeList
})
onMounted(() => {})
const formData = reactive({
  purchaseOrder: '',
  payTime: '',
  payType: undefined
})
const rulesRef = reactive({
  purchaseOrder: [
    {
      required: true,
      message: $t('selectTips')
    }
  ],
  payTime: [
    {
      required: true,
      message: $t('selectTips')
    }
  ],
  payType: [
    {
      required: true,
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
const onSuccess = (data: any) => {
  //purchaseOrder
  console.log(data, 'data')
  formData.purchaseOrder = data[0].purchaseOrder
  // 赋值选中的物料pn
}

const afterClose = () => {
  resetForm()
}
const resetForm = () => {
  resetFields()
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
        path: '/views/pay-manger/return-order/edit/1213213',
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

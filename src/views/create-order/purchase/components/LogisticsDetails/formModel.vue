<template>
  <div class="modal-wrapper" ref="mymodal">
    <a-modal
      centered
      :getContainer="() => $refs.mymodal"
      v-model:open="showValue"
      :title="status === 'add' ? $t('opts.add') : $t('opts.edit')"
      width="500px"
      :cancelText="$t('opts.cancel')"
      :okText="$t('opts.sure')"
      :afterClose="afterClose"
      @ok="handleOk"
    >
      <a-form class="w100" :model="formData" labelWrap :labelCol="{ style: { width: '110px' } }">
        <a-form-item
          :label="$t('purchase.logisticsDetail.logisticsCompanyName')"
          v-bind="validateInfos.logisticsCompanyName"
        >
          <a-input
            allowClear
            :maxlength="50"
            :placeholder="$t('purchase.placeholder6')"
            v-model.trim:value="formData.logisticsCompanyName"
          />
        </a-form-item>
        <a-form-item :label="$t('purchase.logisticsDetail.logisticsMethods')" v-bind="validateInfos.logisticsMethods">
          <a-input
            allowClear
            :maxlength="50"
            :placeholder="$t('purchase.placeholder6')"
            v-model.trim:value="formData.logisticsMethods"
          />
        </a-form-item>
        <a-form-item :label="$t('purchase.logisticsDetail.contacts')">
          <a-input
            allowClear
            :maxlength="50"
            :placeholder="$t('purchase.placeholder7')"
            v-model.trim:value="formData.contacts"
          />
        </a-form-item>
        <a-form-item :label="$t('purchase.logisticsDetail.contactInformation')">
          <a-input
            allowClear
            :maxlength="50"
            :placeholder="$t('purchase.placeholder7')"
            v-model.trim:value="formData.contactInformation"
          />
        </a-form-item>
        <a-form-item :label="$t('purchase.logisticsDetail.logisticsTrackingNumber')">
          <a-input
            allowClear
            :maxlength="100"
            :placeholder="$t('purchase.placeholder9')"
            v-model.trim:value="formData.logisticsTrackingNumber"
          />
        </a-form-item>
        <a-form-item :label="$t('purchase.logisticsDetail.licensePlateNumber')">
          <a-input
            allowClear
            :maxlength="50"
            :placeholder="$t('purchase.placeholder7')"
            v-model.trim:value="formData.licensePlateNumber"
          />
        </a-form-item>
        <a-form-item :label="$t('purchase.purchaseDetail.remark')">
          <a-textarea
            :maxlength="100"
            showCount
            allowClear
            :placeholder="$t('purchase.placeholder9')"
            v-model.trim:value="formData.remark"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, onMounted } from 'vue'
// import { Form,message } from 'ant-design-vue';
// import { messageApi } from '@/helpers/msg-helper'

import { Form } from 'ant-design-vue'
import { $t } from '@/i18n'
// import dayjs, { Dayjs } from 'dayjs'
// import { add } from './server'
const useForm = Form.useForm
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
onMounted(() => {})
interface formDataProp {
  logisticsCompanyName: string
  logisticsMethods: string
  contacts: string
  contactInformation: string
  logisticsTrackingNumber: string
  licensePlateNumber: string
  remark: string
}
const formData = reactive<formDataProp>({
  logisticsCompanyName: '',
  logisticsMethods: '',
  contacts: '',
  contactInformation: '',
  logisticsTrackingNumber: '',
  licensePlateNumber: '',
  remark: ''
})
const rulesRef = reactive({
  logisticsCompanyName: [
    {
      required: true,
      message: $t('purchase.placeholder6')
    }
  ],
  logisticsMethods: [
    {
      required: true,
      message: $t('purchase.placeholder6')
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
      //   logisticsCompanyName: formData.logisticsCompanyName,
      //   logisticsMethods: formData.logisticsMethods,
      //   contacts: formData.contacts,
      //   contactInformation: formData.contactInformation,
      //   logisticsTrackingNumber: formData.logisticsTrackingNumber,
      //   licensePlateNumber: formData.licensePlateNumber,
      //   remark: formData.remark
      // }
      // 添加接口
      // const reponse = await add(params)
      // if (reponse?.code === '0') {
      //   showValue.value = false
      //   messageApi.success($t('opeateSuccess'))
      //   emit('success')
      // }
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

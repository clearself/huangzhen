<template>
  <div class="modal-wrapper" :class="{ 'modal-footer': status }" ref="mymodal">
    <a-modal
      centered
      :getContainer="() => $refs.mymodal"
      v-model:open="showValue"
      :title="$t('return-order.columns.senderInfo')"
      :cancelText="$t('opts.cancel')"
      :okText="$t('opts.sure')"
      :afterClose="afterClose"
      @ok="handleOk"
    >
      <a-form :model="formData" labelWrap :labelCol="{ style: { width: '120px' } }">
        <a-form-item :label="$t('return-order.sender.name')" v-bind="validateInfos.name">
          <a-input
            :disabled="status"
            :maxlength="50"
            allowClear
            :placeholder="$t('placeholder6')"
            v-model:value="formData.name"
          />
        </a-form-item>
        <a-form-item :label="$t('return-order.sender.tel')" v-bind="validateInfos.tel">
          <a-input
            :disabled="status"
            :maxlength="50"
            allowClear
            :placeholder="$t('placeholder6')"
            v-model:value="formData.tel"
          />
        </a-form-item>
        <a-form-item :label="$t('return-order.sender.country')">
          <a-input
            :disabled="status"
            :maxlength="100"
            allowClear
            :placeholder="$t('placeholder9')"
            v-model:value="formData.country"
          />
        </a-form-item>
        <a-form-item :label="$t('return-order.sender.province')">
          <a-input
            :disabled="status"
            :maxlength="100"
            allowClear
            :placeholder="$t('placeholder9')"
            v-model:value="formData.province"
          />
        </a-form-item>
        <a-form-item :label="$t('return-order.sender.city')">
          <a-input
            :disabled="status"
            :maxlength="100"
            allowClear
            :placeholder="$t('placeholder9')"
            v-model:value="formData.city"
          />
        </a-form-item>
        <a-form-item :label="$t('return-order.sender.street')">
          <a-input
            :disabled="status"
            :maxlength="100"
            allowClear
            :placeholder="$t('placeholder9')"
            v-model:value="formData.street"
          />
        </a-form-item>
        <a-form-item :label="$t('return-order.sender.address')">
          <a-input
            :disabled="status"
            :maxlength="100"
            allowClear
            :placeholder="$t('placeholder9')"
            v-model:value="formData.address"
          />
        </a-form-item>
        <a-form-item :label="$t('return-order.sender.code')">
          <a-input
            :disabled="status"
            :maxlength="100"
            allowClear
            :placeholder="$t('placeholder9')"
            v-model:value="formData.code"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { Form } from 'ant-design-vue'
import { $t } from '@/i18n'
const useForm = Form.useForm
const emit = defineEmits(['update:show', 'confirm'])
const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  status: {
    type: Boolean,
    default: false
  },
  info: {
    type: Object,
    default: () => {}
  }
})
const formData = reactive({
  name: props.info?.name,
  tel: props.info?.tel,
  country: props.info?.country,
  province: props.info?.province,
  city: props.info?.city,
  street: props.info?.street,
  address: props.info?.address,
  code: props.info?.code
})
const rulesRef = reactive({
  name: [
    {
      required: true,
      message: $t('placeholder6')
    }
  ],
  tel: [
    {
      required: true,
      message: $t('placeholder6')
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
}
const handleCancel = () => {
  emit('update:show', false)
}
const handleOk = () => {
  validate()
    .then(async () => {
      emit('confirm', formData)
    })
    .catch((err) => {
      console.log('error', err)
    })
}
</script>

<style lang="scss" scoped>
.modal-footer :deep(.ant-modal .ant-modal-footer) {
  display: none !important;
}
</style>

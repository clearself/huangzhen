<template>
  <div class="modal-wrapper" ref="mymodal">
    <a-modal
      :getContainer="() => $refs.mymodal"
      v-model:open="showValue"
      :title="status === 'add' ? $t('data-dic.add') : $t('data-dic.edit')"
      width="500px"
      :cancelText="$t('opts.cancel')"
      :okText="$t('opts.sure')"
      :afterClose="afterClose"
      @ok="handleOk"
    >
      <a-form :model="formData" labelWrap :labelCol="{ style: { width: '110px' } }">
        <a-form-item :label="$t('data-dic.columns.fieldCode')" v-bind="validateInfos.fieldCode">
          <a-input
            :disabled="status === 'edit'"
            :maxlength="50"
            allowClear
            :placeholder="$t('placeholder6')"
            v-model:value="formData.fieldCode"
          />
        </a-form-item>
        <a-form-item :label="$t('data-dic.columns.fieldName')" v-bind="validateInfos.fieldName">
          <a-input
            :disabled="status === 'edit'"
            :maxlength="50"
            allowClear
            :placeholder="$t('placeholder6')"
            v-model:value="formData.fieldName"
          />
        </a-form-item>
        <a-form-item :label="$t('data-dic.columns.fieldDesc')">
          <a-input :maxlength="100" allowClear :placeholder="$t('placeholder9')" v-model:value="formData.fieldDesc" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue'
// import { Form,message } from 'ant-design-vue';

import { Form } from 'ant-design-vue'

import { $t } from '@/i18n'
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
const formData = reactive({
  id: '',
  fieldCode: '',
  fieldName: '',
  fieldDesc: ''
})
watchEffect(() => {
  if (props.show && props.status === 'edit') {
    formData.id = props.curData.id
    formData.fieldCode = props.curData.fieldCode
    formData.fieldName = props.curData.fieldName
    formData.fieldDesc = props.curData.fieldDesc
  }
})
const rulesRef = reactive({
  fieldCode: [
    {
      required: true,
      message: $t('placeholder6')
    }
  ],
  fieldName: [
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
  formData.id = ''
  formData.fieldDesc = ''
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
    })
    .catch((err) => {
      console.log('error', err)
    })
}
</script>

<style lang="scss" scoped></style>

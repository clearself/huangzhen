<template>
  <div class="modal-wrapper" ref="mymodal">
    <a-modal
      :getContainer="() => $refs.mymodal"
      v-model:open="showValue"
      :title="status === 'add' ? $t('data-dic.addEnum') : $t('data-dic.editEnum')"
      width="500px"
      :cancelText="$t('opts.cancel')"
      :okText="$t('opts.sure')"
      :afterClose="afterClose"
      @ok="handleOk"
    >
      <a-form :model="formData" labelWrap :labelCol="{ style: { width: '110px' } }">
        <a-form-item :label="$t('data-dic.dicCode')" v-bind="validateInfos.dicCode">
          <a-input
            :disabled="status === 'edit'"
            :maxlength="50"
            allowClear
            :placeholder="$t('placeholder6')"
            v-model:value="formData.dicCode"
          />
        </a-form-item>
        <a-form-item :label="$t('data-dic.dicName')" v-bind="validateInfos.dicName">
          <a-input
            :disabled="status === 'edit'"
            :maxlength="50"
            allowClear
            :placeholder="$t('placeholder6')"
            v-model:value="formData.dicName"
          />
        </a-form-item>
        <a-form-item :label="$t('data-dic.dicDesc')">
          <a-textarea :maxlength="100" allowClear :placeholder="$t('placeholder9')" v-model:value="formData.dicDesc" />
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
  dicCode: '',
  dicName: '',
  dicDesc: ''
})
watchEffect(() => {
  if (props.show && props.status === 'edit') {
    formData.id = props.curData.id
    formData.dicCode = props.curData.dicCode
    formData.dicName = props.curData.dicName
    formData.dicDesc = props.curData.dicDesc
  }
})
const rulesRef = reactive({
  dicCode: [
    {
      required: true,
      message: $t('placeholder6')
    }
  ],
  dicName: [
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
  formData.dicDesc = ''
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

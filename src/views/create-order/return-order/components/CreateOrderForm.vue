<template>
  <div class="modal-wrapper" ref="mymodal">
    <a-modal
      centered
      :getContainer="() => $refs.mymodal"
      v-model:open="showValue"
      :title="$t('return-order.title')"
      width="800px"
      :cancelText="$t('opts.cancel')"
      :okText="$t('opts.nextStep')"
      :afterClose="afterClose"
      @ok="handleOk"
    >
      <a-form :model="formData" layout="vertical">
        <s-row :gutter="20">
          <s-col :span="12">
            <a-form-item :label="$t('return-order.columns.returnOrderAlias')" v-bind="validateInfos.returnOrder">
              <div class="select-box" @click="showSelector = true">
                {{ formData.returnOrder ? formData.returnOrder : $t('selectTips') }}
              </div>
            </a-form-item>
          </s-col>
          <s-col :span="12">
            <a-form-item :label="$t('return-order.columns.returnReasons')" v-bind="validateInfos.returnReasons">
              <a-select
                show-search
                :options="returnReasonsList"
                allowClear
                :placeholder="$t('selectTips')"
                style="width: 100%"
                v-model:value="formData.returnReasons"
              />
            </a-form-item>
          </s-col>
        </s-row>
        <s-row :gutter="20">
          <s-col :span="12">
            <a-form-item :label="$t('return-order.columns.businessTime')" v-bind="validateInfos.businessTime">
              <a-date-picker
                style="width: 100%"
                allowClear
                show-time
                value-format="YYYY-MM-DD HH:mm:ss"
                :placeholder="$t('selectTips')"
                v-model:value="formData.businessTime"
              />
            </a-form-item>
          </s-col>
          <s-col :span="12">
            <a-form-item :label="$t('return-order.columns.payMethod')" v-bind="validateInfos.payMethod">
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
            <a-form-item :label="$t('return-order.columns.planReturnTime')" v-bind="validateInfos.planReturnTime">
              <a-date-picker
                style="width: 100%"
                allowClear
                show-time
                value-format="YYYY-MM-DD HH:mm:ss"
                :placeholder="$t('selectTips')"
                v-model:value="formData.planReturnTime"
              />
            </a-form-item>
          </s-col>
          <s-col :span="12">
            <a-form-item :label="$t('return-order.columns.ourCompanyCost')" v-bind="validateInfos.ourCompanyCost">
              <a-input allowClear :placeholder="$t('placeholder0')" v-model:value="formData.ourCompanyCost" />
            </a-form-item>
          </s-col>
        </s-row>
        <s-row :gutter="20">
          <s-col :span="12">
            <a-form-item :label="$t('return-order.columns.senderInfo')">
              <span v-if="formData.senderInfo.name">{{ formData.senderInfo.name }}</span>
              <a-button v-else type="link" size="small" @click="showSend = true">{{ $t('opts.write') }}</a-button>
            </a-form-item>
          </s-col>
          <s-col :span="12">
            <a-form-item :label="$t('return-order.columns.receiveInfo')">
              <span v-if="formData.receiveInfo.name">{{ formData.receiveInfo.name }}</span>
              <a-button v-else type="link" size="small" @click="showReceive = true">{{ $t('opts.write') }}</a-button>
            </a-form-item>
          </s-col>
        </s-row>
        <s-row :gutter="20">
          <s-col :span="24">
            <a-form-item :label="$t('return-order.columns.remark')" v-bind="validateInfos.remark">
              <a-textarea
                :maxlength="100"
                showCount
                allowClear
                :placeholder="$t('placeholder9')"
                v-model:value="formData.remark"
              />
            </a-form-item>
          </s-col>
        </s-row>
      </a-form>
    </a-modal>
  </div>

  <MapPurchaseOrder v-model:show="showSelector" @success="onSuccess" :selectedIds="selectedIds" from="1" />
  <SendForm v-model:show="showSend" :info="formData.senderInfo" @confirm="confirmSend" />
  <ReceiveForm v-model:show="showReceive" :info="formData.receiveInfo" @confirm="confirmReceive" />
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted } from 'vue'
import SendForm from './SendForm/index.vue'
import ReceiveForm from './ReceiveForm/index.vue'
import { overZeroSaveTwo } from '@/utils/rule'
// import { Form,message } from 'ant-design-vue';
// import { messageApi } from '@/helpers/msg-helper'
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

const showSend = ref(false)
const showReceive = ref(false)

const returnReasonsList = computed(() => {
  return dic.returnReasonsList
})
const payMethodList = computed(() => {
  return dic.payMethodList
})
onMounted(() => {})
const formData = reactive({
  returnOrder: '',
  returnReasons: undefined,
  businessTime: '',
  payMethod: undefined,
  planReturnTime: '',
  ourCompanyCost: '',
  senderInfo: {
    name: '',
    tel: '',
    country: '',
    province: '',
    city: '',
    street: '',
    address: '',
    code: ''
  },
  receiveInfo: {
    name: '',
    tel: '',
    country: '',
    province: '',
    city: '',
    street: '',
    address: '',
    code: ''
  },
  remark: ''
})
const rulesRef = reactive({
  returnOrder: [
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
  returnReasons: [
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
  ourCompanyCost: [
    {
      validator: overZeroSaveTwo
    }
  ],
  planArrivalTime: [
    {
      message: $t('selectTips')
    }
  ],
  remark: [
    {
      message: $t('placeholder9')
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
  formData.returnOrder = data[0].purchaseOrder
  // 赋值选中的物料pn
}
const confirmSend = (data: any) => {
  formData.senderInfo = { ...data }
  showSend.value = false
}
const confirmReceive = (data: any) => {
  formData.receiveInfo = { ...data }
  showReceive.value = false
}

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
        path: '/views/create-order/return-order/edit/1213213',
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

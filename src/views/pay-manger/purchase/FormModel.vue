<template>
  <div class="w100">
    <a-form :model="formData" labelAlign="left" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <div class="ub ub-ac w100 ub-pj">
        <div>{{ $t('purchase-pay.purchaseOrdernumber') }}:POHW230811100118</div>
        <div>
          <a-button v-if="status === 'edit'" @click="cancel">{{ $t('opts.cancel') }}</a-button>
          <a-button
            :loading="submiting"
            :disabled="submiting"
            v-if="status === 'edit'"
            class="ml-1"
            type="primary"
            html-type="submit"
            >{{ $t('opts.sure') }}
          </a-button>
        </div>
      </div>
      <a-divider class="my-1" />
      <a-card class="w100">
        <a-descriptions
          class="descriptions-wrapper"
          bordered
          :title="$t('purchase-pay.tableTitle')"
          size="small"
          :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
        >
          <a-descriptions-item :label="$t('purchase-pay.columns.mappingOrder')">{{ formData.id }}</a-descriptions-item>
          <a-descriptions-item :label="$t('purchase-pay.columns.payTime')">
            <span v-if="status === 'detail'">{{ formData.payTime }}</span>
            <a-form-item v-else name="payTime" :rules="[{ required: true, message: $t('selectTips') }]">
              <a-date-picker
                style="width: 100%"
                show-time
                allowClear
                value-format="YYYY-MM-DD HH:mm:ss"
                :placeholder="$t('selectTips')"
                v-model:value="formData.payTime"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('purchase-pay.columns.payType')">
            <span v-if="status === 'detail'">{{ formData.payType }}</span>
            <a-form-item v-else name=" payType" :rules="[{ required: true, message: $t('selectTips') }]">
              <a-select
                show-search
                :options="payTypeList"
                allowClear
                :placeholder="$t('selectTips')"
                style="width: 100%"
                v-model:value="formData.payType"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('purchase-pay.columns.payMethod')">
            <span>{{ formData.payMethod }}</span>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('purchase-pay.columns.currency')">
            <span>{{ formData.currency }}</span>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('purchase-pay.columns.payAmount')">
            <span v-if="status === 'detail'">{{ formData.payAmount }}</span>
            <a-form-item v-else name="payAmount" required :rules="[{ validator: overZeroSaveTwo }]">
              <a-input allowClear :placeholder="$t('placeholder11')" v-model:value="formData.payAmount" />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('purchase-pay.columns.customerName')">字节</a-descriptions-item>
          <a-descriptions-item :label="$t('purchase-pay.columns.supplierName')">字节</a-descriptions-item>
          <a-descriptions-item :label="$t('purchase-pay.columns.remark')">
            <span v-if="status === 'detail'">{{ formData.remark }}</span>
            <a-form-item v-else>
              <a-input :maxlength="100" allowClear :placeholder="$t('placeholder9')" v-model="formData.remark" />
            </a-form-item>
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
      <div class="w100">
        <a-tabs v-model:activeKey="activeKey" @change="change">
          <a-tab-pane key="1" :tab="$t('purchase-pay.tab1')">
            <Annex :status="status" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted } from 'vue'
import Annex from './components/Annex/index.vue'
import { overZeroSaveTwo } from '@/utils/rule'
import { useDicStore } from '@/store/modules/dic'
const dic = useDicStore()
// import { store } from '@/helpers/dict-helper/store'
// import { handelResult } from '@/utils/tools'
// import { add, getDetail } from './server'
import { $t } from '@/i18n'
import { useRouter } from 'vue-router' //路由

const router = useRouter() // 路由
defineProps({
  status: {
    type: String,
    default: 'edit'
  }
})
const activeKey = ref('1')
const formData = reactive({
  id: '',
  customerName: undefined,
  supplierName: undefined,
  payTime: '',
  payType: undefined,
  payMethod: undefined,
  currency: undefined,
  payAmount: '',
  remark: ''
})
const submiting = ref<boolean>(false)
const payTypeList = computed(() => {
  return dic.payTypeList
})
const cancel = () => {
  router.back()
}
onMounted(() => {
  initDetail()
})
const change = (val: string) => {
  sessionStorage.setItem('tabValue', val)
}
const initDetail = async () => {
  // const id = route.params.id as string
  // const response: any = await getDetail(id)
  // if (response?.code === '0') {
  //   const { result } = response
  //   formData.id = result.id
  // }
}

// 校验成功
const onFinish = async () => {
  // const params = {
  //   id: ''
  // }
  // submiting.value = true
  // const response: any = await add(params)
  // if (response?.code === '0') {
  //   messageApi
  //     .success({
  //       content: $t('opeateSuccess'),
  //       duration: 1
  //     })
  //     .then(() => {
  //       router.back()
  //     })
  // } else {
  //   submiting.value = false
  // }
}
// 校验失败
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>

<style lang="scss" scoped>
.descriptions-wrapper :deep(.ant-form-item) {
  margin-bottom: 0 !important;
  .ant-form-item-explain-error {
    display: none;
  }
}
</style>

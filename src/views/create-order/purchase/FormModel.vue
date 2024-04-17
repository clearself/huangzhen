<template>
  <div class="w100">
    <a-form :model="formData" labelAlign="left" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <div class="ub ub-ac w100 ub-pj">
        <div>{{ $t('purchase.purchaseOrdernumber') }}:POHW230811100118</div>
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
          :title="$t('purchase.tableTitle')"
          size="small"
          :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
        >
          <template #extra>
            <a v-if="type !== '1'" class="ant-dropdown-link mr-1" @click="clickShowOrderPrecess">
              {{ $t('purchase.orderProcess') }}
            </a>
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                {{ $t('opts.export') }}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">{{ $t('purchase.tab1') }}</a>
                  </a-menu-item>
                  <a-menu-item>
                    <a href="javascript:;">{{ $t('purchase.tab2') }}</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
          <a-descriptions-item :label="$t('purchase.columns.warehouseName')"
            >测试仓库xxxx测试仓库xxxx测试仓库xxxx</a-descriptions-item
          >
          <a-descriptions-item :label="$t('purchase.columns.customerName')">字节</a-descriptions-item>
          <a-descriptions-item :label="$t('purchase.columns.supplierName')">字节</a-descriptions-item>
          <a-descriptions-item :label="$t('purchase.columns.businessTime')">
            <span v-if="type === '3' || status === 'detail'">{{ formData.businessTime }}</span>
            <a-form-item v-else name="businessTime" :rules="[{ required: true, message: $t('selectTips') }]">
              <a-date-picker
                style="width: 100%"
                show-time
                allowClear
                value-format="YYYY-MM-DD HH:mm:ss"
                :placeholder="$t('selectTips')"
                :disabled-date="disabledDate"
                v-model:value="formData.businessTime"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('purchase.columns.purchaseReasons')">
            <span v-if="type === '3' || status === 'detail'">{{ formData.purchaseReasons }}</span>
            <a-form-item v-else name="purchaseReasons" :rules="[{ required: true, message: $t('selectTips') }]">
              <a-select
                show-search
                :options="purchaseReasons"
                allowClear
                :placeholder="$t('selectTips')"
                style="width: 100%"
                v-model:value="formData.purchaseReasons"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('purchase.columns.payMethod')">
            <span v-if="type === '3' || status === 'detail'">{{ formData.payMethod }}</span>
            <a-form-item v-else name="payMethod" :rules="[{ required: true, message: $t('selectTips') }]">
              <a-select
                show-search
                :options="payMethodList"
                allowClear
                :placeholder="$t('selectTips')"
                style="width: 100%"
                v-model:value="formData.payMethod"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('purchase.columns.currency')">
            <span v-if="type === '3' || status === 'detail'">{{ formData.currency }}</span>
            <a-form-item v-else name="currency" :rules="[{ required: true, message: $t('selectTips') }]">
              <a-select
                show-search
                :options="currencyList"
                allowClear
                :placeholder="$t('selectTips')"
                style="width: 100%"
                v-model:value="formData.currency"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('purchase.columns.otherExpenses')">
            <span v-if="type === '3' || status === 'detail'">{{ formData.otherExpenses }}</span>
            <a-form-item v-else name="otherExpenses" :rules="[{ validator: overZeroSaveTwo }]">
              <a-input allowClear :placeholder="$t('purchase.placeholder0')" v-model:value="formData.otherExpenses" />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('purchase.columns.totalAmount')">$60.00</a-descriptions-item>
          <a-descriptions-item :label="$t('purchase.columns.planArrivalTime')">
            <span v-if="status === 'detail'">{{ formData.planArrivalTime }}</span>
            <a-form-item v-else name="planArrivalTime">
              <a-date-picker
                style="width: 100%"
                show-time
                allowClear
                value-format="YYYY-MM-DD HH:mm:ss"
                :placeholder="$t('selectTips')"
                v-model:value="formData.planArrivalTime"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('purchase.columns.sendOrderNumber')">
            <span v-if="status === 'detail'">{{ formData.sendOrderNum }}</span>
            <a-form-item v-else>
              <a-input
                :maxlength="100"
                allowClear
                :placeholder="$t('purchase.placeholder9')"
                v-model:value="formData.sendOrderNum"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('purchase.columns.remark')">
            <span v-if="type === '3' || status === 'detail'">{{ formData.remark }}</span>
            <a-form-item v-else>
              <a-input
                :maxlength="100"
                allowClear
                :placeholder="$t('purchase.placeholder9')"
                v-model="formData.remark"
              />
            </a-form-item>
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
      <div class="w100">
        <a-tabs v-model:activeKey="activeKey" @change="change">
          <a-tab-pane key="1" :tab="$t('purchase.tab1')">
            <PurchaseDetails :status="status" :order-id="formData.id" />
          </a-tab-pane>
          <a-tab-pane key="2" :tab="$t('purchase.tab2')">
            <LogisticsDetails :status="status" :order-id="formData.id" />
          </a-tab-pane>
          <a-tab-pane key="3" :tab="$t('purchase.tab3')">
            <Annex :status="status" :order-id="formData.id" />
          </a-tab-pane>
          <a-tab-pane v-if="type === '3' || status === 'detail'" key="4" :tab="$t('purchase.tab4')">
            <InRecord :status="status" />
          </a-tab-pane>
          <a-tab-pane v-if="type === '3' || status === 'detail'" key="5" :tab="$t('purchase.tab5')">
            <ReturnRecord :status="status" />
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-form>
  </div>
  <order-process v-model:show="showOrderProcess" :order-id="formData.id" />
</template>

<script setup lang="ts">
import { computed, reactive, ref, onMounted } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'
import dayjs, { Dayjs } from 'dayjs'
import PurchaseDetails from './components/PurchaseDetails/index.vue'
import LogisticsDetails from './components/LogisticsDetails/index.vue'
import Annex from './components/Annex/index.vue'
import InRecord from './components/InRecord/index.vue'
import ReturnRecord from './components/ReturnRecord/index.vue'
import { overZeroSaveTwo } from '@/utils/rule'
import { useDicStore } from '@/store/modules/dic'
const dic = useDicStore()
// import { messageApi } from '@/helpers/msg-helper'
// import { store } from '@/helpers/dict-helper/store'
// import { handelResult } from '@/utils/tools'
// import { add, getDetail } from './server'
import { $t } from '@/i18n'
import { useRouter, useRoute } from 'vue-router' //路由

const router = useRouter() // 路由
const route = useRoute() // 路由
defineProps({
  status: {
    type: String,
    default: 'edit'
  }
})
const activeKey = ref('1')
const type = ref('')
const days = ref(10)
const showOrderProcess = ref(false)
const formData = reactive({
  id: '13214354654',
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
const disabledDate = computed(() => (current: Dayjs) => {
  // Can not select days before today and today
  return current && (current > dayjs().endOf('day') || current < dayjs().subtract(days.value, 'day').endOf('day'))
})
const submiting = ref<boolean>(false)
const currencyList = computed(() => {
  return dic.currencyList
})
const purchaseReasons = computed(() => {
  return dic.purchaseReasons
})
const payMethodList = computed(() => {
  return dic.payMethodList
})
const cancel = () => {
  router.back()
}
onMounted(() => {
  type.value = route.query.type as string
  initDetail()
})
const clickShowOrderPrecess = () => {
  showOrderProcess.value = true
}
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

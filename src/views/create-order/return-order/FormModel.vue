<template>
  <div class="w100">
    <a-form :model="formData" labelAlign="left" autocomplete="off" @finish="onFinish" @finishFailed="onFinishFailed">
      <div class="ub ub-ac w100 ub-pj">
        <div>{{ $t('return-order.returnOrdernumber') }}:POHW230811100118</div>
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
          :title="$t('return-order.tableTitle')"
          size="small"
          :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
        >
          <template #extra>
            <a v-if="type !== '1'" class="ant-dropdown-link mr-1" @click="clickShowOrderPrecess">
              {{ $t('return-order.orderProcess') }}
            </a>
            <a-dropdown>
              <a class="ant-dropdown-link" @click.prevent>
                {{ $t('opts.export') }}
                <DownOutlined />
              </a>
              <template #overlay>
                <a-menu>
                  <a-menu-item>
                    <a href="javascript:;">{{ $t('return-order.tab1') }}</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
          <a-descriptions-item :label="$t('return-order.columns.returnOrderAlias')">xxxxxxxxx</a-descriptions-item>
          <a-descriptions-item :label="$t('return-order.columns.returnReasons')">
            <span v-if="type === '3' || status === 'detail'">{{ formData.businessTime }}</span>
            <a-form-item v-else name="returnReasons" :rules="[{ required: true, message: $t('selectTips') }]">
              <a-select
                show-search
                :options="returnReasonsList"
                allowClear
                :placeholder="$t('selectTips')"
                style="width: 100%"
                v-model:value="formData.returnReasons"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('return-order.columns.businessTime')">
            <span v-if="type === '3' || status === 'detail'">{{ formData.businessTime }}</span>
            <a-form-item v-else name="businessTime" :rules="[{ required: true, message: $t('selectTips') }]">
              <a-date-picker
                style="width: 100%"
                show-time
                allowClear
                value-format="YYYY-MM-DD HH:mm:ss"
                :placeholder="$t('selectTips')"
                v-model:value="formData.businessTime"
              />
            </a-form-item>
          </a-descriptions-item>

          <a-descriptions-item
            :label="$t('return-order.columns.payMethod')"
            :rules="[{ required: true, message: $t('selectTips') }]"
          >
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
          <a-descriptions-item :label="$t('return-order.columns.planReturnTime')">
            <span v-if="type === '3' || status === 'detail'">{{ formData.planReturnTime }}</span>
            <a-form-item v-else name="planArrivalTime">
              <a-date-picker
                style="width: 100%"
                show-time
                allowClear
                value-format="YYYY-MM-DD HH:mm:ss"
                :placeholder="$t('selectTips')"
                v-model:value="formData.planReturnTime"
              />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('return-order.columns.ourCompanyCost')">
            <span v-if="type === '3' || status === 'detail'">{{ formData.ourCompanyCost }}</span>
            <a-form-item v-else :rules="[{ validator: overZeroSaveTwo }]">
              <a-input allowClear :placeholder="$t('placeholder0')" v-model:value="formData.ourCompanyCost" />
            </a-form-item>
          </a-descriptions-item>

          <a-descriptions-item :label="$t('return-order.columns.totalAmount')">$60.00</a-descriptions-item>
          <a-descriptions-item :label="$t('return-order.columns.senderInfo')">
            <div v-if="status === 'detail'">
              <a-button type="link" size="small" @click="seeInfo('send')">{{ $t('opts.view') }}</a-button>
            </div>
            <div v-else>
              <span v-if="formData.senderInfo.name">{{ formData.senderInfo.name }}</span>
              <a-button v-else type="link" size="small" @click="editInfo('send')">{{ $t('opts.write') }}</a-button>
            </div>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('return-order.columns.receiveInfo')">
            <div v-if="status === 'detail'">
              <a-button type="link" size="small" @click="seeInfo('receive')">{{ $t('opts.view') }}</a-button>
            </div>
            <div v-else>
              <span v-if="formData.receiveInfo.name">{{ formData.receiveInfo.name }}</span>
              <a-button v-else type="link" size="small" @click="editInfo('receive')">{{ $t('opts.write') }}</a-button>
            </div>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('purchase.columns.remark')">
            <span v-if="type === '3' || status === 'detail'">{{ formData.remark }}</span>
            <a-form-item v-else>
              <a-input :maxlength="100" allowClear :placeholder="$t('placeholder9')" v-model:value="formData.remark" />
            </a-form-item>
          </a-descriptions-item>
          <a-descriptions-item :label="$t('return-order.columns.currency')">xxxxxxxxx</a-descriptions-item>
          <a-descriptions-item :label="$t('return-order.columns.warehouseName')">xxxxxxxxx</a-descriptions-item>
        </a-descriptions>
      </a-card>
      <div class="w100">
        <a-tabs v-model:activeKey="activeKey" @change="change">
          <a-tab-pane key="1" :tab="$t('return-order.tab1')">
            <ReturnOrderDetails :status="status" :order-id="formData.id" />
          </a-tab-pane>

          <a-tab-pane key="2" :tab="$t('return-order.tab2')">
            <Annex />
          </a-tab-pane>
          <a-tab-pane v-if="type === '3' || status === 'detail'" key="3" :tab="$t('return-order.tab3')">
            <OutRecord />
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-form>
  </div>

  <SendForm v-model:show="showSend" :info="formData.senderInfo" @confirm="confirmSend" :status="isView" />
  <ReceiveForm v-model:show="showReceive" :info="formData.receiveInfo" @confirm="confirmReceive" :status="isView" />
  <order-process v-model:show="showOrderProcess" :order-id="formData.id" />
</template>

<script setup lang="ts">
import { reactive, computed, ref, onMounted } from 'vue'
import { DownOutlined } from '@ant-design/icons-vue'

import SendForm from './components/SendForm/index.vue'
import ReceiveForm from './components/ReceiveForm/index.vue'
import ReturnOrderDetails from './components/ReturnOrderDetails/index.vue'
import Annex from './components/Annex/index.vue'
import OutRecord from './components/OutRecord/index.vue'
import { overZeroSaveTwo } from '@/utils/rule'
// import { add, getDetail } from './server'
import { useDicStore } from '@/store/modules/dic'
const dic = useDicStore()
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
const returnReasonsList = computed(() => {
  return dic.returnReasonsList
})
const payMethodList = computed(() => {
  return dic.payMethodList
})
const activeKey = ref('1')
const type = ref('')
const showSend = ref(false)
const showReceive = ref(false)
const isView = ref(false)
const showOrderProcess = ref(false)
const formData = reactive({
  id: '',
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
  remark: '',
  currency: '',
  warehouseName: ''
})
const submiting = ref<boolean>(false)
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
const editInfo = (type: string) => {
  isView.value = false
  if (type === 'send') {
    showSend.value = true
  } else {
    showReceive.value = true
  }
}
const seeInfo = (type: string) => {
  isView.value = true
  if (type === 'send') {
    showSend.value = true
  } else {
    showReceive.value = true
  }
}
const confirmSend = (data: any) => {
  formData.senderInfo = { ...data }
  showSend.value = false
}
const confirmReceive = (data: any) => {
  formData.receiveInfo = { ...data }
  showReceive.value = false
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

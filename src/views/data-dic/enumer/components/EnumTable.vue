<template>
  <div class="modal-wrapper" ref="mymodal">
    <a-modal
      :getContainer="() => $refs.mymodal"
      v-model:open="showValue"
      title="枚举值"
      width="800px"
      :cancelText="$t('opts.cancel')"
      :okText="$t('opts.sure')"
      :afterClose="afterClose"
      @ok="handleOk"
    >
      <div class="ub ub-ac top-opt w100 mb-1">
        <a-button type="primary" size="small" @click="showFieldBox">
          <template #icon>
            <PlusOutlined />
          </template>
          {{ $t('opts.add') }}
        </a-button>
      </div>
      <a-table
        id="dragTable"
        class="ant-table-striped"
        :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
        bordered
        :key="dictTableKey"
        :dataSource="dataSource"
        :columns="columns"
        :pagination="false"
        size="small"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'index'">
            <a>
              {{ parseInt(index) + 1 }}
            </a>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-button type="link" size="small" @click="toEdit(record)">
              <template #icon> <EditOutlined /> </template
            ></a-button>
            <a-button type="link" size="small" class="handle-drag">
              <template #icon> <DragOutlined /> </template>
            </a-button>
          </template>
          <template v-if="column.dataIndex === 'startState'">
            <a-switch
              v-model:checked="record.state"
              :checked-children="$t('data-dic.started')"
              :un-checked-children="$t('data-dic.frozen')"
            />
          </template>
        </template>
      </a-table>
    </a-modal>
  </div>

  <FieldForm v-model:show="fieldShow" :cur-data="curData" @success="success" :status="status" />
</template>

<script setup lang="ts">
import Sortable from 'sortablejs'
import { ref, computed, watch, watchEffect, nextTick } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { cloneDeep } from 'lodash-es'
import { EditOutlined, DragOutlined, PlusOutlined } from '@ant-design/icons-vue'
import FieldForm from './FieldForm.vue'
// import { Form,message } from 'ant-design-vue';
import { $t } from '@/i18n'
// import { add } from './server'
const emit = defineEmits(['update:show', 'success'])

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
const status = ref<string>('')
const curData = ref<object>({})
const fieldShow = ref<boolean>(false)
const dictTableKey = ref(uuidv4())
const showValue = computed({
  get() {
    return props.show
  },
  set(value: boolean) {
    emit('update:show', value)
  }
})
const columns = [
  {
    title: $t('columns.operation'),
    dataIndex: 'operation',
    fixed: 'left',
    width: 130
  },
  {
    title: $t('columns.index'),
    dataIndex: 'index',
    fixed: 'left',
    width: 50
  },
  {
    title: $t('data-dic.dicCode'),
    dataIndex: 'dicCode',
    ellipsis: true
  },
  {
    title: $t('data-dic.dicName'),
    dataIndex: 'dicName',
    ellipsis: true
  },
  {
    title: $t('data-dic.dicDesc'),
    dataIndex: 'dicDesc',
    ellipsis: true
  },
  {
    title: $t('data-dic.startState'),
    dataIndex: 'startState',
    fixed: 'right',
    width: 100
  }
]
const dataSource = ref<any[]>([
  {
    id: '13243534',
    dicCode: '111',
    dicName: 'name1',
    dicDesc: '发的VB发不发',
    state: true
  },
  {
    id: '13',
    dicCode: '222',
    dicName: 'name2',
    dicDesc: '发的VB发不发',
    state: false
  },
  {
    id: '1324',
    dicCode: '333',
    dicName: 'name3',
    dicDesc: '发的VB发不发',
    state: true
  }
])
const success = () => {}
const toEdit = (record: any) => {
  status.value = 'edit'
  curData.value = cloneDeep(record)
  fieldShow.value = true
}
const showFieldBox = () => {
  status.value = 'add'
  fieldShow.value = true
}
const setSort = () => {
  const tbody = document.querySelector('#dragTable table tbody') as HTMLElement
  new Sortable(tbody, {
    sort: true,
    handle: '.handle-drag',
    animation: 150, // ms, number 单位：ms，定义排序动画的时间
    easing: 'cubic-bezier(1, 0, 0, 1)',
    onEnd: (e: any) => {
      const currRow = dataSource.value.splice(e.oldIndex, 1)[0]
      dataSource.value.splice(e.newIndex, 0, currRow)
      dictTableKey.value = uuidv4()
    }
  })
}
watch(
  () => dictTableKey.value,
  () => {
    nextTick(() => {
      setSort()
    })
  }
)
watchEffect(() => {
  if (showValue.value) {
    console.log(showValue.value, 'showValue.value')
    nextTick(() => {
      setSort()
    })
  }
})
const afterClose = () => {}
const handleOk = () => {
  console.log(dataSource.value, 'dataSource.value')
}
</script>

<style lang="scss" scoped></style>

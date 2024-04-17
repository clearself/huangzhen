<template>
  <div class="w100" v-if="status === 'edit'">
    <div>
      <a-button type="primary" size="small" @click="showUploadAnnex = true">
        <template #icon>
          <PlusOutlined />
        </template>
        {{ $t('opts.uploadAnnex') }}
      </a-button>
    </div>
    <div class="mt-1" style="font-size: 12px">
      {{ $t('uploadInfo.tip') }}
    </div>
  </div>
  <div class="mt-1 w100">
    <a-table
      class="ant-table-striped"
      :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
      bordered
      size="small"
      :columns="annexColumns"
      :row-key="(record: any) => record.id"
      :data-source="tableData"
      :pagination="pagination"
      :loading="loading"
      :scroll="{ x: 1550, y: scrollY }"
      @change="handleTableChange"
    >
      <template #bodyCell="{ column, index }">
        <template v-if="column.dataIndex === 'index'">
          <a>
            {{ (pagination.current - 1) * pagination.pageSize + parseInt(index) + 1 }}
          </a>
        </template>
        <template v-if="column.dataIndex === 'operation'">
          <a-button type="link" size="small">{{ $t('opts.download') }}</a-button>
        </template>
      </template>
    </a-table>
  </div>
  <UploadAnnex :title="$t('opts.uploadAnnex')" v-model:show="showUploadAnnex" :order-id="orderId" />
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { v4 as uuidv4 } from 'uuid'
import useTable from '@/hooks/useTable'
import { useList } from '../../hooks/usePurchase'
const { pagination, loading, scrollY } = useTable()
// import { messageApi } from "@/helpers/msg-helper";
const { annexColumns } = useList()
// import { init } from "./server";
import { $t } from '@/i18n'
defineProps({
  status: {
    type: String,
    default: ''
  },
  orderId: {
    type: String,
    default: ''
  }
})
let tableData = reactive<any[]>([])
const showUploadAnnex = ref(false)
// 初始化
onMounted(() => {
  initData()
})
const initData = async () => {
  loading.value = true
  // let params = {
  //   pageNum: pagination.current,
  //   pageSize: pagination.pageSize
  // }
  // let { result } = await init(params);
  setTimeout(() => {
    const records = [
      {
        id: uuidv4(),
        fieldName: '品名.zip'
      }
    ]
    loading.value = false
    tableData = records
  }, 1000)
}

// 改变页数
const handleTableChange = (page: any) => {
  pagination.current = page.current
  pagination.pageSize = page.pageSize
  initData()
}
</script>

<style lang="scss" scoped>
.top-box {
}
</style>

<template>
  <!-- <div class="search-wrapper">
    <a-card size="small">
      <a-form :model="formData" layout="inline">
        <a-form-item :label="$t('data-dic.columns.fieldCode')">
          <a-input style="width: 240px" allowClear :placeholder="$t('inputTips')" v-model:value="formData.fieldCode" />
        </a-form-item>
        <a-form-item :label="$t('data-dic.columns.fieldName')">
          <a-input style="width: 240px" allowClear :placeholder="$t('inputTips')" v-model:value="formData.fieldName" />
        </a-form-item>
        <a-form-item :label="$t('data-dic.columns.fieldDesc')">
          <a-input style="width: 240px" allowClear :placeholder="$t('inputTips')" v-model:value="formData.fieldDesc" />
        </a-form-item>
        <a-form-item>
          <div>
            <a-button type="primary" @click="searchForm"> {{ $t('opts.search') }}</a-button>
            <a-button class="ml-1">{{ $t('opts.reset') }}</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-card>
  </div> -->
  <a-card size="small">
    <div class="ub ub-ac top-opt w100">
      <a-button type="primary" @click="showUpload = true">
        <template #icon>
          <ImportOutlined />
        </template>
        {{ $t('opts.import') }}
      </a-button>
      <a-button class="ml-1" type="primary" @click="exportToExcelSelected">
        <template #icon>
          <DownloadOutlined />
        </template>
        {{ $t('opts.exportSelected') }}
      </a-button>
      <a-button class="ml-1" type="primary" @click="exportToExcel">
        <template #icon>
          <DownloadOutlined />
        </template>
        {{ $t('opts.exportAll') }}
      </a-button>
    </div>
    <div class="mt-1 w100">
      <a-table
        class="ant-table-striped"
        :row-class-name="(_record: any, index: number) => (index % 2 === 1 ? 'table-striped' : null)"
        bordered
        size="small"
        :columns="columns"
        :row-selection="rowSelection('checkbox')"
        :row-key="(record: any) => record.id"
        :data-source="tableData"
        :pagination="pagination"
        :loading="loading"
        :scroll="{ y: scrollY }"
        @change="handleTableChange"
      >
        <template #bodyCell="{ column, record, index }">
          <template v-if="column.dataIndex === 'index'">
            <a>
              {{ (pagination.current - 1) * pagination.pageSize + parseInt(index) + 1 }}
            </a>
          </template>
          <template v-if="column.dataIndex === 'operation'">
            <a-button type="link" size="small" @click="toEdit(record)">{{ $t('opts.edit') }}</a-button>
            <a-button type="link" size="small" @click="toEnum(record)">{{ $t('data-dic.enum') }}</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </a-card>
  <!-- <AddForm v-model:show="formShow" :cur-data="curData" @success="success" :status="status" />

  <EnumTable v-model:show="tableShow" /> -->

  <UploadImport title="数据导入" v-model:show="showUpload" @success="successBack" />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { ImportOutlined, DownloadOutlined } from '@ant-design/icons-vue'
// import { v4 as uuidv4 } from 'uuid'
import * as XLSX from 'xlsx'
import { cloneDeep } from 'lodash-es'
// import AddForm from './components/AddForm.vue'
// import EnumTable from './components/EnumTable.vue'
import useTable from '@/hooks/useTable'
import { useList } from './hooks/useDataDic'
const { pagination, scrollY, loading, selectedRowKeys, selectedRows, rowSelection, clearTableSelected } = useTable()
const { columns } = useList()
// import { init } from "./server";
import { $t } from '@/i18n'
const formShow = ref<boolean>(false)
const status = ref<string>('')
const fileName = ref<string>('')

const curData = ref<object>({})
const tableShow = ref<boolean>(false)
const showUpload = ref<boolean>(false)
const tableData = ref<any[]>([])
const allList = ref<any[]>([])
const formData = reactive({
  fieldCode: '',
  fieldName: '',
  fieldDesc: ''
})
// 初始化

const searchForm = () => {
  console.log(formData.fieldCode, 'formData.fieldCode')
}
const success = () => {}
const toEnum = (record: any) => {
  console.log(record)
  tableShow.value = true
}
const toEdit = (record: any) => {
  status.value = 'edit'
  curData.value = cloneDeep(record)
  formShow.value = true
}
const showFormBox = () => {
  status.value = 'add'
  formShow.value = true
}
const successBack = async (obj: any) => {
  clearTableSelected()
  allList.value = obj.list
  fileName.value = obj.fileName
  showUpload.value = false
  initData()
}
const initData = () => {
  loading.value = true
  setTimeout(() => {
    const startIndex = (pagination.current - 1) * pagination.pageSize
    const endIndex = startIndex + pagination.pageSize
    const list = allList.value.slice(startIndex, endIndex)
    const result = {
      total: allList.value.length,
      records: list
    }
    loading.value = false
    const { total, records } = result
    pagination.total = total
    tableData.value = records
  }, 500)
}

// 改变页数
const handleTableChange = (page: any) => {
  pagination.current = page.current
  pagination.pageSize = page.pageSize
  initData()
}
const exportExcelTable = (json: any[], name: string, titleArr: string[], sheetName: string, fields: string[]) => {
  let data = []
  if (!Array.isArray(json)) return console.warn('数据请传入数组')
  if (!Array.isArray(titleArr)) return console.warn('标题请传入数组')
  if (!Array.isArray(fields)) return console.warn('字段请传入数组')
  data = json.map((obj) => {
    return fields.map((field) => {
      return obj[field]
    })
  })
  data.splice(0, 0, titleArr)
  // fields为英文字段表头,一般不需要，需要直接把下面注释打开即可
  // data.splice(0, 0, fields);

  const ws = XLSX.utils.aoa_to_sheet(data)
  const wb = XLSX.utils.book_new()
  // 此处隐藏英文字段表头
  const wsrows = [{ hidden: false }]
  ws['!rows'] = wsrows // ws - worksheet
  XLSX.utils.book_append_sheet(wb, ws, sheetName)
  /* generate file and send to client */
  XLSX.writeFile(wb, name + '.xlsx')
}
const exportToExcelSelected = () => {
  if (allList.value.length === 0) {
    message.warning('请先导入数据')
    return
  }
  if (selectedRows.value.length === 0) {
    message.warning('请至少选择一条数据')
    return
  }
  const titleArr = ['名称', '内容'] //表头第一行从左到右
  const fields = ['name', 'content'] //标题对应的字段名
  exportExcelTable(selectedRows.value, fileName.value, titleArr, 'sheetName', fields) //列表变量名、文件名、第一行标题、表名、字段名
}
const exportToExcel = () => {
  if (allList.value.length === 0) {
    message.warning('请先导入数据')
    return
  }
  const titleArr = ['名称', '内容'] //表头第一行从左到右
  const fields = ['name', 'content'] //标题对应的字段名
  exportExcelTable(allList.value, fileName.value, titleArr, 'sheetName', fields) //列表变量名、文件名、第一行标题、表名、字段名
}
</script>

<style lang="scss" scoped></style>

import { $t } from '@/i18n'
export const useList = () => {
  // 设置列
  const columns = [
    {
      title: $t('columns.index'),
      dataIndex: 'index',
      fixed: 'left',
      width: 50
    },
    {
      title: '产品名称',
      dataIndex: 'name',
      ellipsis: true
    },
    {
      title: '产品类型',
      dataIndex: 'type',
      ellipsis: true
    },
    {
      title: 'FNSKU',
      dataIndex: 'code',
      ellipsis: true
    },
    {
      title: '简化标题',
      dataIndex: 'title',
      ellipsis: true
    }
  ]

  return {
    columns
  }
}

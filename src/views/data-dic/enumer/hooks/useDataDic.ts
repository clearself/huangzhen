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
      title: $t('data-dic.columns.name'),
      dataIndex: 'name',
      ellipsis: true
    },
    {
      title: $t('data-dic.columns.content'),
      dataIndex: 'content',
      ellipsis: true
    }
  ]

  return {
    columns
  }
}

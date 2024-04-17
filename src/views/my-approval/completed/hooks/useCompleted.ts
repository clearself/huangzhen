import { $t } from '@/i18n'
export const useList = () => {
  // 设置列
  const columns = [
    {
      title: $t('columns.operation'),
      dataIndex: 'operation',
      fixed: 'left',
      width: 80
    },
    {
      title: $t('columns.index'),
      dataIndex: 'index',
      fixed: 'left',
      width: 50
    },
    {
      title: $t('completed.columns.businessTime'),
      dataIndex: 'businessTime'
    },
    {
      title: $t('completed.columns.approvalFinishTime'),
      dataIndex: 'approvalFinishTime'
    },
    {
      title: $t('completed.columns.orderType'),
      dataIndex: 'orderType'
    },
    {
      title: $t('completed.columns.orderNum'),
      dataIndex: 'orderNum'
    },
    {
      title: $t('completed.columns.creater'),
      dataIndex: 'creater'
    },
    {
      title: $t('completed.columns.supplierName'),
      dataIndex: 'supplierName'
    },
    {
      title: $t('completed.columns.customerName'),
      dataIndex: 'customerName'
    },
    {
      title: $t('completed.columns.warehouseName'),
      dataIndex: 'warehouseName'
    }
  ]

  return {
    columns
  }
}

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
      title: $t('pending.columns.createTime'),
      dataIndex: 'createTime',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('pending.columns.orderType'),
      dataIndex: 'orderType',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('pending.columns.orderNum'),
      dataIndex: 'orderNum',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('pending.columns.creater'),
      dataIndex: 'creater',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('pending.columns.supplierName'),
      dataIndex: 'supplierName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('pending.columns.customerName'),
      dataIndex: 'customerName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('pending.columns.warehouseName'),
      dataIndex: 'warehouseName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('pending.columns.warehouseName'),
      dataIndex: 'warehouseName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('pending.columns.warehouseName'),
      dataIndex: 'warehouseName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('pending.columns.warehouseName'),
      dataIndex: 'warehouseName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('pending.columns.warehouseName'),
      dataIndex: 'warehouseName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('pending.columns.warehouseName'),
      dataIndex: 'warehouseName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('pending.columns.warehouseName'),
      dataIndex: 'warehouseName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('pending.columns.customerName'),
      dataIndex: 'customerName',
      ellipsis: true
    },
    {
      title: $t('pending.columns.customerName'),
      dataIndex: 'customerName',
      ellipsis: true
    },
    {
      title: $t('pending.columns.warehouseName'),
      dataIndex: 'warehouseName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('pending.columns.warehouseName'),
      dataIndex: 'warehouseName',
      ellipsis: true,
      width: 100,
      fixed: 'right'
    }
  ]

  return {
    columns
  }
}

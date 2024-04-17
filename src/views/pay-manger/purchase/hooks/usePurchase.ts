import { $t } from '@/i18n'
export const useList = () => {
  // 设置列
  const columns = [
    {
      title: $t('columns.operation'),
      dataIndex: 'operation',
      fixed: 'left',
      width: 180
    },
    {
      title: $t('columns.index'),
      dataIndex: 'index',
      fixed: 'left',
      width: 50
    },
    {
      title: $t('purchase-pay.columns.payTime'),
      dataIndex: 'payTime',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase-pay.columns.payOrder'),
      dataIndex: 'payOrder',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase-pay.columns.payType'),
      dataIndex: 'payType',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase-pay.columns.mappingOrder'),
      dataIndex: 'mappingOrder',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase-pay.columns.payAmount'),
      dataIndex: 'payAmount',
      ellipsis: true
    },
    {
      title: $t('purchase-pay.columns.payMethod'),
      dataIndex: 'payMethod',
      ellipsis: true
    },
    {
      title: $t('purchase-pay.columns.currency'),
      dataIndex: 'currency',
      ellipsis: true
    },
    {
      title: $t('purchase-pay.columns.creater'),
      dataIndex: 'creater',
      ellipsis: true
    },
    {
      title: $t('purchase-pay.columns.supplierName'),
      dataIndex: 'supplierName',
      ellipsis: true,
      width: 200
    },
    {
      title: $t('purchase-pay.columns.customerName'),
      dataIndex: 'customerName',
      ellipsis: true,
      width: 200
    },

    {
      title: $t('purchase-pay.columns.approvalStatus'),
      dataIndex: 'approvalStatus',
      ellipsis: true
    },
    {
      title: $t('purchase-pay.columns.approvalNodes'),
      dataIndex: 'approvalNodes',
      ellipsis: true
    }
  ]

  const annexColumns = [
    {
      title: $t('columns.operation'),
      dataIndex: 'operation',
      fixed: 'left',
      width: 120
    },
    {
      title: $t('columns.index'),
      dataIndex: 'index',
      fixed: 'left',
      width: 50
    },
    {
      title: $t('purchase-pay.annex.filename'),
      dataIndex: 'filename',
      ellipsis: true
    }
  ]
  return {
    columns,
    annexColumns
  }
}

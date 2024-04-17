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
      title: $t('purchase.columns.businessTime'),
      dataIndex: 'businessTime',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.columns.purchaseOrder'),
      dataIndex: 'purchaseOrder',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.columns.purchaseReasons'),
      dataIndex: 'purchaseReasons',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.columns.creater'),
      dataIndex: 'creater',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.columns.supplierName'),
      dataIndex: 'supplierName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.columns.customerName'),
      dataIndex: 'customerName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.columns.planArrivalTime'),
      dataIndex: 'planArrivalTime',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.columns.approvalStatus'),
      dataIndex: 'approvalStatus',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.columns.approvalNodes'),
      dataIndex: 'approvalNodes',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.columns.paymentStatus'),
      dataIndex: 'paymentStatus',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.columns.entryStatus'),
      dataIndex: 'entryStatus',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.columns.purchaseName'),
      dataIndex: 'purchaseName',
      ellipsis: true
    },
    {
      title: $t('purchase.columns.purchaseQuantity'),
      dataIndex: 'purchaseQuantity',
      ellipsis: true,
      fixed: 'right',
      width: 100
    }
  ]
  // 设置采购明细列
  const purchaseColumns = [
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
      title: $t('purchase.purchaseDetail.productName'),
      dataIndex: 'productName',
      ellipsis: true,
      width: 200
    },
    {
      title: $t('purchase.purchaseDetail.materialPN'),
      dataIndex: 'materialPN',
      ellipsis: true,
      width: 200
    },
    {
      title: $t('purchase.purchaseDetail.unit'),
      dataIndex: 'unit',
      ellipsis: true,
      width: 100
    },
    {
      title: $t('purchase.purchaseDetail.actualPurchaseUnitPrice'),
      dataIndex: 'actualPurchaseUnitPrice',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.purchaseDetail.purchaseQuantity'),
      dataIndex: 'purchaseQuantity',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.purchaseDetail.actualPurchaseAmount'),
      dataIndex: 'actualPurchaseAmount',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.purchaseDetail.taxRate'),
      dataIndex: 'taxRate',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.purchaseDetail.taxAmount'),
      dataIndex: 'taxAmount',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('purchase.purchaseDetail.remark'),
      dataIndex: 'remark',
      ellipsis: true
    }
  ]
  // 设置采购明细列
  const logisticsColumns = [
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
      title: $t('purchase.logisticsDetail.logisticsCompanyName'),
      dataIndex: 'logisticsCompanyName',
      ellipsis: true
    },
    {
      title: $t('purchase.logisticsDetail.logisticsMethods'),
      dataIndex: 'logisticsMethods',
      ellipsis: true
    },
    {
      title: $t('purchase.logisticsDetail.contacts'),
      dataIndex: 'contacts',
      ellipsis: true
    },
    {
      title: $t('purchase.logisticsDetail.contactInformation'),
      dataIndex: 'contactInformation',
      ellipsis: true
    },

    {
      title: $t('purchase.logisticsDetail.logisticsTrackingNumber'),
      dataIndex: 'logisticsTrackingNumber',
      ellipsis: true
    },
    {
      title: $t('purchase.logisticsDetail.licensePlateNumber'),
      dataIndex: 'licensePlateNumber',
      ellipsis: true
    },
    {
      title: $t('purchase.logisticsDetail.remark'),
      dataIndex: 'remark',
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
      title: $t('purchase.annex.filename'),
      dataIndex: 'filename',
      ellipsis: true
    }
  ]
  const inRecordColumns = [
    {
      title: $t('columns.index'),
      dataIndex: 'index',
      fixed: 'left',
      width: 50
    },
    {
      title: $t('purchase.inRecord.serverOrder'),
      dataIndex: 'serverOrder',
      ellipsis: true
    },
    {
      title: $t('purchase.inRecord.orderCreateTime'),
      dataIndex: 'orderCreateTime',
      ellipsis: true
    },
    {
      title: $t('purchase.inRecord.finishTime'),
      dataIndex: 'finishTime',
      ellipsis: true
    },
    {
      title: $t('purchase.inRecord.inventoryOrderFinishTime'),
      dataIndex: 'inventoryOrderFinishTime',
      ellipsis: true
    },
    {
      title: $t('purchase.inRecord.approvalStatus'),
      dataIndex: 'approvalStatus',
      ellipsis: true
    },
    {
      title: $t('purchase.inRecord.approvalNodes'),
      dataIndex: 'approvalNodes',
      ellipsis: true
    },
    {
      title: $t('purchase.inRecord.productName'),
      dataIndex: 'productName',
      ellipsis: true
    },
    {
      title: $t('purchase.inRecord.inventoryQuantity'),
      dataIndex: 'inventoryQuantity',
      ellipsis: true
    },
    {
      title: $t('purchase.inRecord.inventoryAmount'),
      dataIndex: 'inventoryAmount',
      ellipsis: true
    }
  ]
  const returnRecordColumns = [
    {
      title: $t('columns.index'),
      dataIndex: 'index',
      fixed: 'left',
      width: 50
    },
    {
      title: $t('purchase.returnRecord.serverOrder'),
      dataIndex: 'serverOrder',
      ellipsis: true
    },
    {
      title: $t('purchase.returnRecord.orderCreateTime'),
      dataIndex: 'orderCreateTime',
      ellipsis: true
    },
    {
      title: $t('purchase.returnRecord.returnTime'),
      dataIndex: 'returnTime',
      ellipsis: true
    },
    {
      title: $t('purchase.returnRecord.orderFinishTime'),
      dataIndex: 'orderFinishTime',
      ellipsis: true
    },
    {
      title: $t('purchase.returnRecord.approvalStatus'),
      dataIndex: 'approvalStatus',
      ellipsis: true
    },
    {
      title: $t('purchase.returnRecord.approvalNodes'),
      dataIndex: 'approvalNodes',
      ellipsis: true
    },
    {
      title: $t('purchase.returnRecord.productName'),
      dataIndex: 'productName',
      ellipsis: true
    },
    {
      title: $t('purchase.returnRecord.returnQuantity'),
      dataIndex: 'returnQuantity',
      ellipsis: true
    },
    {
      title: $t('purchase.returnRecord.returnAmount'),
      dataIndex: 'returnAmount',
      ellipsis: true
    }
  ]
  return {
    columns,
    purchaseColumns,
    logisticsColumns,
    annexColumns,
    inRecordColumns,
    returnRecordColumns
  }
}

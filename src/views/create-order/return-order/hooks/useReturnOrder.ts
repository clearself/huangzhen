import { $t } from '@/i18n'
export const useList = () => {
  // 设置列
  const columns = [
    {
      title: $t('columns.operation'),
      dataIndex: 'operation',
      fixed: 'left',
      width: 150
    },
    {
      title: $t('columns.index'),
      dataIndex: 'index',
      fixed: 'left',
      width: 50
    },
    {
      title: $t('return-order.columns.businessTime'),
      dataIndex: 'businessTime',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('return-order.columns.returnOrder'),
      dataIndex: 'returnOrder',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('return-order.columns.returnReasons'),
      dataIndex: 'returnReasons',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('return-order.columns.creater'),
      dataIndex: 'creater',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('return-order.columns.supplierName'),
      dataIndex: 'supplierName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('return-order.columns.customerName'),
      dataIndex: 'customerName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('return-order.columns.planReturnTime'),
      dataIndex: 'planReturnTime',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('return-order.columns.approvalStatus'),
      dataIndex: 'approvalStatus',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('return-order.columns.approvalNodes'),
      dataIndex: 'approvalNodes',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('return-order.columns.paymentStatus'),
      dataIndex: 'paymentStatus',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('return-order.columns.outStatus'),
      dataIndex: 'outStatus',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('return-order.columns.returnName'),
      dataIndex: 'returnName',
      ellipsis: true,
      width: 150
    },
    {
      title: $t('return-order.columns.returnQuantity'),
      dataIndex: 'returnQuantity',
      ellipsis: true,
      fixed: 'right',
      width: 150
    }
  ]
  const returnOrderColumns = [
    {
      title: $t('columns.operation'),
      dataIndex: 'operation',
      fixed: 'left',
      width: 100
    },
    {
      title: $t('columns.index'),
      dataIndex: 'index',
      fixed: 'left',
      width: 50
    },
    {
      title: $t('return-order.returnOrderDetail.batch'),
      dataIndex: 'batch',
      ellipsis: true,
      width: 200
    },
    {
      title: $t('return-order.returnOrderDetail.productName'),
      dataIndex: 'productName',
      ellipsis: true,
      width: 200
    },
    {
      title: $t('return-order.returnOrderDetail.materialPN'),
      dataIndex: 'materialPN',
      ellipsis: true,
      width: 200
    },
    {
      title: $t('return-order.returnOrderDetail.materialName'),
      dataIndex: 'materialName',
      ellipsis: true,
      width: 200
    },
    {
      title: $t('return-order.returnOrderDetail.unit'),
      dataIndex: 'unit',
      ellipsis: true,
      width: 100
    },
    {
      title: $t('return-order.returnOrderDetail.actualPurchaseUnitPrice'),
      dataIndex: 'actualPurchaseUnitPrice',
      ellipsis: true,
      width: 200
    },
    {
      title: $t('return-order.returnOrderDetail.returnQuantity'),
      dataIndex: 'returnQuantity',
      ellipsis: true,
      width: 200
    },
    {
      title: $t('return-order.returnOrderDetail.returnAmount'),
      dataIndex: 'returnAmount',
      ellipsis: true,
      width: 200
    },
    {
      title: $t('return-order.returnOrderDetail.remark'),
      dataIndex: 'remark',
      ellipsis: true
    }
  ]
  const returnOrderSourceColumns = [
    {
      title: $t('columns.index'),
      dataIndex: 'index',
      fixed: 'left',
      width: 50
    },
    {
      title: $t('return-order.returnOrderDetail.batch'),
      dataIndex: 'batch',
      ellipsis: true
    },
    {
      title: $t('return-order.returnOrderDetail.boxNum'),
      dataIndex: 'boxNum',
      ellipsis: true
    },
    {
      title: $t('return-order.returnOrderDetail.productName'),
      dataIndex: 'productName',
      ellipsis: true
    },
    {
      title: $t('return-order.returnOrderDetail.materialPN'),
      dataIndex: 'materialPN',
      ellipsis: true
    },
    {
      title: $t('return-order.returnOrderDetail.materialName'),
      dataIndex: 'materialName',
      ellipsis: true
    },
    {
      title: $t('return-order.returnOrderDetail.qualityLevel'),
      dataIndex: 'qualityLevel',
      ellipsis: true
    },
    {
      title: $t('return-order.returnOrderDetail.inventoryQuantity'),
      dataIndex: 'inventoryQuantity',
      ellipsis: true
    },
    {
      title: $t('return-order.returnOrderDetail.returnQuantity'),
      dataIndex: 'returnQuantity',
      width: 180
    },
    {
      title: $t('return-order.returnOrderDetail.remark'),
      dataIndex: 'remark',
      width: 180
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
      title: $t('return-order.annex.filename'),
      dataIndex: 'filename',
      ellipsis: true
    }
  ]
  const outRecordColumns = [
    {
      title: $t('return-order.outRecord.serverOrder'),
      dataIndex: 'serverOrder',
      ellipsis: true
    },
    {
      title: $t('return-order.outRecord.orderCreateTime'),
      dataIndex: 'orderCreateTime',
      ellipsis: true
    },
    {
      title: $t('return-order.outRecord.finishTime'),
      dataIndex: 'finishTime',
      ellipsis: true
    },
    {
      title: $t('return-order.outRecord.inventoryOrderFinishTime'),
      dataIndex: 'inventoryOrderFinishTime',
      ellipsis: true
    },
    {
      title: $t('return-order.outRecord.approvalStatus'),
      dataIndex: 'approvalStatus',
      ellipsis: true
    },
    {
      title: $t('return-order.outRecord.approvalNodes'),
      dataIndex: 'approvalNodes',
      ellipsis: true
    },
    {
      title: $t('return-order.outRecord.productName'),
      dataIndex: 'productName',
      ellipsis: true
    },
    {
      title: $t('return-order.outRecord.outQuantity'),
      dataIndex: 'outQuantity',
      ellipsis: true
    },
    {
      title: $t('return-order.outRecord.outAmount'),
      dataIndex: 'outAmount',
      ellipsis: true
    }
  ]
  return {
    columns,
    returnOrderColumns,
    returnOrderSourceColumns,
    annexColumns,
    outRecordColumns
  }
}

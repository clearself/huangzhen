import { $t } from '@/i18n'

// 表格分页的配置
export default function useFilterFactorModal() {
  // 设置列
  const columns = [
    {
      title: $t('columns.index'),
      dataIndex: 'index',
      align: 'center',
      fixed: 'left',
      width: 80
    },
    {
      title: $t('purchase.purchaseDetail.productName'),
      dataIndex: 'productName',
      fixed: 'left',
      ellipsis: true
    },
    {
      title: $t('purchase.purchaseDetail.materialPN'),
      dataIndex: 'materialPN',
      ellipsis: true
    },
    {
      title: $t('purchase.purchaseDetail.materialName'),
      dataIndex: 'materialName',
      ellipsis: true
    },
    {
      title: $t('purchase.purchaseDetail.supplierPN'),
      dataIndex: 'supplierPN',
      ellipsis: true
    },
    {
      title: $t('purchase.purchaseDetail.manufacturerPN'),
      dataIndex: 'manufacturerPN',
      ellipsis: true
    }
  ]
  return {
    columns
  }
}

export default {
  purchase: {
    title: '采购单',
    columns: {
      businessTime: '业务时间',
      purchaseOrder: '采购单号',
      purchaseReturnOrder: '采购退货单号',
      mappingReturnOrder: '关联采购退货单号',
      purchaseReasons: '采购原因',
      creater: '创建人',
      warehouseName: '仓库名称',
      supplierName: '供货商名称',
      customerName: '客户（货主）名称',
      planArrivalTime: '预计到货时间',
      approvalStatus: '审批状态',
      approvalNodes: '审批节点',
      paymentStatus: '付款状态',
      entryStatus: '入库状态',
      purchaseName: '采购品名',
      purchaseQuantity: '采购数量',
      payMethod: '结算方式',
      currency: '币种',
      otherExpenses: '其他费用',
      totalAmount: '应付款总计',
      sendOrderNumber: '送货单号',
      remark: '备注',
      purchaseAmount: '采购金额',
      payAmount: '已结算金额',
      ApprovalPayAmount: '审批中结算金额',
      noPayAmount: '未结算金额'
    },
    purchaseOrdernumber: '采购订单号',
    tableTitle: '表头信息',
    orderProcess: '订单流程',
    tab1: '采购明细',
    tab2: '物流明细',
    tab3: '附件',
    tab4: '入库记录',
    tab5: '退货记录',
    purchaseDetail: {
      productName: '品名',
      materialPN: '物料PN',
      supplierPN: '供货商PN',
      manufacturerPN: '制造商PN',
      materialName: '物料名称',
      unit: '单位',
      actualPurchaseUnitPrice: '实际采购单价（含税）',
      purchaseQuantity: '采购数量',
      actualPurchaseAmount: '实际采购金额（含税）',
      taxRate: '税率(％)',
      taxAmount: '税额',
      remark: '备注'
    },
    logisticsDetail: {
      logisticsCompanyName: '物流公司名称',
      logisticsMethods: '物流方式',
      contacts: '联系人',
      contactInformation: '联系方式',
      logisticsTrackingNumber: '物流单号',
      licensePlateNumber: '车牌号',
      remark: '备注'
    },
    annex: {
      filename: '文件名称'
    },
    inRecord: {
      serverOrder: '服务商库单号',
      orderCreateTime: '创单时间',
      finishTime: '作业完成时间',
      inventoryOrderFinishTime: '库单完成时间',
      approvalStatus: '审批状态',
      approvalNodes: '审批节点',
      productName: '品名',
      inventoryQuantity: '入库数量',
      inventoryAmount: '入库金额（含税）'
    },
    returnRecord: {
      serverOrder: '采购退货单号',
      orderCreateTime: '创单时间',
      returnTime: '退货时间',
      orderFinishTime: '订单完成时间',
      returnReasons: '退货原因',
      approvalStatus: '审批状态',
      approvalNodes: '审批节点',
      productName: '品名',
      returnQuantity: '退货数量',
      returnAmount: '退货金额（含税）'
    },
    placeholder0: '选填，>0，两位小数',
    placeholder1: '必填，≤20字',
    placeholder2: '必填，≥0，两位小数',
    placeholder3: '必填，>0整数',
    placeholder4: '选填，≥0，两位小数',
    placeholder5: '非必填，≤100字',
    placeholder6: '必填，≤50字',
    placeholder7: '选填，≤50字',
    placeholder8: '必填，≤100字',
    placeholder9: '选填，≤100字'
  }
}

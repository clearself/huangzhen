export default {
  purchase: {
    title: 'Purchase order',
    columns: {
      businessTime: 'Business time',
      purchaseOrder: 'Purchase order',
      purchaseReturnOrder: 'Purchase return order number',
      mappingReturnOrder: 'Associated purchase return order number',
      purchaseReasons: 'Procurement reasons',
      creater: 'Creater',
      warehouseName: 'Warehouse name',
      supplierName: 'Supplier name',
      customerName: 'Customer (shipowner) name',
      planArrivalTime: 'Estimated delivery time',
      approvalStatus: 'Approval status',
      approvalNodes: 'Approval nodes',
      paymentStatus: 'Payment status',
      entryStatus: 'Entry status',
      purchaseName: 'Procurement product name',
      purchaseQuantity: 'Purchase quantity',
      payMethod: 'Settlement method',
      currency: 'Currency',
      otherExpenses: 'Other expenses',
      totalAmount: 'Total accounts payable',
      sendOrderNumber: 'Delivery note number',
      remark: 'Remark',
      purchaseAmount: 'Purchase amount',
      payAmount: 'Settled amount',
      ApprovalPayAmount: 'Settlement amount under approval',
      noPayAmount: 'Unsettled amount'
    },
    purchaseOrdernumber: 'Purchase order number',
    tableTitle: 'Header information',
    orderProcess: 'Order process',
    tab1: 'Procurement details',
    tab2: 'Logistics details',
    tab3: 'Annex',
    tab4: 'Storage records',
    tab5: 'Return Record',
    purchaseDetail: {
      productName: 'Product Name',
      materialPN: 'Material PN',
      supplierPN: 'Supplier PN',
      manufacturerPN: 'Manufacturer PN',
      materialName: 'Material nmae',
      unit: 'Unit',
      actualPurchaseUnitPrice: 'Actual purchase unit price (including tax)',
      purchaseQuantity: 'Purchase quantity',
      actualPurchaseAmount: 'Actual purchase amount (including tax)',
      taxRate: 'Tax rate(％)',
      taxAmount: 'Tax amount',
      remark: 'Remark'
    },
    logisticsDetail: {
      logisticsCompanyName: 'Logistic company name',
      logisticsMethods: 'Logistics methods',
      contacts: 'Contacts',
      contactInformation: 'Contact information',
      logisticsTrackingNumber: 'Logistics tracking number',
      licensePlateNumber: 'License plate number',
      remark: 'Remark'
    },
    annex: {
      filename: 'File name'
    },
    inRecord: {
      serverOrder: 'Service provider inventory number',
      orderCreateTime: 'Order creation time',
      finishTime: 'Completion time of homework',
      inventoryOrderFinishTime: 'Completion time of inventory order',
      approvalStatus: 'Approval status',
      approvalNodes: 'Approval nodes',
      productName: 'Product name',
      inventoryQuantity: 'Inventory quantity',
      inventoryAmount: 'Receipt amount (including tax)'
    },
    returnRecord: {
      serverOrder: 'Purchase return order number',
      orderCreateTime: 'Order creation time',
      returnTime: 'Return time',
      finishTime: 'Completion time of homework',
      orderFinishTime: 'Order completion time',
      returnReasons: 'Return reason',
      approvalStatus: 'Approval status',
      approvalNodes: 'Approval nodes',
      productName: 'Product name',
      returnQuantity: 'Return quantity',
      returnAmount: 'Return amount (including tax)'
    },
    placeholder0: 'Required, > 0, two decimal places',
    placeholder1: 'Required, ≤ 20 words',
    placeholder2: 'Required, ≥ 0, two decimal places',
    placeholder3: 'Required,>0 integer',
    placeholder4: 'Optional, ≥ 0, two decimal places',
    placeholder5: 'Not mandatory, ≤ 100 words',
    placeholder6: 'Required, ≤ 50words',
    placeholder7: 'Optional, ≤ 50words',
    placeholder8: 'Required, ≤ 100words',
    placeholder9: 'Optional, ≤100 words'
  }
}
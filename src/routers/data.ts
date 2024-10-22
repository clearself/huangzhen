export const routerlist = [
  {
    id: '1',
    name: 'menu.data-dic',
    icon: 'icon-gongzuotai',
    path: '/data-dic',
    redirect: '/data-dic/enumer',
    ignore: false,
    type: false,
    childMenuList: [
      {
        id: '1-1',
        name: 'menu.data-dic.enumer',
        path: '/data-dic/enumer',
        ignore: false,
        type: true
      },
      {
        id: '1-2',
        name: 'menu.data-dic.product',
        path: '/data-dic/product',
        ignore: false,
        type: true
      }
    ]
  }
]

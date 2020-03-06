// 菜单 侧边栏
export default [
  { path: '/dashboard', title: '仪表盘', icon: 'home' },
  {
    path: '/carousel',
    title: '轮播管理',
    icon: 'picture-o'
  },
  {
    path: '/classify',
    title: '分类管理',
    icon: 'cubes'
  },
  {
    title: '商品管理',
    icon: 'shopping-bag',
    children: [
      { path: '/goods/list', icon: 'list', title: '商品列表' },
      { path: '/goods/add', icon: 'plus', title: '新增商品' }
    ]
  },
  {
    path: '/orders',
    title: '订单管理',
    icon: 'shopping-cart'
  },
  {
    path: '/users',
    title: '用户管理',
    icon: 'group'
  },
  {
    path: '/shop',
    title: '店铺管理',
    icon: 'gear'
  }
]

import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'dashboard' },
    component: layoutHeaderAside,
    children: [
      // 仪表盘
      {
        path: 'dashboard',
        name: 'dashboard',
        meta: {
          title: '仪表盘',
          auth: true
        },
        component: _import('Dashboard')
      },
      // 演示页面
      {
        path: 'carousel',
        name: 'carousel',
        meta: {
          title: '轮播管理',
          auth: true
        },
        component: _import('Carousel')
      },
      {
        path: 'classify',
        name: 'classify',
        meta: {
          title: '分类管理',
          auth: true
        },
        component: _import('Classify')
      },
      {
        path: 'goods/list',
        name: 'goods-list',
        meta: {
          title: '商品列表',
          auth: true
        },
        component: _import('Goods/List')
      },
      {
        path: 'goods/add',
        name: 'goods-add',
        meta: {
          title: '新增商品',
          auth: true
        },
        component: _import('Goods/Add')
      },
      {
        path: 'goods/edit/:id',
        name: 'goods-edit',
        meta: {
          title: '修改商品',
          auth: true
        },
        component: _import('Goods/Edit')
      },
      {
        path: 'orders',
        name: 'orders',
        meta: {
          title: '订单管理',
          auth: true
        },
        component: _import('Orders')
      },
      {
        path: 'print/:id',
        name: 'print',
        meta: {
          title: '打印订单',
          auth: true
        },
        component: _import('Orders/print')
      },
      {
        path: 'page3',
        name: 'page3',
        meta: {
          title: '页面 3',
          auth: true
        },
        component: _import('demo/page3')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]

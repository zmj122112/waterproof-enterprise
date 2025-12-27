import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/c-mini/home'
    },
    // C端小程序
    {
      path: '/c-mini',
      name: 'c-mini',
      component: () => import('../views/c-mini/Layout.vue'),
      children: [
        {
          path: 'home',
          name: 'c-mini-home',
          component: () => import('../views/c-mini/Home.vue')
        },
        {
          path: 'repair-estimate',
          name: 'c-mini-repair-estimate',
          component: () => import('../views/c-mini/RepairEstimate.vue')
        },
        {
          path: 'appointment',
          name: 'c-mini-appointment',
          component: () => import('../views/c-mini/Appointment.vue')
        },
        {
          path: 'work-order-progress',
          name: 'c-mini-work-order-progress',
          component: () => import('../views/c-mini/WorkOrderProgress.vue')
        },
        {          path: 'user-center',          name: 'c-mini-user-center',          component: () => import('../views/c-mini/UserCenter.vue')        },        {          path: 'product-list',          name: 'c-mini-product-list',          component: () => import('../views/c-mini/ProductList.vue')        },        {          path: 'product-detail/:id',          name: 'c-mini-product-detail',          component: () => import('../views/c-mini/ProductDetail.vue')        },        {          path: 'master-list',          name: 'c-mini-master-list',          component: () => import('../views/c-mini/MasterList.vue')        },        {          path: 'master-detail/:id',          name: 'c-mini-master-detail',          component: () => import('../views/c-mini/MasterDetail.vue')        },        {          path: 'address-management',          name: 'c-mini-address-management',          component: () => import('../views/c-mini/AddressManagement.vue')        },        {          path: 'coupon-center',          name: 'c-mini-coupon-center',          component: () => import('../views/c-mini/CouponCenter.vue')        },
        {          path: 'project-case-list',          name: 'c-mini-project-case-list',          component: () => import('../views/c-mini/ProjectCaseList.vue')        },
        {          path: 'project-case-detail/:id',          name: 'c-mini-project-case-detail',          component: () => import('../views/c-mini/ProjectCaseDetail.vue')        },
        {          path: 'customer-review-list',          name: 'c-mini-customer-review-list',          component: () => import('../views/c-mini/CustomerReviewList.vue')        },
        {          path: 'customer-review-detail/:id',          name: 'c-mini-customer-review-detail',          component: () => import('../views/c-mini/CustomerReviewDetail.vue')        },        {          path: 'work-order-detail/:id',          name: 'c-mini-work-order-detail',          component: () => import('../views/c-mini/WorkOrderDetail.vue')        },        {          path: 'invoice-center',          name: 'c-mini-invoice-center',          component: () => import('../views/c-mini/InvoiceCenter.vue')        },        {          path: 'settings',          name: 'c-mini-settings',          component: () => import('../views/c-mini/Settings.vue')        },        {          path: 'exclusive-customer-service',          name: 'c-mini-exclusive-customer-service',          component: () => import('../views/c-mini/ExclusiveCustomerService.vue')        },        {          path: 'order-list',          name: 'c-mini-order-list',          component: () => import('../views/c-mini/OrderList.vue')        },        {          path: 'order-detail/:id',          name: 'c-mini-order-detail',          component: () => import('../views/c-mini/OrderDetail.vue')        }
      ]
    },
    // B端门户
    {
      path: '/b-portal',
      name: 'b-portal',
      component: () => import('../views/b-portal/Layout.vue'),
      children: [
        // 建筑管理
        {
          path: 'building-management',
          name: 'b-portal-building-management',
          component: () => import('../views/b-portal/BuildingManagement.vue')
        },
        {
          path: 'building-detail/:id',
          name: 'b-portal-building-detail',
          component: () => import('../views/b-portal/BuildingDetail.vue')
        },
        // 报修中心
        {
          path: 'repair-center',
          name: 'b-portal-repair-center',
          component: () => import('../views/b-portal/RepairCenter.vue')
        },
        {
          path: 'repair-detail/:id',
          name: 'b-portal-repair-detail',
          component: () => import('../views/b-portal/RepairDetail.vue')
        },
        // 施工管理
        {
          path: 'construction-management',
          name: 'b-portal-construction-management',
          component: () => import('../views/b-portal/ConstructionManagement.vue')
        },
        {
          path: 'construction-detail/:id',
          name: 'b-portal-construction-detail',
          component: () => import('../views/b-portal/ConstructionDetail.vue')
        },
        {
          path: 'project-evaluation/:id',
          name: 'b-portal-project-evaluation',
          component: () => import('../views/b-portal/ProjectEvaluation.vue')
        },
        // 财务管理
        {
          path: 'contract-management',
          name: 'b-portal-contract-management',
          component: () => import('../views/b-portal/ContractProject.vue')
        },
        {
          path: 'invoice-management',
          name: 'b-portal-invoice-management',
          component: () => import('../views/b-portal/InvoiceManagement.vue')
        },
        {
          path: 'payment-management',
          name: 'b-portal-payment-management',
          component: () => import('../views/b-portal/PaymentManagement.vue')
        },
        // 个人中心
        {
          path: 'user-center',
          name: 'b-portal-user-center',
          component: () => import('../views/b-portal/UserCenter.vue')
        },
        // 保留原有路由作为兼容
        {
          path: 'batch-repair',
          name: 'b-portal-batch-repair',
          component: () => import('../views/b-portal/BatchRepair.vue')
        },
        {
          path: 'contract-project',
          name: 'b-portal-contract-project',
          component: () => import('../views/b-portal/ContractProject.vue')
        },
        {
          path: 'account-reconciliation',
          name: 'b-portal-account-reconciliation',
          component: () => import('../views/b-portal/AccountReconciliation.vue')
        }
      ]
    },
    // 管理系统
    {
      path: '/admin-system',
      name: 'admin-system',
      component: () => import('../views/admin-system/Layout.vue'),
      children: [
        {
          path: 'work-order-management',
          name: 'admin-system-work-order-management',
          component: () => import('../views/admin-system/WorkOrderManagement.vue')
        },
        {
          path: 'work-order-detail/:id',
          name: 'admin-system-work-order-detail',
          component: () => import('../views/admin-system/WorkOrderDetail.vue')
        },
        {
          path: 'customer-management',
          name: 'admin-system-customer-management',
          component: () => import('../views/admin-system/CustomerManagement.vue')
        },
        {
          path: 'staff-management',
          name: 'admin-system-staff-management',
          component: () => import('../views/admin-system/StaffManagement.vue')
        },
        {
          path: 'material-management',
          name: 'admin-system-material-management',
          component: () => import('../views/admin-system/MaterialManagement.vue')
        },
        {
          path: 'contract-management',
          name: 'admin-system-contract-management',
          component: () => import('../views/admin-system/ContractManagement.vue')
        },
        {
          path: 'contract-detail/:id',
          name: 'admin-system-contract-detail',
          component: () => import('../views/admin-system/ContractDetail.vue')
        },
        {
          path: 'project-management',
          name: 'admin-system-project-management',
          component: () => import('../views/admin-system/ProjectManagement.vue')
        },
        {
          path: 'project-detail/:id',
          name: 'admin-system-project-detail',
          component: () => import('../views/admin-system/ProjectDetail.vue')
        },
        {
          path: 'finance-management',
          name: 'admin-system-finance-management',
          component: () => import('../views/admin-system/FinanceManagement.vue')
        },
        {
          path: 'equipment-management',
          name: 'admin-system-equipment-management',
          component: () => import('../views/admin-system/EquipmentManagement.vue')
        },
        {
          path: 'equipment-detail/:id',
          name: 'admin-system-equipment-detail',
          component: () => import('../views/admin-system/EquipmentDetail.vue')
        },
        {
          path: 'knowledge-base',
          name: 'admin-system-knowledge-base',
          component: () => import('../views/admin-system/KnowledgeBase.vue')
        },
        {
          path: 'supplier-management',
          name: 'admin-system-supplier-management',
          component: () => import('../views/admin-system/SupplierManagement.vue')
        },
        {
          path: 'supplier-detail/:id',
          name: 'admin-system-supplier-detail',
          component: () => import('../views/admin-system/SupplierDetail.vue')
        },
        {
          path: 'data-statistics',
          name: 'admin-system-data-statistics',
          component: () => import('../views/admin-system/DataStatistics.vue')
        },
        {
          path: 'report-center',
          name: 'admin-system-report-center',
          component: () => import('../views/admin-system/ReportCenter.vue')
        },
        {
          path: 'log-management',
          name: 'admin-system-log-management',
          component: () => import('../views/admin-system/LogManagement.vue')
        },
        {
          path: 'role-permission',
          name: 'admin-system-role-permission',
          component: () => import('../views/admin-system/RolePermission.vue')
        },
        {
          path: 'system-config',
          name: 'admin-system-system-config',
          component: () => import('../views/admin-system/SystemConfig.vue')
        },
        {
          path: 'notification-management',
          name: 'admin-system-notification-management',
          component: () => import('../views/admin-system/NotificationManagement.vue')
        }
      ]
    },
    // 师傅端
    {
      path: '/master-app',
      component: () => import('../views/master-app/Layout.vue'),
      children: [
        {
          path: '',
          name: 'master-app',
          redirect: '/master-app/work-order-receive'
        },
        {
          path: 'work-order-receive',
          name: 'master-app-work-order-receive',
          component: () => import('../views/master-app/WorkOrderReceive.vue')
        },
        {
          path: 'construction-record',
          name: 'master-app-construction-record',
          component: () => import('../views/master-app/ConstructionRecord.vue')
        },
        {
          path: 'construction-record/:id',
          name: 'master-app-construction-record-detail',
          component: () => import('../views/master-app/ConstructionRecordDetail.vue')
        },
        {
          path: 'completion-confirmation',
          name: 'master-app-completion-confirmation',
          component: () => import('../views/master-app/CompletionConfirmation.vue')
        },
        {
          path: 'completion-confirmation/:id',
          name: 'master-app-completion-confirmation-detail',
          component: () => import('../views/master-app/CompletionConfirmationDetail.vue')
        },
        {
          path: 'score-center',
          name: 'master-app-score-center',
          component: () => import('../views/master-app/ScoreCenter.vue')
        },
        {
          path: 'score-mall',
          name: 'master-app-score-mall',
          component: () => import('../views/master-app/ScoreMall.vue')
        },
        {
          path: 'exchange-record',
          name: 'master-app-exchange-record',
          component: () => import('../views/master-app/ExchangeRecord.vue')
        },
        {
          path: 'ranking',
          name: 'master-app-ranking',
          component: () => import('../views/master-app/Ranking.vue')
        },
        {
          path: 'personal-center',
          name: 'master-app-personal-center',
          component: () => import('../views/master-app/PersonalCenter.vue')
        },
        {
          path: 'profile',
          name: 'master-app-profile',
          component: () => import('../views/master-app/Profile.vue')
        },
        {
          path: 'change-password',
          name: 'master-app-change-password',
          component: () => import('../views/master-app/ChangePassword.vue')
        },
        {
          path: 'bind-phone',
          name: 'master-app-bind-phone',
          component: () => import('../views/master-app/BindPhone.vue')
        },
        {
          path: 'my-orders',
          name: 'master-app-my-orders',
          component: () => import('../views/master-app/MyOrders.vue')
        },
        {
          path: 'help-center',
          name: 'master-app-help-center',
          component: () => import('../views/master-app/HelpCenter.vue')
        },
        {
          path: 'about-us',
          name: 'master-app-about-us',
          component: () => import('../views/master-app/AboutUs.vue')
        },
        {
          path: 'privacy-policy',
          name: 'master-app-privacy-policy',
          component: () => import('../views/master-app/PrivacyPolicy.vue')
        },
        {
          path: 'user-agreement',
          name: 'master-app-user-agreement',
          component: () => import('../views/master-app/UserAgreement.vue')
        }
      ]
    }
  ]
})

export default router

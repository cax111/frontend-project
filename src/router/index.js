import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      requiredAuth:true,
      userAuth:true,
    }
  },
  {
    path: "/dashboard-admin",
    name: "homeAdmin",
    component: () => import("../views/dashboardAdmin.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
    }
  },
  //--------------------------- route auth ---------------------------
  {
    path: "/login",
    name: 'login',
    component: () => import("../views/auth/Login.vue"),
    meta: {
      requiredVisitor:true,
    },
    props:true
  },
  {
    path: "/logout",
    name: 'logout',
    component: () => import("../views/auth/Logout.vue"),
    meta: {
      requiredAuth:true,
    },
    props:true
  },
  //------------------------------- route gudang ----------------------------
  {
    path: "/gudang",
    name: 'gudang',
    component: () => import("../views/gudang/Gudang.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/gudang/gudang-detail/:id",
    name: 'gudang-detail',
    component: () => import("../views/gudang/gudang-detail.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/gudang/add-gudang",
    name: 'add-gudang',
    component: () => import("../views/gudang/Add-Gudang.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/gudang/edit-gudang/:id",
    name: 'edit-gudang',
    component: () => import("../views/gudang/Edit-Gudang.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/gudang/delete-gudang/:id",
    name: 'delete-gudang',
    component: () => import("../views/gudang/Delete-Gudang.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  //------------------------------- route suppliers ----------------------------
  {
    path: "/suppliers",
    name: 'suppliers',
    component: () => import("../views/suppliers/Suppliers.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/suppliers/supplier-detail/:id",
    name: 'suplier-detail',
    component: () => import("../views/suppliers/supplier-detail.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/suppliers/add-supplier",
    name: 'add-suplier',
    component: () => import("../views/suppliers/Add-Supplier.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/suppliers/edit-supplier/:id",
    name: 'edit-suplier',
    component: () => import("../views/suppliers/Edit-Supplier.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  //------------------------------- route items ----------------------------
  {
    path: "/items",
    name: 'items',
    component: () => import("../views/items/Items.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/items/item-detail/:id",
    name: 'item-detail',
    component: () => import("../views/items/item-detail.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/items/add-item",
    name: 'add-item',
    component: () => import("../views/items/Add-Item.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  //------------------------------- route items ----------------------------
  {
    path: "/orders",
    name: 'orders',
    component: () => import("../views/orders/Orders.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/orders/order-detail/:id",
    name: 'order-detail',
    component: () => import("../views/orders/order-detail.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  //----------------------------- route account --------------------------
  {
    path: "/show-accounts",
    name: 'show-accounts',
    component: () => import("../views/account-management/Show-Accounts.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/show-accounts/add-account",
    name: 'add-account',
    component: () => import("../views/account-management/Add-Account.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/show-accounts/edit-account/:id",
    name: 'edit-account',
    component: () => import("../views/account-management/Edit-Account.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/show-accounts/delete-account/:id",
    name: 'delete-account',
    component: () => import("../views/account-management/Delete-Account.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/admin",
    name: 'admin',
    component: () => import("../views/About.vue"),
    meta: {
      requiredAuth:true,
      adminAuth:true,
      superAdminAuth:true,
    },
    props:true
  },
  {
    path: "/resident",
    name: 'resident',
    component: () => import("../views/auth/Login.vue"),
    meta: {
      requiredAuth:true,
      superAdminAuth:true,
      adminAuth:false
    },
    props:true
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) =>{
  const idUser = window.localStorage.getItem('getIdUser')
  const token = window.localStorage.getItem('access_token')
  const role = window.localStorage.getItem('role')

  if(to.meta.requiredAuth){
    if(!idUser || !token){
      next({name:'login'})
    }else if(to.meta.adminAuth){
      if(role == "USER"){
        next({name:'home'})
      }else{
        next()
      }
    }else if(to.meta.userAuth){
      if(role == "USER"){
        next()
      }else{
        next({name:'homeAdmin'})
      }
    }else{
      next()
    }
  }else if(to.meta.requiredVisitor){
    if(idUser || token){
      next({name:'home'})
    }else{
      next()
    }
  }
})

export default router;

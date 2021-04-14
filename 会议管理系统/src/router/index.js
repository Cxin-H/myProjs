import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta:{requireAuth: false}
  },
  {
    path: '/home',
    name: 'Home',
    // redirect:"/mymeeting",
    component: () => import('../views/Home.vue'),
    children:[
      {
        path: '/mymeeting',
        name: 'Mymeeting',
        component: () => import('../views/Mymeeting.vue'),
        meta:{title:"我的会议",requireAuth: true}
      },
      {
        path: '/yuding',
        name: 'Yuding',
        component: () => import('../views/Yuding.vue'),
        meta:{title:"会议预定",requireAuth: true}
      },
      {
        path: '/meetingroom',
        name: 'Meetingroom',
        component: () => import('../views/Meetingroom.vue'),
        meta:{title:"会议室",requireAuth: true}
      },
      {
        path: '/system',
        name: 'System',
        component: () => import('../views/System.vue'),
        meta:{title:"系统管理"},
        children:[
          {
            path: '/system/users',
            name: 'users',
            component: () => import('../views/Users.vue'),
            meta:{title:"用户管理",requireAuth: true},
          },
          {
            path: '/system/jigou',
            name: 'jigou',
            component: () => import('../views/Jigou.vue'),
            meta:{title:"机构管理",requireAuth: true},
          },
          {
            path: '/system/role',
            name: 'role',
            component: () => import('../views/Role.vue'),
            meta:{title:"角色管理",requireAuth: true},
          },
          {
            path: '/system/auth',
            name: 'auth',
            component: () => import('../views/Auth.vue'),
            meta:{
              title:"授权管理",
              requireAuth: true
            },
          },
          {
            path: '/system/zhongduan',
            name: 'zhongduan',
            component: () => import('../views/Zhongduan.vue'),
            meta:{
              title:"终端管理",
              requireAuth: true
            },
          },
          {
            path: '/system/huiyiguanli',
            name: 'huiyiguanli',
            component: () => import('../views/Huiyiguanli.vue'),
            meta:{title:"会议管理",
              requireAuth: true
            },
          },
        ]
      },
    ]
  },
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next)=>{
  let userInfo = JSON.parse(sessionStorage.getItem('loginInfo'));
  if(to.meta.requireAuth){
    if(!userInfo || userInfo && !userInfo.logined){
      // router.push('/');
    }else {
      next();
    }
  }else{
    next();
  }
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router

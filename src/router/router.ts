import React, { lazy } from 'react';

const Home = lazy(() => import('../pages/Home'));
const Counter = lazy(() => import('../pages/Counter'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes:any = [
  {
    path: '/',
    redirect: '/home',
    exact: true,
  },
  {
    path: '/counter',
    component: Counter,
    exact: false,
  },
  {
    path: '/home',
    component: Home,
    exact: false,
    // children: [
    //   {
    //     path: '/home/home1',
    //     component: HomeA,
    //     exact: true,
    //   },
    // ],
  },
  // 找不到路径的时候 进行匹配
  {
    path: '*',
    component: NotFound,
    exact: false,
  },
];

export default routes;
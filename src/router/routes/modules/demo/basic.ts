// 基础组件展示
import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const basicComp: AppRouteModule = {
  path: '/basicComp',
  name: 'BasicComp',
  component: LAYOUT,
  redirect: '/dashboard/analysis',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    title: '基础组件',
  },
  children: [
    {
      path: 'alert',
      name: 'BasicAlert',
      component: () => import('/@/views/dashboard/analysis/index.vue'),
      meta: {
        title: 'alert',
      },
    },
  ],
};

export default basicComp;

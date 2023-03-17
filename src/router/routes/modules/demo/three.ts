import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const charts: AppRouteModule = {
  path: '/three',
  name: 'Three',
  component: LAYOUT,
  redirect: '/three/index/map',
  meta: {
    orderNo: 500,
    icon: 'ion:bar-chart-outline',
    title: '3d案例',
  },
  children: [
    {
      path: 'line',
      name: 'LineDemo',
      meta: {
        title: '3d字体',
      },
      component: () => import('/@/views/demo/3d/text/text-font.vue'),
    },
    {
      path: 'stroke',
      name: 'LineDemo2',
      meta: {
        title: '3d描边字体',
      },
      component: () => import('/@/views/demo/3d/text/text-stroke.vue'),
    },
  ],
};

export default charts;

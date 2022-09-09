import { withInstall } from '/@/utils';
import Alert from './src/alert.vue';

// 容器层可以导出很多东西
export const ElAlert = withInstall(Alert);
export default ElAlert;
// export * from './src/alert'

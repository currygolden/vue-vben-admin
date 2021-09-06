import type { TransitionSetting } from '/#/config';

import { computed } from 'vue';

import { useAppStore } from '/@/store/modules/app';

// 动画hooks
export function useTransitionSetting() {
  const appStore = useAppStore();
  // 定义依赖store的计算属性
  const getEnableTransition = computed(() => appStore.getTransitionSetting?.enable);

  const getOpenNProgress = computed(() => appStore.getTransitionSetting?.openNProgress);

  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting?.openPageLoading;
  });

  const getBasicTransition = computed(() => appStore.getTransitionSetting?.basicTransition);
  // Partial 定义全部为可选类型
  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setProjectConfig({ transitionSetting });
  }
  // hooks 暴露的数据
  return {
    setTransitionSetting,

    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,
  };
}

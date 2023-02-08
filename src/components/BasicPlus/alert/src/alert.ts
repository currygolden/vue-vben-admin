import { keysIn } from 'lodash-es';
import { TypeComponentsMap } from '/@/utils/compnents/icon';
import type { ExtractPropTypes } from 'vue';

export const alertEffects = ['light', 'dark'] as const;

export const alertProps = {
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  closable: {
    type: Boolean,
    default: true,
  },
  closeText: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    values: keysIn(TypeComponentsMap),
  },
  effect: {
    type: String,
    values: alertEffects,
    default: 'light',
  },
};

export type AlertProps = ExtractPropTypes<typeof alertProps>;

// 定义事件接口
export const alertEmits = {
  close: (evt: MouseEvent) => evt instanceof MouseEvent,
};

export type AlertEmits = typeof alertEmits;

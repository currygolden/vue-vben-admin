// todo: 参考全局状态

export const defaultNamespace = 'el';
const statePrefix = 'is-';

/**
 * @description 定义bem生成函数
 * 符合bem 命名规范
 */

const _bem = (
  namespace: string,
  block: string,
  blockSuffix: string,
  element: string,
  modifer: string,
) => {
  let cls = `${namespace}-${block}`;
  if (blockSuffix) cls += `-${blockSuffix}`;
  if (element) cls += `__${element}`;
  if (modifer) cls += `--${modifer}`;

  return cls;
};

/**
 * @description namespace api
 * 基于模块的样式api
 *
 */
export const useNamespace = (block: string) => {
  const namespace = 'fish';

  const b = (blockSuffix = '') => _bem(namespace, block, blockSuffix, '', '');
  const e = (element?: string) => (element ? _bem(namespace, block, '', element, '') : '');
  const m = (modifier?: string) => (modifier ? _bem(namespace, block, '', '', modifier) : '');
  const be = (blockSuffix?: string, element?: string) =>
    blockSuffix && element ? _bem(namespace, block, blockSuffix, element, '') : '';
  const em = (element?: string, modifier?: string) =>
    element && modifier ? _bem(namespace, block, '', element, modifier) : '';
  const bm = (blockSuffix?: string, modifier?: string) =>
    blockSuffix && modifier ? _bem(namespace, block, blockSuffix, '', modifier) : '';
  const bem = (blockSuffix?: string, element?: string, modifier?: string) =>
    blockSuffix && element && modifier
      ? _bem(namespace, block, blockSuffix, element, modifier)
      : '';
  const is = (name?: string, ...args: [boolean | undefined]) => {
    const state = args.length >= 1 ? args[0] : true;
    return name && state ? `${statePrefix}${name}` : '';
  };

  return {
    namespace,
    b,
    e,
    m,
    be,
    em,
    bm,
    bem,
    is,
  };
};

export type UseNamespaceReturn = ReturnType<typeof useNamespace>;

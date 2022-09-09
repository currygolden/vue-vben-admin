import { defHttp } from '/@/utils/http/axios';
import { getMenuListResultModel } from './model/menuModel';
console.log('http', defHttp);
enum Api {
  GetMenuList = '/getMenuList',
}

/**
 * @description: Get user menu based on id
 */

export const getMenuList = () => {
  return defHttp.get<getMenuListResultModel>({ url: Api.GetMenuList });
};

import request from './request';

/**
 * 获取预设字段schema数据
 * @returns {Promise}
 */
export function getPresetFieldsSchema(bizId) {
  return request({
    url: '/preset-fields-schema',
    method: 'GET',
    params: {
      bizId
    }
  })
}

import { BaseBiz } from "@formily/element-plus-renderer";
import request from './api/request';

function isNil(value) {
  return value === null || value === void(0);
}

function pickBy(obj, iterator = (...args) => !isNil.call(null, ...args)) {
  const result = {};

  Object.keys(obj).forEach((key) => {
    if (iterator(obj[key])) {
      result[key] = obj[key];
    }
  });

  return result;
}

export class Biz extends BaseBiz {
  [property: string]: any;

  constructor() {
    super();
  }

  /**
   * 获取场景预设schema
   */
  getPreset() {
    // 参数 mode=1, bizId
    return request({
      url: '/preset-fields-schema',
      method: 'GET',
      params: pickBy({
        mode: this.mode,
        bizId: this.bizId,
      }),
    });
  }

  /**
   * 获取模板schema
   */
  getTemplate() {
    // 参数 mode=2, bizId, templateId
    return request({
      url: '/template-fields-schema',
      method: 'GET',
      params: pickBy({
        mode: this.mode,
        bizId: this.bizId,
        templateId: this.templateId,
      }),
    });
  }

  /**
   * 基于模板id创建落地页 or 基于formId更新落地页
   */
  getForm() {
    // 参数 mode=3, bizId, formId? || templateId?
    return request({
      url: '/form-fields-schema',
      method: 'GET',
      params: pickBy({
        mode: this.mode,
        bizId: this.bizId,
        formId: this.formId,
        templateId: this.templateId,
      }),
    });
  }

  /**
   * 创建/编辑预设字段
   */
  savePreset(schema) {
    // 参数 mode=1, bizId
    return request({
      url: '/preset-fields-schema/save',
      method: 'POST',
      data: pickBy({
        mode: this.mode,
        bizId: this.bizId,
        schema,
      }),
    });
  }

  /**
   * 创建/编辑模板
   */
  saveTemplate(schema) {
    // 参数 mode=2, bizId, templateId?
    return request({
      url: '/template-fields-schema/save',
      method: 'POST',
      data: pickBy({
        mode: this.mode,
        bizId: this.bizId,
        templateId: this.templateId,
        schema,
      }),
    });
  }

  /**
   * 创建/编辑落地页
   */
  saveForm(schema) {
    // 参数 mode=3, bizId, formId?
    return request({
      url: '/form-fields-schema/save',
      method: 'POST',
      data: pickBy({
        mode: this.mode,
        bizId: this.bizId,
        formId: this.formId,
        schema,
      }),
    });
  }

  getInitJsonSchema() {
    if (this.isPresetMode()) {
      return this.getPreset();
    }

    if (this.isTemplateMode()) {
      return this.getTemplate();
    }

    if (this.isFormMode()) {
      return this.getForm();
    }

    return new Promise(() => ({}));
  }

  saveJsonSchema(schema) {
    if (this.isPresetMode()) {
      return this.savePreset(schema);
    }

    if (this.isTemplateMode()) {
      return this.saveTemplate(schema);
    }

    if (this.isFormMode()) {
      return this.saveForm(schema);
    }

    return new Promise(() => ({}));
  }
}

export const bizInstance: Biz = new Biz();

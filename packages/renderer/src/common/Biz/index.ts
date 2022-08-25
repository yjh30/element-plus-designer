/**
 * 解析页面查询参数
 * @returns {Object}
 */
function parsePageQuery() {
  const query: Record<string, string> = {};
  const queryStr = window.location.search.replace(/^\?/, '');
  if (queryStr === '') {
    return {};
  }

  queryStr.split('&').map(keyValStr => {
    const [key, val] = keyValStr.split('=');
    if (val) {
      query[key] = decodeURIComponent(val);
    }
  });

  return query;
}

/**
 * 业务场景模式
 */
 export enum BizMode {
  /**
   * 组件类型字段预设
   */
  Preset = '1',
  /**
   * 表单模板生成
   */
  Template = '2',
  /**
   * 表单落地页生成
   */
  Form = '3',

  /**
   * 无模式
   */
  None = '',
}

const ButtonTextMap = new Map([
  [BizMode.Preset, '保存预设字段'],
  [BizMode.Template, '保存模板'],
  [BizMode.Form, '创建表单页面'],
  [BizMode.None, ''],
]);

const TitleTextMap = new Map([
  [BizMode.Preset, '预设/编辑预设字段'],
  [BizMode.Template, '创建/编辑模板'],
  [BizMode.Form, '创建/编辑表单页面'],
  [BizMode.None, ''],
]);

export class BaseBiz {
  query: Record<string, string>;

  constructor() {
    this.query = parsePageQuery();
  }

  get mode(): BizMode {
    return this.query['mode'] as BizMode || BizMode.None;
  }

  /**
   * 业务场景id
   */
  get bizId() {
    return this.query['bizId'] || '';
  }

  /**
   * 模板id
   */
  get templateId() {
    return this.query['templateId'] || '';
  }

  /**
   * 落地页表单id
   */
  get formId() {
    return this.query['formId'] || '';
  }

  /**
   * 页面标题
   */
  get pageTitle() {
    return this.query['title'] || TitleTextMap.get(this.mode);
  }

  get buttonText() {
    return this.query['buttonText'] || ButtonTextMap.get(this.mode);
  }

  isPresetMode() {
    return this.mode === BizMode.Preset && this.bizId;
  }

  isTemplateMode() {
    return this.mode === BizMode.Template && this.bizId;
  }

  isFormMode() {
    return this.mode === BizMode.Form && this.bizId;
  }

  isNoneMode() {
    return this.mode === BizMode.None;
  }
}

export const bizInstance = new BaseBiz();

import { reactive, onBeforeMount, toRefs } from 'vue'
import { GlobalRegistry } from '@designable/core'
import {
  Input,
  Select,
  Cascader,
  Radio,
  Checkbox,
  Transfer,
  Password,
  DatePicker,
  TimePicker,
  Upload,
  Switch,
  Text,
  Card,
  ArrayCards,
  ObjectContainer,
  ArrayTable,
  Space,
  FormTab,
  FormCollapse,
  FormLayout,
  FormGrid,
  InputNumber,
  TreeSelect,
  Slider,
  Rate,
} from '@formily/element-plus-renderer'

import { getSources } from '../service/sources'
import { bizInstance } from '../service/biz'

interface IState {
  sources: Record<string, any[]>,
  sourceGroupKeys: string[]
}

export function useSources() {
  const state: IState = reactive({
    sources: {},
    sourceGroupKeys: [],
  });

  // 产品预设模式
  if (bizInstance.isPresetMode()) {
    state.sources = {
      Inputs: [
        Input,
        Password,
        InputNumber,
        Rate,
        Slider,
        Select,
        TreeSelect,
        Cascader,
        Transfer,
        Checkbox,
        Radio,
        DatePicker,
        TimePicker,
        Upload,
        Switch,
        ObjectContainer,
      ],
      Arrays: [ArrayCards, ArrayTable],
      Displays: [Text],
      Layouts: [Card, Space, FormGrid, FormLayout, FormTab, FormCollapse],
    };
    state.sourceGroupKeys = Object.keys(state.sources);

    GlobalRegistry.registerDesignerLocales({
      'zh-CN': {
        sources: {
          Inputs: '输入控件',
          Layouts: '布局组件',
          Arrays: '自增组件',
          Displays: '展示组件',
        },
      },
      'en-US': {
        sources: {
          Inputs: 'Inputs',
          Layouts: 'Layouts',
          Arrays: 'Arrays',
          Displays: 'Displays',
        },
      },
    });

    return state;
  }

  const callback = (sourcesLocales) => {
    GlobalRegistry.registerDesignerLocales({
      'zh-CN': {
        sources: sourcesLocales
      },
      'en-US': {
        sources: sourcesLocales,
      },
    })
  }

  // 表单模板生成 || 表单落地页生成 模式
  if (bizInstance.isTemplateMode() || bizInstance.isFormMode()) {
    onBeforeMount(() => {
      bizInstance.getPreset()
        .then(({ code, data }: any) => {
          if (code === 200) {
            state.sources = getSources(data.schema, callback);
            state.sourceGroupKeys = Object.keys(state.sources);
          }
        })
    });
  } else {
    window.alert('页面参数错误');
    history.back();
  }

  return toRefs(state);
}

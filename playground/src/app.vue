<template>
  <Designer :engine="engine">
    <Workbench>
      <StudioPanel>
        <template #title>
          <title-widget></title-widget>
        </template>
        <template #actions>
          <actions-widget />
        </template>
        <CompositePanel>
          <CompositePanelItem title="panels.Component" icon="Component">
            <template
              v-for="key in sourceGroupKeys"
              :key="`sources.${key}`"
            >
              <ResourceWidget
                v-if="sources[key] && sources[key].length > 0"
                :title="`sources.${key}`"
                :sources="sources[key]"
              />
            </template>
          </CompositePanelItem>
          <CompositePanelItem title="panels.OutlinedTree" icon="Outline">
            <OutlineTreeWidget />
          </CompositePanelItem>
          <CompositePanelItem title="panels.History" icon="History">
            <HistoryWidget />
          </CompositePanelItem>
        </CompositePanel>
        <WorkspacePanel :style="{height:'100%'}">
          <ToolbarPanel>
            <DesignerToolsWidget />
            <ViewToolsWidget :use="['DESIGNABLE']" />
          </ToolbarPanel>
          <ViewportPanel>
            <ViewPanel type="DESIGNABLE">
              <ComponentTreeWidget :components="components"></ComponentTreeWidget>
            </ViewPanel>
          </ViewportPanel>
        </WorkspacePanel>
        <SettingsPanel title="panels.PropertySettings">
          <SettingsForm />
        </SettingsPanel>
      </StudioPanel>
    </Workbench>
  </Designer>
</template>
<script lnag="ts">
import { createDesigner } from '@designable/core'
import {
  Designer,
  Workbench,
  StudioPanel,
  CompositePanel,
  SettingsPanel,
  WorkspacePanel,
  ToolbarPanel,
  DesignerToolsWidget,
  ViewToolsWidget,
  ViewPanel,
  HistoryWidget,
  OutlineTreeWidget,
  ResourceWidget,
  ComponentTreeWidget,
  ViewportPanel,
} from '@formily/element-plus-prototypes'
import {
  Form,
  Field,
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
import { SettingsForm } from '@formily/element-plus-settings-form'
import { useSources } from './hooks/useSources'

import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Designer,
    Workbench,
    StudioPanel,
    CompositePanel,
    CompositePanelItem: CompositePanel.Item,
    SettingsPanel,
    WorkspacePanel,
    ToolbarPanel,
    DesignerToolsWidget,
    ViewToolsWidget,
    ViewPanel,
    HistoryWidget,
    OutlineTreeWidget,
    ResourceWidget,
    ComponentTreeWidget,
    ViewportPanel,
    SettingsForm,
  },
  setup() {
    const { sources, sourceGroupKeys } = useSources();
    const engine = createDesigner({
      shortcuts: [],
      rootComponentName: 'Form',
    });

    return {
      engine,
      components: {
        Form,
        Field,
        Input,
        Card,
        InputNumber,
        Select,
        Cascader,
        Transfer,
        Checkbox,
        Radio,
        DatePicker,
        TimePicker,
        Upload,
        Switch,
        ObjectContainer,
        Space,
        Text,
        ArrayCards,
        ArrayTable,
        FormGrid,
        FormLayout,
        FormTab,
        FormCollapse,
        TreeSelect,
        Slider,
        Password,
        Rate,
      },
      sources,
      sourceGroupKeys,
    }
  },
})
</script>

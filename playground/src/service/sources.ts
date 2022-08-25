import { createResource, IResource, IResourceCreator } from '@designable/core';
import { ISchema } from '@formily/json-schema';
import * as renderers from '@formily/element-plus-renderer';

type ISources = Record<string, any[][]>;
type ISourcesLocales = Record<string, string>;

interface IGetSourcesCallback {
  (sourcesLocales: ISourcesLocales, sources: ISources): void;
}

export function getSources(schema: ISchema, callback?: IGetSourcesCallback): ISources {
  const sources: ISources = {};
  const sourcesLocales: ISourcesLocales = {};
  const properties: ISchema['properties'] = schema.properties;

  const propertyKeys: string[] = Object.keys(properties).sort((keyA, keyB) => {
    const aIndex: number = properties[keyA]['x-index'];
    const bIndex: number = properties[keyB]['x-index'];

    if (aIndex < bIndex) {
      return -1;
    }
    if (aIndex < bIndex) {
      return 1;
    }
    return 0;
  });

  propertyKeys.forEach(property => {
    const fieldProps: ISchema = JSON.parse(JSON.stringify(properties[property]));

    const resourceGroupName = fieldProps['x-resource-group-name']?.replace(/^(\w)/, (_match, p1) => p1.toUpperCase());
    const resourceGroupTitle = fieldProps['x-resource-group-title'];

    if (typeof sources[resourceGroupName] === 'undefined') {
      sources[resourceGroupName] = [[]];
      sourcesLocales[resourceGroupName] = resourceGroupTitle;
    }
    sources[resourceGroupName][0].push(
      getSingleSource(fieldProps)
    );
  });

  if (typeof callback === 'function') {
    callback(sourcesLocales, sources);
  }

  return sources;
}

export function getSingleSource(treeNodeProps: ISchema): IResource {
  const fieldProps = treeNodeProps;
  const fieldTitle = fieldProps['title'];
  const proxyComponentName = fieldProps['x-component'];
  const proxyComponentIcon = fieldProps['x-resource-component-icon'];

  // for Input.TextArea, Checkbox.Group
  const rendererComponentName = proxyComponentName.replace(/\.\w+$/, '');

  const resourceRaw = renderers[rendererComponentName].Resource;
  const resourceCreator: IResourceCreator = resourceRaw.find(item => item.elements[0].props['x-component'] === proxyComponentName);

  [
    'x-index',
    'x-designable-id',
    'x-resource-component-icon',
    'x-resource-group-name',
    'x-resource-group-title'
  ]
    .forEach(key => delete fieldProps[key]);

  const singleSources = createResource({
    icon: proxyComponentIcon || resourceCreator['icon'],
    title: fieldTitle,
    elements: [{
      componentName: resourceCreator.elements[0].componentName,
      props: {
        ...fieldProps,
      },
    }],
  })[0];

  return singleSources;
}

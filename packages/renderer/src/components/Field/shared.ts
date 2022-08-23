import { ISchema } from '@formily/json-schema'
import {
    ReactionsSetter,
    DataSourceSetter,
    ValidatorSetter,
} from '@formily/element-plus-setters'
import { AllSchemas } from '../../schemas'
import { bizInstance } from '../../common/Biz'
// TODO::setter没做
export const createComponentSchema = (component: ISchema, decorator: ISchema) => {
    return {
        'component-group': component && {
            type: 'void',
            'x-component': 'CollapseItem',
            'x-reactions': {
                fulfill: {
                    state: {
                        visible: '{{!!$form.values["x-component"]}}'
                    }
                }
            },
            properties: {
                'x-component-props': component
            }
        },
        'decorator-group': decorator && {
            type: 'void',
            'x-component': 'CollapseItem',
            'x-component-props': { defaultExpand: false },
            'x-reactions': {
                fulfill: {
                    state: {
                        visible: '{{!!$form.values["x-decorator"]}}'
                    }
                }
            },
            properties: {
                'x-decorator-props': decorator
            }
        },
        // 'component-style-group': {
        //     type: 'void',
        //     'x-component': 'CollapseItem',
        //     'x-component-props': { defaultExpand: false },
        //     'x-reactions': {
        //         fulfill: {
        //             state: {
        //                 visible: '{{!!$form.values["x-component"]}}'
        //             }
        //         }
        //     },
        //     properties: {
        //         'x-component-props.style': AllSchemas.CSSStyle
        //     }
        // },
        // 'decorator-style-group': {
        //     type: 'void',
        //     'x-component': 'CollapseItem',
        //     'x-component-props': { defaultExpand: false },
        //     'x-reactions': {
        //         fulfill: {
        //             state: {
        //                 visible: '{{!!$form.values["x-decorator"]}}'
        //             }
        //         }
        //     },
        //     properties: {
        //         'x-decorator-props.style': AllSchemas.CSSStyle
        //     }
        // }
    }
}

export const createFieldSchema = (component?: ISchema, decorator: ISchema = AllSchemas.FormItem): ISchema => {
    return {
        type: 'object',
        properties: {
            'source-group': {
                type: 'void',
                'x-display': bizInstance.isPresetMode() ? 'visible' : 'none',
                'x-component': 'CollapseItem',
                properties: {
                    'x-resource-group-name': {
                        type: 'string',
                        required: true,
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': {}
                    },
                    'x-resource-group-title': {
                        type: 'string',
                        required: true,
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': {}
                    }
                }
            },
            'field-group': {
                type: 'void',
                'x-component': 'CollapseItem',
                properties: {
                    name: {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': {
                            clearable: true
                        }
                    },
                    title: {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': {
                            clearable: true
                        }
                    },
                    description: {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input.TextArea',
                        'x-component-props': {
                            rows: 1
                        }
                    },
                    'x-resource-component-icon': {
                        type: 'string',
                        format: 'url',
                        'x-display': bizInstance.isPresetMode() ? 'visible' : 'none',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                    },
                    'x-display': {
                        default: 'visible',
                        type: 'string',
                        enum: ['visible', 'hidden', 'none', ''],
                        'x-decorator': 'FormItem',
                        'x-component': 'Select',
                        'x-component-props': {}
                    },
                    'x-pattern': {
                        default: 'editable',
                        type: 'string',
                        enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
                        'x-decorator': 'FormItem',
                        'x-component': 'Select',
                        'x-component-props': {}
                    },
                    default: {
                        'x-decorator': 'FormItem',
                        'x-component': 'ValueInput'
                    },
                    enum: {
                        'x-decorator': 'FormItem',
                        'x-component': DataSourceSetter,
                    },
                    'x-reactions': {
                        'x-decorator': 'FormItem',
                        'x-component': ReactionsSetter,
                    },
                    'x-validator': {
                        type: 'array',
                        'x-component': ValidatorSetter
                    },
                    required: {
                        type: 'boolean',
                        'x-decorator': 'FormItem',
                        'x-component': 'Switch'
                    }
                }
            },
            ...createComponentSchema(component, decorator)
        }
    }
}

export const createVoidFieldSchema = (component?: ISchema, decorator: ISchema = AllSchemas.FormItem) => {
    return {
        type: 'object',
        properties: {
            'field-group': {
                type: 'void',
                'x-component': 'CollapseItem',
                properties: {
                    name: {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': {
                            clearable: true
                        }
                    },
                    title: {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input',
                        'x-component-props': {
                            clearable: true
                        },
                        'x-reactions': {
                            fulfill: {
                                state: {
                                    hidden: '{{$form.values["x-decorator"] !== "FormItem"}}'
                                }
                            }
                        }
                    },
                    description: {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'Input.TextArea',
                        'x-reactions': {
                            fulfill: {
                                state: {
                                    hidden: '{{$form.values["x-decorator"] !== "FormItem"}}'
                                }
                            }
                        }
                    },
                    'x-display': {
                        default: 'visible',
                        type: 'string',
                        enum: ['visible', 'hidden', 'none', ''],
                        'x-decorator': 'FormItem',
                        'x-component': 'Select',
                        'x-component-props': {
                            clearable: true
                        }
                    },
                    'x-pattern': {
                        default: 'editable',
                        type: 'string',
                        enum: ['editable', 'disabled', 'readOnly', 'readPretty', ''],
                        'x-decorator': 'FormItem',
                        'x-component': 'Select',
                        'x-component-props': {
                            clearable: true
                        }
                    },
                    'x-reactions': {
                        'x-display': 'hidden',
                        'x-decorator': 'FormItem',
                        'x-component': 'ReactionsSetter'
                    },
                    'x-decorator': {
                        type: 'string',
                        'x-decorator': 'FormItem',
                        'x-component': 'FormItemSwitcher'
                    }
                }
            },
            ...createComponentSchema(component, decorator)
        }
    }
}

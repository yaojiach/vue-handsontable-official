import Handsontable from 'handsontable';
import Vue, { VNode } from 'vue';
import { ThisTypedComponentOptionsWithRecordProps } from 'vue/types/options';
import { HotTableData, HotTableMethods, HotTableProps } from './types';

export interface HotTableData {
  __internalEdit: boolean,
  hotInstance?: Handsontable,
  columnSettings: HotTableProps[]
}

export interface HotTableMethods {
  hotInit: () => void,
  getColumnSettings: () => HotTableProps[] | void,
  getGlobalRendererVNode: () => VNode | void,
  getGlobalEditorVNode: () => VNode | void,
  getRendererWrapper: (vNode: VNode, containerComponent: Vue) => (...args) => HTMLElement,
  getEditorClass: (vNode: VNode, containerComponent: Vue) => typeof Handsontable.editors.BaseEditor
}

export interface HotTableProps extends Handsontable.GridSettings {
  id?: string,
  settings?: Handsontable.DefaultSettings,
  wrapperRendererCacheSize?: number
}

export interface HotTableComponent<V extends Vue, D, M, C, P> extends ThisTypedComponentOptionsWithRecordProps<V, D, M, C, P> {
  version: string
}

export interface HotColumnMethods {
  createColumnSettings: () => void
}

export interface EditorComponent extends Vue {
  focus(): void;
  open(event?: Event): void;
  close(): void;
  getValue(): any;
  setValue(newValue?: any): void;
  [additional: string]: any;
}

export type VueProps<T> = { [P in keyof T]: any };

type ClassMethodKey<T> = ({ [P in keyof T]: T[P] extends Function ? P : never })[keyof T];
type NonConstructorClassMethodKey<T> = Exclude<ClassMethodKey<T>, 'constructor'>;
// trim out the `originalValue` prop, as it's set to `any`
type NotOriginalValueProp<T> = Exclude<NonConstructorClassMethodKey<T>, 'originalValue'>;
type ClassFieldKey<T> = ({[P in keyof T]: T[P] extends Function ? never : P })[keyof T];
type ClassMethods<T> = Pick<T, NotOriginalValueProp<T>>;
type ClassFields<T> = Pick<T, ClassFieldKey<T>>;

export interface BaseVueEditorMethods extends ClassMethods<Handsontable._editors.Base> {
}

export interface BaseVueEditorFields extends ClassFields<Handsontable._editors.Base> {
}

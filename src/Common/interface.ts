import { TextareaProps, TextInputProps, TextProps } from '@mantine/core';
import React, { ChangeEvent, FocusEvent } from 'react';


export type ApiResponse<T = any> = {
  data: T;
  status: number;
  message: string;
  success: boolean;
};


export type CustomDropdownProps = {
  label?: string;
  placeholder?: string;
  data: (string | { value: string; label: string })[];
  value?: string | null;
  onChange?: (value: string | null) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  withAsterisk?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  multiple?: boolean;
  withCheckIcon?: boolean;
  className?: string;
};

export type CustomTextareaProps = Omit<
  TextareaProps,
  'error' | 'onChange' | 'onBlur'
> & {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  error?: string | boolean;
  disabled?: boolean;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  autoComplete?: string;
  name?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  radius?: string;
  variant?: 'default' | 'filled' | 'unstyled';
  withAsterisk?: boolean | false;
  rows?: number;
  autosize?: boolean;
  minRows?: number;
  maxRows?: number;
};

export type CustomTextProps = TextProps & {
  fontSize: number;
  fontWeight: number;
  color: string;
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  lineClamp?: number;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
};

export type CustomTextInputProps = Omit<
  TextInputProps,
  'error' | 'onChange' | 'onBlur'
> & {
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  error?: string | boolean;
  disabled?: boolean;
  required?: boolean;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  leftSection?: React.ReactElement;
  rightSection?: React.ReactElement;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  autoComplete?: string;
  name?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
  radius?: string;
  variant?: 'default' | 'filled' | 'unstyled';
  withAsterisk?: boolean | false;
};

export type ButtonComponentProps = {
title: string; 
  onClick?: () => void;
  variant?: 'filled' | 'outline'  | 'gradient';
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  size?: number;
  fullWidth?: boolean;
  radius?: number;
  color: string;
  backgroundColor?: string;
  borderColor: string;
  from?:string;
  to?:string;
  deg?:number;
};

export type CustomDatePickerProps = {
  label?: string;
  placeholder?: string;
  value: Date | [Date | null, Date | null] | null; 
  onChange: (date: Date | [Date | null, Date | null] | null) => void;
  // value?: Date | null; // Ensure this is Date or null
  // onChange?: (value: Date | null) => void; 
  error?: string;
  disabled?: boolean;
  // required?: boolean;
  // name?: string;
  // id?: string;
  className?: string;
  // style?: React.CSSProperties;
  radius?: string;
  variant?: 'default' | 'filled' | 'unstyled';
  withAsterisk?: boolean | false;
  minDate?: Date;
  maxDate?: Date;
  // clearable?: boolean;
  // autoComplete?: string;
  type?: 'default' | 'range';
  defaultDate?: boolean;
  onShortcutSelect?: (start: Date | null, end: Date | null) => void;
  dateFormat?: 'DD-MM-YYYY' | 'YYYY-MM-DD';
  customButtons?: boolean;
  inputMode?: 'picker' | 'manual' | 'both';
};

export type customFileinputProps = {
  label?: string;
  placeholder?: string;
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string | boolean;
  disabled?: boolean;
  leftSection?: React.ReactNode;
  rightSection?: React.ReactNode;
  withAsterisk?: boolean | false;
  accept?: string;
  className?: string;
};


export type TableColumn = {
  key: string;
  label: string | JSX.Element;
  render?: (
    value: any,
    index: number,
    row: Record<string, any>,
  ) => React.ReactNode;
  searchKey?: string;
  sortable?: boolean;
  type?: string;
};

export type TableProps = {
  data: Record<string, any>[];
  columns: TableColumn[];
  height?: number;
  caption?: boolean | false;
  onSelectRow?: (row: Record<string, any>) => void;
  onCurrentPageData?: (data: Record<string, any>[]) => void;
  onSearch?: (columnKey: string, value: string) => void;
  showSearch?: boolean;
};


export const SAVE_API_RESPONSE = 'SAVE_API_RESPONSE';
export const CLEAR_API_RESPONSE = 'CLEAR_API_RESPONSE';
export const CLEAR_ALL_RESPONSES = 'CLEAR_ALL_RESPONSES';

export type SaveApiResponseAction = {
  type: typeof SAVE_API_RESPONSE;
  payload: { key: string; data: string | object };
};

export type ClearApiResponseAction = {
  type: typeof CLEAR_API_RESPONSE;
  payload: string;
};

export type ClearAllResponsesAction = {
  type: typeof CLEAR_ALL_RESPONSES;
};

export type ApiActionTypes =
  | SaveApiResponseAction
  | ClearApiResponseAction
  | ClearAllResponsesAction;

  export type BurgerProps = {
  opened: boolean;
  onClick: () => void;
  color: string;
  label?: string; 
  textColor: string;
}

export type DynamicModalProps = {
  opened: boolean;
  onClose: () => void;
  title?: string;
  content: string | React.ReactNode;
  ButtonTitle?: string;
  onClick?: () => void;
  loading?: boolean; 
}
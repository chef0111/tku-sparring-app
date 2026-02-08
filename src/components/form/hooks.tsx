import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { FormInput, FormNumberInput, FormPasswordInput } from './form-input';
import { FormTextarea } from './form-textarea';
import { FormSelect } from './form-select';
import { FormCheckbox } from './form-checkbox';
import { FormCombobox } from './form-combobox';

const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: FormInput,
    Textarea: FormTextarea,
    Select: FormSelect,
    Checkbox: FormCheckbox,
    PasswordInput: FormPasswordInput,
    NumberInput: FormNumberInput,
    Combobox: FormCombobox,
  },
  formComponents: {},
  fieldContext,
  formContext,
});

export { useAppForm, useFieldContext, useFormContext };

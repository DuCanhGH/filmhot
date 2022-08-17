import {
  CSSProperties,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  TextareaHTMLAttributes,
} from "react";
import { UseFormRegister, Path, FieldError, DeepMap, RegisterOptions } from "react-hook-form";
import { get } from "lodash-es";

interface ReactHookInputProps<TFormValues extends Record<string, unknown>>
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  type?: string;
  loading?: boolean;
  placeholder?: string;
  label?: string;
  style?: CSSProperties;
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
  className?: string;
  errors?: DeepMap<TFormValues, FieldError>;
  rules?: RegisterOptions;
  errorClassName?: string;
  /** Avoid using this boolean. */
  disableErrorMessage?: boolean;
}

//You can use this input with react-hook-form
export const RHFInput = <TFormValues extends Record<string, unknown>>(
  props: ReactHookInputProps<TFormValues>,
): ReactElement => {
  const {
    name,
    style,
    register,
    type,
    loading,
    id,
    label,
    errors,
    rules,
    className,
    disableErrorMessage,
    errorClassName,
    ...other
  } = props;
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);
  return (
    <>
      {label && (
        <label htmlFor={id}>
          <p>{label}</p>
        </label>
      )}
      <input
        aria-describedby={`${id}-errortext`}
        aria-invalid={hasError ? "true" : "false"}
        disabled={loading}
        className={`${className}`}
        style={style}
        type={type ?? "text"}
        id={id}
        {...register(name, rules)}
        {...other}
      />
      {hasError && !disableErrorMessage && (
        <p role="alert" id={`${id}-errortext`} className={`${errorClassName} text-red-500 block`}>
          {errorMessages.message}
        </p>
      )}
    </>
  );
};

interface RHFTextAreaProps<TFormValues extends Record<string, unknown>> {
  textareaProps?: Partial<
    DetailedHTMLProps<
      TextareaHTMLAttributes<HTMLTextAreaElement> & Record<string, any>,
      HTMLTextAreaElement
    >
  >;
  id: string;
  resizeable?: boolean;
  loading?: boolean;
  register: UseFormRegister<TFormValues>;
  name: Path<TFormValues>;
  className?: string;
  errors?: DeepMap<TFormValues, FieldError>;
  rules?: RegisterOptions;
  label?: string;
  style?: CSSProperties;
  errorClassName?: string;
  /** Avoid using this boolean. */
  disableErrorMessage?: boolean;
}

//You can use this input with react-hook-form
export const RHFTextArea = <TFormValues extends Record<string, unknown>>(
  props: RHFTextAreaProps<TFormValues>,
): ReactElement => {
  const {
    name,
    register,
    style,
    loading,
    id,
    label,
    errors,
    rules,
    className,
    disableErrorMessage,
    errorClassName,
    textareaProps,
    ...other
  } = props;
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);
  return (
    <>
      {label && (
        <label htmlFor={id}>
          <p>{label}</p>
        </label>
      )}
      <textarea
        aria-describedby={`${id}-errortext`}
        aria-invalid={hasError ? "true" : "false"}
        disabled={loading}
        className={`${className}`}
        style={Object.assign({ margin: "unset" }, style)}
        id={id}
        {...textareaProps}
        {...register(name, rules)}
        {...other}
      />
      {hasError && !disableErrorMessage && (
        <p role="alert" id={`${id}-errortext`} className={`${errorClassName} text-red-500 block`}>
          {errorMessages.message}
        </p>
      )}
    </>
  );
};

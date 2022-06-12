import { DetailedHTMLProps, InputHTMLAttributes, ReactElement } from "react";
import { UseFormRegister, Path, FieldError, DeepMap, RegisterOptions } from "react-hook-form";
import { get } from "lodash-es";

interface ReactHookInputProps<TFormValues extends Record<string, unknown>>
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  id: string;
  type?: string;
  loading?: boolean;
  placeholder?: string;
  label?: string;
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

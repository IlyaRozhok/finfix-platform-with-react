import { forwardRef } from "react";
import { Check } from "lucide-react";

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      error,
      helperText,
      required = false,
      className = "",
      id,
      ...props
    },
    ref
  ) => {
    const checkboxId =
      id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        <div className="flex items-start space-x-3">
          <div className="relative flex items-center">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              className={`
                h-4 w-4 rounded border-2 text-blue-600 focus:ring-blue-500 focus:ring-2
                ${
                  error
                    ? "border-red-300 focus:ring-red-500"
                    : "border-gray-300"
                }
                ${
                  props.disabled
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
                ${className}
              `}
              {...props}
            />
            {props.checked && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Check className="h-3 w-3 text-white" />
              </div>
            )}
          </div>

          {label && (
            <div className="flex-1">
              <label
                htmlFor={checkboxId}
                className={`
                  text-sm font-medium cursor-pointer
                  ${error ? "text-red-700" : "text-gray-700"}
                  ${props.disabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
              >
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;

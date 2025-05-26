import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, fullWidth = true, icon, className = '', ...props }, ref) => {
    const inputWrapperClasses = `relative ${fullWidth ? 'w-full' : ''}`;
    const inputClasses = `
      input-field
      ${error ? 'border-error-500 focus:ring-error-500' : ''}
      ${icon ? 'pl-10' : ''}
      ${className}
    `;

    return (
      <div className={inputWrapperClasses}>
        {label && (
          <label htmlFor={props.id} className="input-label">
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary dark:text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={inputClasses}
            {...props}
          />
        </div>
        {error && (
          <p className="mt-1 text-small text-error-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="mt-1 text-small text-text-secondary dark:text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
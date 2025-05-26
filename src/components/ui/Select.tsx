import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  onChange?: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ 
    label, 
    options, 
    error, 
    helperText, 
    fullWidth = true, 
    className = '', 
    onChange,
    ...props 
  }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      if (onChange) {
        onChange(e.target.value);
      }
    };

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label htmlFor={props.id} className="input-label">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            className={`
              input-field appearance-none pr-10
              ${error ? 'border-error-500 focus:ring-error-500' : ''}
              ${className}
            `}
            onChange={handleChange}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-text-secondary dark:text-gray-400">
            <ChevronDown size={18} />
          </div>
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

Select.displayName = 'Select';

export default Select;
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  actions
}) => {
  return (
    <div className="container mx-auto px-4 py-6">
      {(title || actions) && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div className="mb-4 sm:mb-0">
            {title && <h1 className="text-title font-bold">{title}</h1>}
            {subtitle && <p className="text-text-secondary dark:text-gray-400">{subtitle}</p>}
          </div>
          {actions && <div>{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default PageContainer;
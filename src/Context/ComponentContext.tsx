import { ComponentContextType, ComponentItem } from '@/Common/interface';
import { createContext, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

const ComponentContext = createContext<ComponentContextType | null>(null);

export const ComponentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [activePortal, setActivePortal] = useState<string | null>(null);

  return (
    <ComponentContext.Provider
      value={{
        components,
        setComponents,
        activePortal,
        setActivePortal,
      }}
    >
      {children}
    </ComponentContext.Provider>
  );
};

export const useComponent = () => {
  const { t } = useTranslation();
  const context = useContext(ComponentContext);
  if (!context) {
    throw new Error(t('GlobalSearch.useComponentError'));
  }
  return context;
};

import TextComponent from '../Atoms/TextComponent';
import TextInputComponent from '../Atoms/TextInputComponent';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import { useComponent } from '@/Context/ComponentContext';
import { GlobalSearchProps } from '@/Common/interface';
import React, { useMemo, useState } from 'react';

const GlobalSearch: React.FC<GlobalSearchProps> = ({ dataOnclick, header }) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const { components } = useComponent();

  const [search, setSearch] = useState('');
  const filteredCommands = useMemo(() => {
    return components.filter(
      c =>
        c.label.toLowerCase().includes(search.toLowerCase()) ||
        c.sub.toLowerCase().includes(search.toLowerCase()),
    );
  }, [components, search]);

  const shouldShowResults = header ? search.length > 0 : true;

  return (
    <div>
      {header ? (
        <TextInputComponent
          placeholder="Search components..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          leftSection={
            <TextComponent
              fontSize={10}
              fontWeight={400}
              color={colors.textColor}
            >
              Ctrl + K
            </TextComponent>
          }
          variant="default"
          borderColor={colors.borderColor}
          backgroundColor={colors.primaryColor}
          color={colors.primaryColor}
        />
      ) : (
        <input
          autoFocus
          placeholder="Search DevDesign components..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full border-b border-borderColor bg-transparent p-4 outline-none"
        />
      )}

      {shouldShowResults && (
        <div
          className={`${header ? 'absolute left-0 top-[110%] w-full rounded-xl border border-borderColor bg-background shadow-xl' : 'max-h-[320px] overflow-y-auto'}`}
        >
          {filteredCommands.map(item => (
            <div
              key={item.id}
              onClick={() => {
                dataOnclick(item);
                setSearch('');
              }}
              className="flex cursor-pointer gap-3 p-3 hover:bg-background"
            >
              <div className="text-primaryColor">{item.icon}</div>

              <div>
                <TextComponent
                  fontSize={14}
                  fontWeight={700}
                  color={colors.textColor}
                >
                  {item.label}
                </TextComponent>

                <TextComponent
                  fontSize={11}
                  fontWeight={400}
                  color={colors.grayColor}
                >
                  {item.sub}
                </TextComponent>
              </div>
            </div>
          ))}
          {filteredCommands.length === 0 && (
            <div className="p-4 text-sm opacity-60">No components found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;

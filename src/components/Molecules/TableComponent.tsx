import { Table, Pagination } from '@mantine/core';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../themes/colors';
import { TableProps } from '@/Common/interface';
import TextComponent from '../Atoms/TextComponent';
import TextInputComponent from '../Atoms/TextInputComponent';
import DropdownComponent from '../Atoms/DropdownComponent';
import CustomDateComponent from '../Atoms/CustomDateComponent';

const TableComponent: React.FC<TableProps> = ({
  data,
  columns,
  height,
  caption,
  onCurrentPageData,
  onSearch,
  showSearch = false,
}) => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending' | null;
  }>({ key: '', direction: null });

  const startIndex = (currentPage - 1) * itemsPerPage;

  const handleSearch = (columnKey: string, value: string) => {
    setSearchValues(prev => ({ ...prev, [columnKey]: value }));
    onSearch?.(columnKey, value);
  };

  const handleSort = (key: string) => {
    setSortConfig({
      key,
      direction:
        sortConfig.key === key
          ? sortConfig.direction === 'ascending'
            ? 'descending'
            : 'ascending'
          : 'ascending',
    });
  };

  const filteredAndSortedData = useMemo(() => {
    const processedData = [...data].filter(row => {
      return Object.entries(searchValues).every(([columnKey, filterValue]) => {
        if (!filterValue) return true;

        const cellValue = row[columnKey];
        if (cellValue === undefined || cellValue === null) return false;
        if (columns.find(c => c.key === columnKey)?.type === 'date') {
          const rowDate = new Date(cellValue).toDateString();
          const filterDate = new Date(filterValue).toDateString();
          return rowDate === filterDate;
        }

        return cellValue
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    });

    if (!sortConfig.key || sortConfig.direction === null) return processedData;

    return processedData.sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'ascending'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return sortConfig.direction === 'ascending'
        ? aValue > bValue
          ? 1
          : -1
        : aValue < bValue
          ? 1
          : -1;
    });
  }, [data, sortConfig, searchValues, columns]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredAndSortedData.length]);

  const paginatedData = useMemo(() => {
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, startIndex, itemsPerPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  useEffect(() => {
    onCurrentPageData?.(paginatedData);
  }, [paginatedData, onCurrentPageData]);

  return (
    <div className="w-full">
      <Table.ScrollContainer minWidth={height || 800}>
        <Table
          highlightOnHover
          verticalSpacing="md"
          horizontalSpacing="lg"
          className="overflow-hidden rounded-2xl border border-solid border-borderColor bg-transparent"
        >
          {caption && (
            <Table.Caption>
              <TextComponent
                fontWeight={800}
                color={colors.textSecondary}
                fontSize={12}
              >
                {t('table.viewAll')}
              </TextComponent>
            </Table.Caption>
          )}

          <Table.Thead
            style={{
              backgroundColor:
                currentTheme === 'light' ? colors.appBg : colors.borderColor,
            }}
          >
            <Table.Tr>
              {columns.map(column => (
                <Table.Th
                  key={column.key}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={`border-b-solid border-b border-b-borderColor ${column.sortable ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="flex items-center gap-2">
                    <TextComponent
                      color={colors.primaryColor}
                      fontSize={11}
                      fontWeight={800}
                      className="uppercase tracking-wider"
                    >
                      {column.label}
                    </TextComponent>
                    {column.sortable && (
                      <span className="text-[10px] text-inActive">
                        {sortConfig.key === column.key
                          ? sortConfig.direction === 'ascending'
                            ? '▲'
                            : '▼'
                          : '↕'}
                      </span>
                    )}
                  </div>
                </Table.Th>
              ))}
            </Table.Tr>

            {showSearch && (
              <Table.Tr style={{ backgroundColor: colors.background }}>
                {columns.map(column => (
                  <Table.Th key={`search-${column.key}`} p="xs">
                    {column.type === 'date' ? (
                      <CustomDateComponent
                        placeholder={t('select')}
                        value={
                          searchValues[column.key]
                            ? new Date(searchValues[column.key])
                            : null
                        }
                        onChange={(
                          date: Date | [Date | null, Date | null] | null,
                        ) => {
                          if (date instanceof Date) {
                            handleSearch(column.key, date.toISOString());
                          } else if (Array.isArray(date)) {
                            handleSearch(
                              column.key,
                              date[0]?.toISOString() || '',
                            );
                          } else {
                            handleSearch(column.key, '');
                          }
                        }}
                        type="default"
                        color={colors.primaryColor}
                        backgroundColor={colors.background}
                        borderColor={colors.borderColor}
                      />
                    ) : (
                      <TextInputComponent
                        value={searchValues[column.key] || ''}
                        onChange={(e: any) =>
                          handleSearch(column.key, e.target.value)
                        }
                        placeholder={`${t('Filter')}...`}
                        color={colors.primaryColor}
                        backgroundColor={colors.background}
                        borderColor={colors.borderColor}
                        labelColor={colors.primaryColor}
                      />
                    )}
                  </Table.Th>
                ))}
              </Table.Tr>
            )}
          </Table.Thead>

          <Table.Tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <Table.Tr
                  key={index}
                  style={{
                    borderBottom: `1px solid ${colors.borderColor}`,
                    backgroundColor:
                      index % 2 === 0 ? 'transparent' : colors.card,
                  }}
                >
                  {columns.map(column => (
                    <Table.Td key={column.key}>
                      {column.render ? (
                        column.render(item[column.key], index, item)
                      ) : (
                        <TextComponent
                          color={colors.textColor}
                          fontWeight={400}
                          fontSize={14}
                        >
                          {item[column.key] ?? '-'}
                        </TextComponent>
                      )}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))
            ) : (
              <Table.Tr>
                <Table.Td colSpan={columns.length} className="p-10 text-center">
                  <TextComponent
                    color={colors.textSecondary}
                    fontWeight={400}
                    fontSize={14}
                  >
                    {t('table.noDataAvailable')}
                  </TextComponent>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>

      <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-4">
          <DropdownComponent
            data={[
              { value: '5', label: '5' },
              { value: '10', label: '10' },
              { value: '20', label: '20' },
            ]}
            value={itemsPerPage.toString()}
            onChange={(val: string | null) => {
              if (val) {
                setItemsPerPage(Number(val));
                setCurrentPage(1);
              }
            }}
            className="w-36"
            variant="default"
            color={colors.primaryColor}
            backgroundColor={colors.background}
            borderColor={colors.borderColor}
            labelColor={colors.primaryColor}
          />
          <TextComponent
            color={colors.textSecondary}
            fontWeight={400}
            fontSize={13}
          >
            {`${t('table.displaying')} ${startIndex + 1} - ${Math.min(startIndex + itemsPerPage, filteredAndSortedData.length)} ${t('table.of')} ${filteredAndSortedData.length}`}{' '}
          </TextComponent>
        </div>

        {filteredAndSortedData.length > itemsPerPage && (
          <Pagination
            value={currentPage}
            onChange={setCurrentPage}
            total={totalPages}
            color={colors.primaryColor}
            radius="md"
            withEdges
            classNames={{
              control: 'bg-background border-borderColor text-textColor',
            }}
          />
        )}
      </div>
    </div>
  );
};

export default TableComponent;

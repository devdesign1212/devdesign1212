import { Table, Pagination } from '@mantine/core';
import React, { useEffect, useMemo, useState } from 'react';
import TextComponent from '../Atoms/TextComponent';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '../../themes/colors';
import { TableProps } from '@/Common/interface';
import TextInputComponent from '../Atoms/TextInputComponent';
import DropdownComponent from '../Atoms/DropdownComponent';
import CustomDateComponent from '../Atoms/CustomDateComponent';

const TableComponent: React.FC<TableProps> = ({
  data,
  columns,
  height,
  caption,
  // onSelectRow,
  onCurrentPageData,
  onSearch,
  showSearch = false,
}) => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const [searchValues, setSearchValues] = useState<Record<string, string>>({});

  const handleSearch = (columnKey: string, value: string) => {
    setSearchValues(prev => ({ ...prev, [columnKey]: value }));
    onSearch?.(columnKey, value);
  };

  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending' | null;
  }>({ key: '', direction: null });

  // const handleRowClick = (row: any) => {
  //   onSelectRow?.(row);
  // };

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

  const sortedData = useMemo(() => {
    if (!sortConfig.key || sortConfig.direction === null) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'ascending'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'ascending'
          ? aValue - bValue
          : bValue - aValue;
      }

      return 0;
    });
  }, [data, sortConfig.key, sortConfig.direction]);

  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);
  const [prevDataLength, setPrevDataLength] = useState(data.length);

  useEffect(() => {
    if (data.length !== prevDataLength) {
      setCurrentPage(1);
      setPrevDataLength(data.length);
    }
  }, [data, prevDataLength]);

  useEffect(() => {
    onCurrentPageData?.(paginatedData);
  }, [paginatedData, onCurrentPageData]);

  const rows = paginatedData.map((item, index) => {
    if (!item) return null;
    return (
      <Table.Tr
        key={index}
        style={{}}
        // onClick={() => handleRowClick(item)}
      >
        {columns.map(column => (
          <Table.Td key={column.key} className="items-center justify-center">
            {column.render ? (
              column.render(item[column.key], index, item)
            ) : (
              <TextComponent
                color={colors.textColor}
                fontSize={14}
                fontWeight={400}
                align="center"
                className="w-max justify-self-center "
              >
                {item[column.key] === undefined ||
                item[column.key] === null ||
                item[column.key] === ''
                  ? '-'
                  : item[column.key]}
              </TextComponent>
            )}
          </Table.Td>
        ))}
      </Table.Tr>
    );
  });

  return (
    <div className="w-full">
      <Table.ScrollContainer minWidth={height}>
        <Table
          striped
          highlightOnHover
          withRowBorders={false}
          withColumnBorders={false}
          verticalSpacing="sm"
          horizontalSpacing="md"
          captionSide="bottom"
          styles={{
            table: {
              border: `1px solid ${colors.inActive}`,
              borderRadius: '10px',
              width: '100%',
            },
          }}
        >
          {caption && (
            <Table.Caption>
              <TextComponent
                color={colors.blackColor}
                fontSize={16}
                fontWeight={500}
              >
                {t('viewAllTransactions')}
              </TextComponent>
            </Table.Caption>
          )}
          <Table.Thead>
            <Table.Tr
              style={{
                backgroundColor: colors.blackColor,
              }}
            >
              {columns.map(column => (
                <Table.Th
                  key={column.key}
                  style={{
                    backgroundColor: colors.blackColor,
                  }}
                  className={` cursor-pointer items-center justify-center  ${
                    !column.sortable ? 'cursor-default' : ''
                  }`}
                >
                  <div
                    className="flex items-center justify-center gap-2"
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <TextComponent
                      color={colors.whiteColor}
                      fontSize={16}
                      fontWeight={500}
                      className="w-max justify-self-center"
                      align="center"
                    >
                      {column.label}
                    </TextComponent>
                    {column.sortable && (
                      <span className="text-light-whiteColor">↑↓</span>
                    )}
                  </div>
                </Table.Th>
              ))}
            </Table.Tr>
            {showSearch && (
              <Table.Tr>
                {columns.map(column => (
                  <Table.Th key={column.key}>
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
                          if (date) {
                            if (Array.isArray(date)) {
                              const singleDate = date[0] || date[1];
                              if (singleDate) {
                                handleSearch(
                                  column.key,
                                  `${singleDate.getFullYear()}-${String(singleDate.getMonth() + 1).padStart(2, '0')}-${String(singleDate.getDate()).padStart(2, '0')}`,
                                );
                              }
                            } else {
                              handleSearch(
                                column.key,
                                `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`,
                              );
                            }
                          } else {
                            handleSearch(column.key, '');
                          }
                        }}
                        // className="w-36"
                        type="default"
                      />
                    ) : (
                      <TextInputComponent
                        value={searchValues[column.key] || ''}
                        onChange={e => handleSearch(column.key, e.target.value)}
                        placeholder=""
                        className="w-full font-medium"
                      />
                    )}
                  </Table.Th>
                ))}
              </Table.Tr>
            )}
          </Table.Thead>
          {sortedData.length >= 0 ? (
            <Table.Tbody>{rows}</Table.Tbody>
          ) : (
            <Table.Caption>
              <TextComponent
                color={colors.blackColor}
                fontSize={20}
                fontWeight={500}
              >
                {t('noDataAvailable')}
              </TextComponent>
            </Table.Caption>
          )}
          <Table.Caption>
            {data && data.length > 0 && (
              <div className="flex items-center justify-start gap-4">
                <DropdownComponent
                  data={[
                    { value: '5', label: '5' },
                    { value: '10', label: '10' },
                    { value: '20', label: '20' },
                    { value: '50', label: '50' },
                    { value: '100', label: '100' },
                    { value: '500', label: '500' },
                  ]}
                  value={itemsPerPage.toString()}
                  onChange={(value: string | null) => {
                    if (value) {
                      setItemsPerPage(Number(value));
                      setCurrentPage(1);
                    }
                  }}
                  className="w-20"
                />
                <TextComponent
                  color={colors.blackColor}
                  fontSize={14}
                  fontWeight={400}
                  className="w-max"
                >{`${t('displaying')} ${startIndex + 1} - ${startIndex + paginatedData.length} ${t('of')} ${data.length} ${t('records')}`}</TextComponent>
              </div>
            )}
          </Table.Caption>
          <Table.Caption>
            {data && data.length > itemsPerPage && (
              <div className="flex justify-center pb-10 pt-6">
                <Pagination
                  value={currentPage}
                  onChange={setCurrentPage}
                  total={Math.ceil(sortedData.length / itemsPerPage)}
                  autoContrast
                  color="red"
                  size="md"
                  radius="md"
                />
              </div>
            )}
          </Table.Caption>
        </Table>
      </Table.ScrollContainer>
    </div>
  );
};

export default TableComponent;

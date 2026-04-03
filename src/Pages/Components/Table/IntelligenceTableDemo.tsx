import TextComponent from '@/components/Atoms/TextComponent';
import TableComponent from '@/components/Molecules/TableComponent';
import { darkTheme, lightTheme } from '@/themes/colors';
import { Badge, Group, ActionIcon, Tooltip } from '@mantine/core';
import { Download, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const IntelligenceTableDemo = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  const columns = [
    {
      key: 'id',
      label: t('table.txHash'),
      sortable: true,
    },
    {
      key: 'timestamp',
      label: t('table.timestamp'),
      sortable: true,
      type: 'date',
      render: (value: string) => (
        <TextComponent
          fontSize={13}
          fontWeight={600}
          color={colors.textSecondary}
        >
          {new Date(value).toLocaleDateString()}{' '}
          {new Date(value).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </TextComponent>
      ),
    },
    {
      key: 'asset',
      label: t('table.asset'),
      sortable: true,
    },
    {
      key: 'status',
      label: t('table.status'),
      sortable: true,
      render: (value: string) => (
        <Badge
          color={
            value === 'Confirmed'
              ? colors.success
              : value === 'Pending'
                ? 'orange'
                : colors.error
          }
          variant="light"
          radius="sm"
        >
          {value}
        </Badge>
      ),
    },
    {
      key: 'amount',
      label: t('table.amount'),
      sortable: true,
      render: (value: string) => (
        <span
          style={{
            fontWeight: 700,
            color: colors.textColor,
          }}
        >
          {value}
        </span>
      ),
    },
    {
      key: 'actions',
      label: t('table.security'),
      sortable: false,
      render: () => (
        <Group gap="xs">
          <Tooltip label="Verify on Chain">
            <ActionIcon variant="subtle" color="gray">
              <ShieldCheck size={16} />
            </ActionIcon>
          </Tooltip>
          <ActionIcon variant="subtle" color="gray">
            <Download size={16} />
          </ActionIcon>
        </Group>
      ),
    },
  ];

  const [data] = useState([
    {
      id: '0x714244553a',
      timestamp: '2026-01-20T10:30:00Z',
      asset: 'Ethereum',
      status: 'Confirmed',
      amount: '1.42 ETH',
    },
    {
      id: '0x1224553449b',
      timestamp: '2026-01-20T11:15:00Z',
      asset: 'USDC',
      status: 'Pending',
      amount: '$2,500.00',
    },
    {
      id: '0x88444445cc',
      timestamp: '2026-01-19T09:00:00Z',
      asset: 'Bitcoin',
      status: 'Failed',
      amount: '0.005 BTC',
    },
    {
      id: '0x45445285275dd',
      timestamp: '2026-01-19T14:20:00Z',
      asset: 'Solana',
      status: 'Confirmed',
      amount: '150.0 SOL',
    },
    {
      id: '0x22234247575ee',
      timestamp: '2026-01-18T16:45:00Z',
      asset: 'Polygon',
      status: 'Confirmed',
      amount: '1,200 MATIC',
    },
    {
      id: '0x9978757ff',
      timestamp: '2026-01-18T18:10:00Z',
      asset: 'Avalanche',
      status: 'Confirmed',
      amount: '45.2 AVAX',
    },
    {
      id: '0x335755aa',
      timestamp: '2026-01-17T08:30:00Z',
      asset: 'Tether',
      status: 'Confirmed',
      amount: '$5,000.00',
    },
    {
      id: '0x554244bb',
      timestamp: '2026-01-17T12:00:00Z',
      asset: 'Cardano',
      status: 'Pending',
      amount: '850 ADA',
    },
    {
      id: '0x6644545cc',
      timestamp: '2026-01-16T21:20:00Z',
      asset: 'Chainlink',
      status: 'Confirmed',
      amount: '120 LINK',
    },
    {
      id: '0x114445dd',
      timestamp: '2026-01-16T23:50:00Z',
      asset: 'Polkadot',
      status: 'Failed',
      amount: '30 DOT',
    },
  ]);

  return (
    <div className="w-full space-y-6">
      <TableComponent
        data={data}
        columns={columns}
        height={600}
        showSearch={true}
        caption={true}
      />
    </div>
  );
};

export default IntelligenceTableDemo;

import { ConnectionStatus } from '@/Common/interface';

type Props = {
  status: ConnectionStatus;
};

const ConnectionStatusBadge = ({ status }: Props) => {
  const colorMap = {
    connected: 'text-green-600',
    connecting: 'text-yellow-600',
    error: 'text-red-600',
  };

  return (
    <div className={`p-2 text-sm ${colorMap[status]}`}>
      {status.toUpperCase()}
    </div>
  );
};

export default ConnectionStatusBadge;

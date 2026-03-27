import { ChatMessage, ConnectionStatus } from '@/Common/interface';

type Props = {
  messages: ChatMessage[];
  status: ConnectionStatus;
};

const EventLogger = ({ messages, status }: Props) => {
  return (
    <div className="h-full overflow-auto border-l p-4">
      <h3 className="mb-2 font-bold">Event Logs</h3>

      <div className="mb-2 text-xs">🔌 Status: {status}</div>

      {messages.map(msg => (
        <div key={msg.id} className="text-xs text-gray-500">
          📩 Received → {msg.text}
        </div>
      ))}
    </div>
  );
};

export default EventLogger;

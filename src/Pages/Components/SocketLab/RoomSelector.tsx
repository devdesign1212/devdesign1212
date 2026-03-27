type Props = {
  currentRoom: string;
  onChange: (room: string) => void;
};

const rooms = ['general', 'tech', 'random'];

const RoomSelector = ({ currentRoom, onChange }: Props) => {
  return (
    <div className="flex gap-2 border-b p-2">
      {rooms.map(room => (
        <button
          key={room}
          onClick={() => onChange(room)}
          className={`rounded px-3 py-1 text-sm ${
            currentRoom === room ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
        >
          #{room}
        </button>
      ))}
    </div>
  );
};

export default RoomSelector;

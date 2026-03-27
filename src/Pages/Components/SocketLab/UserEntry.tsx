import ButtonComponent from '@/components/Atoms/ButtonComponent';
import TextInputComponent from '@/components/Atoms/TextInputComponent';
import { darkTheme, lightTheme } from '@/themes/colors';
import { SendIcon } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

type Props = {
  onSave: (name: string) => void;
};

const UserEntry = ({ onSave }: Props) => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const [name, setName] = useState('');

  const handleSave = () => {
    if (!name.trim()) return;
    onSave(name);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2 flex gap-2"
    >
      <TextInputComponent
        placeholder="Enter your name..."
        value={name}
        onChange={e => setName(e.target.value)}
        rightSection={
          <ButtonComponent
            rightIcon={<SendIcon color={colors.whiteColor} />}
            onClick={handleSave}
            variant="filled"
            width={30}
            color={colors.whiteColor}
            backgroundColor={colors.primaryColor}
            borderColor={colors.primaryColor}
            disabled={!name.trim()}
          />
        }
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSave();
          }
        }}
        required
        variant="default"
        borderColor={colors.primaryColor}
        backgroundColor={colors.primaryColor}
        color={colors.primaryColor}
      />
    </motion.div>
  );
};

export default UserEntry;

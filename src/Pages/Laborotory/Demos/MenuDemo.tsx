import { Stack } from '@mantine/core';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import { AnimatePresence, motion } from 'framer-motion';
import CustomBurgerComponent from '@/components/Atoms/CustomBurgerComponent';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  ArrowRightLeft,
  Fingerprint,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import TextComponent from '@/components/Atoms/TextComponent';

const MenuDemo = () => {
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'menu.dashboard', color: '#6366f1' },
    { icon: ArrowRightLeft, label: 'menu.transactions', color: '#f59e0b' },
    { icon: ShieldCheck, label: 'menu.security', color: '#10b981' },
    { icon: Zap, label: 'menu.ai_analytics', color: '#8b5cf6' },
    { icon: Fingerprint, label: 'menu.biometrics', color: '#ec4899' },
    { icon: Settings, label: 'menu.settings', color: '#64748b' },
  ];

  return (
    <Stack align="center" gap="xl">
      <div className="flex h-screen" style={{ backgroundColor: colors.appBg }}>
        <motion.aside
          animate={{ width: isMenuOpen ? 260 : 85 }}
          transition={{ type: 'spring', stiffness: 200, damping: 25 }}
          className="relative z-50 flex h-full flex-col border-r border-white/10 backdrop-blur-xl"
          style={{ backgroundColor: `${colors.inActive}90` }}
        >
          <div className="flex items-center justify-center gap-4 p-6">
            <CustomBurgerComponent
              opened={isMenuOpen}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              color={colors.primaryColor}
            />
            <AnimatePresence>
              {isMenuOpen && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-xl font-black tracking-tighter"
                  style={{ color: colors.blackColor }}
                >
                  {t('menu.devDesign')}
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          <nav className="mt-4 flex-1 space-y-2 px-4">
            {menuItems.map((Item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  x: 5,
                  backgroundColor: `${colors.primaryColor}15`,
                }}
                whileTap={{ scale: 0.95 }}
                className="group flex cursor-pointer items-center rounded-2xl p-3 transition-colors"
              >
                <div className="relative">
                  <Item.icon
                    size={24}
                    strokeWidth={2.5}
                    style={{
                      color: isMenuOpen ? Item.color : colors.textSecondary,
                    }}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  {!isMenuOpen && (
                    <div className="absolute -right-1 -top-1 h-2 w-2 scale-0 rounded-full bg-red-500 transition-transform group-hover:scale-100" />
                  )}
                </div>

                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="ml-4 whitespace-nowrap text-sm font-bold uppercase tracking-widest"
                      style={{ color: colors.blackColor }}
                    >
                      {t(Item.label)}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </nav>
        </motion.aside>

        <main className="flex-1 overflow-y-auto p-12">
          <motion.div
            layout
            className="mx-auto flex h-full max-w-4xl items-center justify-center rounded-3xl border-2 border-dashed border-white/10"
          >
            <TextComponent
              fontSize={12}
              fontWeight={400}
              color={colors.textSecondary}
              className="italic"
            >
              {t('selectNodeFromCommandCenter')}
            </TextComponent>
          </motion.div>
        </main>
      </div>
    </Stack>
  );
};

export default MenuDemo;

import { useState, useMemo, useEffect } from 'react';
import { Box, ActionIcon, Tooltip } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MousePointer2,
  List,
  Calendar,
  FileCode,
  Type,
  Layout,
  AlignLeft,
  Menu as MenuIcon,
  Rocket,
} from 'lucide-react';

import TextComponent from '@/components/Atoms/TextComponent';
import ButtonDemo from './Demos/ButtonDemo';
import DropdownDemo from './Demos/DropdownDemo';
import FileInputDemo from './Demos/FileInputDemo';
import TextInputDemo from './Demos/InputDemo';
import ModalDemo from './Demos/ModalDemo';
import TextareaDemo from './Demos/TextareaDemo';
import DateDemo from './Demos/DateComponentDemo';
import MenuDemo from './Demos/MenuDemo';

const LaboratoryGallery = () => {
  const [activePortal, setActivePortal] = useState<string | null>(null);
  const [winSize, setWinSize] = useState({ w: 1000, h: 800 });

  // Handle Resize for Responsive Orbit
  useEffect(() => {
    const handleResize = () =>
      setWinSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const satellites = useMemo(
    () => [
      {
        id: 'Btn',
        label: 'Buttons',
        icon: <MousePointer2 size={20} />,
        view: <ButtonDemo />,
      },
      {
        id: 'Drop',
        label: 'Selects',
        icon: <List size={20} />,
        view: <DropdownDemo />,
      },
      {
        id: 'Date',
        label: 'Pickers',
        icon: <Calendar size={20} />,
        view: <DateDemo />,
      },
      {
        id: 'File',
        label: 'Assets',
        icon: <FileCode size={20} />,
        view: <FileInputDemo />,
      },
      {
        id: 'TextInput',
        label: 'Inputs',
        icon: <Type size={20} />,
        view: <TextInputDemo />,
      },
      {
        id: 'Modal',
        label: 'Overlays',
        icon: <Layout size={20} />,
        view: <ModalDemo />,
      },
      {
        id: 'Textarea',
        label: 'Rich Text',
        icon: <AlignLeft size={20} />,
        view: <TextareaDemo />,
      },
      {
        id: 'Menu',
        label: 'Navigation',
        icon: <MenuIcon size={20} />,
        view: <MenuDemo />,
      },
    ],
    [],
  );

  // SENIOR MATH: Adaptive Radius based on screen size
  const getPosition = (index: number, total: number) => {
    const baseRadius = Math.min(winSize.w, winSize.h) * 0.32; // Uses 32% of smallest screen dimension
    const angle = (index / total) * 2 * Math.PI;
    const x = Math.cos(angle) * baseRadius;
    const y = Math.sin(angle) * baseRadius;
    return { x, y };
  };

  return (
    <Box className="relative h-screen w-screen overflow-hidden bg-[#0A0A0B] selection:bg-blue-500/30">
      {/* 1. CREATIVE BACKGROUND: THE DISCOVERY NEBULA */}
      {/* These represent the "Important" components coming in 60 days */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -left-[10%] -top-[10%] h-[50%] w-[50%] rounded-full bg-blue-900/20 blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-indigo-900/20 blur-[100px]"
        />
      </div>

      {/* 2. ENGINEERING GRID */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage:
            'linear-gradient(#1E1E20 1px, transparent 1px), linear-gradient(90deg, #1E1E20 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <AnimatePresence mode="wait">
        {!activePortal ? (
          <motion.div
            key="orbit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
            className="relative z-10 flex h-full w-full items-center justify-center"
          >
            <div className="relative flex items-center justify-center">
              {/* ORBITAL PATHS (Visual Guides) */}
              <div className="pointer-events-none absolute h-[64%] w-[64%] rounded-full border border-white/5" />
              <div className="pointer-events-none absolute h-[40%] w-[40%] rounded-full border border-white/[0.02]" />

              {/* CENTRAL CORE */}
              <div className="relative z-20 flex flex-col items-center justify-center text-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="cursor-default"
                >
                  <TextComponent
                    fontSize={10}
                    fontWeight={900}
                    color="#3b82f6"
                    className="mb-2 uppercase tracking-[0.6em]"
                  >
                    Engineering Lab
                  </TextComponent>
                  <TextComponent
                    fontSize={winSize.w < 600 ? 32 : 54}
                    fontWeight={900}
                    color="#FFFFFF"
                    className="tracking-tighter"
                  >
                    V1<span className="text-blue-600">.</span>CORE
                  </TextComponent>
                </motion.div>

                {/* HUD ELEMENT: Component Count */}
                <div className="mt-6 flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {satellites.length} Active Nodes
                  </span>
                </div>
              </div>

              {/* SATELLITES */}
              {satellites.map((sat, index) => {
                const { x, y } = getPosition(index, satellites.length);
                return (
                  <motion.div
                    key={sat.id}
                    className="absolute"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1, x, y }}
                    transition={{
                      delay: index * 0.04,
                      type: 'spring',
                      damping: 15,
                    }}
                    whileHover={{ scale: 1.15, zIndex: 50 }}
                  >
                    <Tooltip
                      label={sat.label}
                      position="top"
                      withArrow
                      offset={14}
                      color="blue"
                    >
                      <button
                        onClick={() => setActivePortal(sat.id)}
                        className="group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-[#111113]/80 text-slate-400 backdrop-blur-md transition-all hover:border-blue-500/50 hover:text-white hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
                      >
                        {sat.icon}
                        {/* Connecting Line to Core */}
                        <div className="absolute -bottom-10 -z-10 h-10 w-[1px] bg-gradient-to-b from-blue-500/20 to-transparent" />
                      </button>
                    </Tooltip>
                  </motion.div>
                );
              })}
            </div>

            {/* UPCOMING FEATURE INDICATOR (Bottom Left) */}
            <div className="absolute bottom-10 left-10 flex items-center gap-4 opacity-40 transition-opacity hover:opacity-100">
              <div className="rounded-xl border border-dashed border-slate-700 p-3">
                <Rocket size={18} className="text-slate-500" />
              </div>
              <div>
                <TextComponent
                  fontSize={10}
                  fontWeight={800}
                  color="#64748b"
                  className="uppercase tracking-widest"
                >
                  Next Evolution
                </TextComponent>
                <TextComponent fontSize={12} fontWeight={600} color="#94a3b8">
                  Advanced Data Visualization (T-30d)
                </TextComponent>
              </div>
            </div>
          </motion.div>
        ) : (
          /* PORTAL VIEW */
          <motion.div
            key="portal"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 z-50 overflow-y-auto bg-[#0A0A0B] p-6 md:p-12"
          >
            <div className="mx-auto flex min-h-full max-w-7xl flex-col">
              <header className="mb-12 flex items-center justify-between">
                <ActionIcon
                  variant="subtle"
                  color="gray"
                  size="xl"
                  onClick={() => setActivePortal(null)}
                >
                  <ArrowLeft size={22} />
                </ActionIcon>
                <div className="flex flex-col items-end">
                  <Badge mb={4}>Base Layer Component</Badge>
                  <TextComponent fontSize={32} fontWeight={900} color="#FFF">
                    {satellites.find(s => s.id === activePortal)?.label}
                  </TextComponent>
                </div>
              </header>

              <main className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-12">
                {/* STAGE */}
                <div className="relative flex min-h-[400px] items-center justify-center overflow-hidden rounded-[40px] border border-white/5 bg-[#0D0D0F] p-8 shadow-2xl lg:col-span-8">
                  <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                      backgroundImage:
                        'radial-gradient(#fff 1.5px, transparent 0)',
                      backgroundSize: '32px 32px',
                    }}
                  />
                  <div className="relative z-10 w-full max-w-lg">
                    {satellites.find(s => s.id === activePortal)?.view}
                  </div>
                </div>

                {/* INFO PANEL */}
                <div className="flex flex-col gap-6 lg:col-span-4">
                  <div className="rounded-[32px] border border-white/5 bg-[#111113] p-8">
                    <div className="mb-6 flex items-center gap-2">
                      <div className="h-4 w-1 rounded-full bg-blue-500" />
                      <TextComponent
                        fontSize={12}
                        fontWeight={800}
                        color="#3b82f6"
                        className="uppercase tracking-widest"
                      >
                        Tech Stack
                      </TextComponent>
                    </div>
                    <div className="space-y-4">
                      <SpecRow label="Runtime" value="React 18 Engine" />
                      <SpecRow label="Physics" value="Framer Motion" />
                      <SpecRow label="Styling" value="Tailwind + Mantine" />
                      <SpecRow label="Accessibility" value="Aria-Compliant" />
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Box>
  );
};

/* --- SUBCOMPONENTS --- */

const SpecRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b border-white/[0.03] pb-2 last:border-0">
    <TextComponent fontSize={11} fontWeight={700} color="#475569">
      {label}
    </TextComponent>
    <TextComponent fontSize={12} fontWeight={600} color="#cbd5e1">
      {value}
    </TextComponent>
  </div>
);

const Badge = ({ children, mb }: any) => (
  <div
    style={{ marginBottom: mb }}
    className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/5 px-3 py-1 text-[9px] font-black uppercase tracking-[0.15em] text-blue-400"
  >
    <div className="h-1 w-1 rounded-full bg-blue-400" />
    {children}
  </div>
);

export default LaboratoryGallery;

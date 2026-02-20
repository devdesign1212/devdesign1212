import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue } from 'framer-motion';
import { Activity, Shield, Cpu } from 'lucide-react';
import StatBox from './StatBox';
import Connection from './ConnectionLine';
import Node from './Node';
import { useSelector } from 'react-redux';
import { darkTheme, lightTheme } from '@/themes/colors';
import ModalComponent from '@/components/Atoms/ModalComponent';
import TextComponent from '@/components/Atoms/TextComponent';
import { useTranslation } from 'react-i18next';

const NeuralMap = () => {
  const { t } = useTranslation();
  const currentTheme = useSelector((state: any) => state.theme.theme);
  const colors = currentTheme === 'light' ? lightTheme : darkTheme;
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  const n1X = useMotionValue(100);
  const n1Y = useMotionValue(100);
  const n2X = useMotionValue(350);
  const n2Y = useMotionValue(150);
  const n3X = useMotionValue(200);
  const n3Y = useMotionValue(350);

  const nodes = [
    {
      id: '1',
      label: t('NuralMap.AlphaCore'),
      icon: <Cpu />,
      color: colors.primaryColor,
      status: t('NuralMap.Optimal'),
      load: '24%',
      mvX: n1X,
      mvY: n1Y,
    },
    {
      id: '2',
      label: t('NuralMap.SecurityNode'),
      icon: <Shield />,
      color: colors.activeColor,
      status: t('NuralMap.Active'),
      load: '12%',
      mvX: n2X,
      mvY: n2Y,
    },
    {
      id: '3',
      label: t('NuralMap.NeuralLink'),
      icon: <Activity />,
      color: colors.warningColor,
      status: t('NuralMap.Processing'),
      load: '67%',
      mvX: n3X,
      mvY: n3Y,
    },
  ];

  const [, setTick] = useState(0);
  useEffect(() => {
    const update = () => setTick(t => t + 1);
    const unsubscribers = [
      n1X.on('change', update),
      n1Y.on('change', update),
      n2X.on('change', update),
      n2Y.on('change', update),
      n3X.on('change', update),
      n3Y.on('change', update),
    ];
    return () => unsubscribers.forEach(unsub => unsub());
  }, [n1X, n1Y, n2X, n2Y, n3X, n3Y]);

  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div
      ref={containerRef}
      className="relative h-[550px] w-full overflow-hidden "
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <Connection
          posA={{ x: n1X, y: n1Y }}
          posB={{ x: n2X, y: n2Y }}
          color={colors.primaryColor}
        />
        <Connection
          posA={{ x: n2X, y: n2Y }}
          posB={{ x: n3X, y: n3Y }}
          color={colors.warningColor}
        />
      </svg>

      {nodes.map(node => (
        <Node
          key={node.id}
          node={node}
          constraintsRef={containerRef}
          onSelect={() => setSelectedNodeId(node.id)}
        />
      ))}

      {selectedNodeId && selectedNode && (
        <ModalComponent
          opened={true}
          onClose={() => setSelectedNodeId(null)}
          content={
            <motion.div layoutId={`node-${selectedNode.id}`}>
              <div className="flex flex-col items-center">
                <div
                  className="mb-2 rounded-3xl bg-card p-5"
                  style={{ color: selectedNode.color }}
                >
                  {selectedNode.icon}
                </div>
                <TextComponent
                  color={colors.textColor}
                  fontSize={32}
                  fontWeight={900}
                  className="uppercase tracking-tighter"
                >
                  {selectedNode.label}
                </TextComponent>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <StatBox label={t('NuralMap.Load')} value={selectedNode.load} />
                <StatBox
                  label={t('NuralMap.Status')}
                  value={selectedNode.status}
                  isStatus
                />
              </div>
            </motion.div>
          }
        />
      )}
    </div>
  );
};

export default NeuralMap;

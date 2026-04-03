import { motion } from 'framer-motion';

const Connection = ({ posA, posB, color }: any) => {
  const x1 = posA.x.get() + 25;
  const y1 = posA.y.get() + 25;
  const x2 = posB.x.get() + 25;
  const y2 = posB.y.get() + 25;

  return (
    <>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="1"
        strokeOpacity="0.2"
      />
      <motion.circle
        r="3"
        fill={color}
        animate={{ cx: [x1, x2], cy: [y1, y2], opacity: [0, 1, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      />
    </>
  );
};

export default Connection;

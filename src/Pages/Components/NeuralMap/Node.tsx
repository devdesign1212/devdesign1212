import React from 'react';
import { motion } from 'framer-motion';
import { NodeProps } from '@/Common/interface';

const Node: React.FC<NodeProps> = ({ node, constraintsRef, onSelect }) => {
  return (
    <motion.div
      layoutId={`node-${node.id}`}
      drag
      dragConstraints={constraintsRef}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
      onTap={() => {
        onSelect(node);
      }}
      style={{ x: node.mvX, y: node.mvY, position: 'absolute' }}
      whileHover={{ scale: 1.1, zIndex: 50 }}
      whileDrag={{ scale: 0.95, cursor: 'grabbing' }}
      className="z-10 cursor-grab rounded-2xl border border-borderColor bg-card p-4 shadow-2xl backdrop-blur-xl active:cursor-grabbing"
    >
      <motion.div
        style={{ color: node.color }}
        animate={{
          filter: [
            `drop-shadow(0 0 2px ${node.color})`,
            `drop-shadow(0 0 8px ${node.color})`,
            `drop-shadow(0 0 2px ${node.color})`,
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {node.icon}
      </motion.div>
    </motion.div>
  );
};

export default Node;

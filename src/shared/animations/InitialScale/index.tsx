import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InitialScaleProps {
  children: ReactNode;
  delay: number;
}

function InitialScale({ children, delay }: InitialScaleProps) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay }}
      style={{ width: 'fit-content' }}
      className="d-flex"
    >
      {children}
    </motion.div>
  );
}

export default InitialScale;

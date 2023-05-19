import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TopSlideProps {
  children: ReactNode;
  delay: number;
}
function TopSlide({ children, delay }: TopSlideProps) {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        delay,
        duration: 2,
      }}
      style={{ width: 'fit-content' }}
      className="d-flex"
    >
      <motion.div
        animate={{ y: [0, -3, 0, 3, 0] }}
        transition={{
          delay: 2,
          duration: 5,
          repeat: Infinity,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export default TopSlide;

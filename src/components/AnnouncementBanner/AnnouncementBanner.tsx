'use client';

import { motion } from 'framer-motion';
import { IAnnouncementBannerProps } from '@/types/types';

const AnnouncementBanner = ({ label, text }: IAnnouncementBannerProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center text-xs sm:text-sm p-4 bg-neutral-950 text-amber-50">
      {label && (
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.span
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-bold"
          >
            {label}
          </motion.span>
        </motion.div>
      )}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col"
      >
        {text.map((line, index) => (
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5, delay: 0.1 * index, ease: 'easeOut' }}
            key={line}
          >
            {line}
          </motion.p>
        ))}
      </motion.div>
    </div>
  );
};

export default AnnouncementBanner;

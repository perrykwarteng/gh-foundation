"use client";

import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
};

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-6 rounded-2xl w-[90%] md:w-[600px] shadow-lg relative"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-500 hover:text-red-500 text-xl font-bold"
          >
            ✕
          </button>

          {title && (
            <h2 className="text-xl font-semibold text-[#c4a54a] mb-4 text-center">
              {title}
            </h2>
          )}

          <div>{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

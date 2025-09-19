import { motion, AnimatePresence } from "framer-motion";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    description: string;
    goal: number;
    raised: number;
    donations: number;
  } | null;
};

export default function ProjectModal({ isOpen, onClose, project }: ModalProps) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white p-6 rounded-2xl w-[90%] md:w-[600px] shadow-lg"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-[#c4a54a]">
              {project.title}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 font-bold text-lg"
            >
              ✕
            </button>
          </div>

          <p className="text-gray-700 mb-4">{project.description}</p>

          <div className="mb-4 space-y-2 text-gray-700">
            <p>
              <strong>Goal:</strong> Ghs{project.goal.toLocaleString()}
            </p>
            <p>
              <strong>Raised:</strong> Ghs{project.raised.toLocaleString()}
            </p>
            <p>
              <strong>Donations:</strong> {project.donations}
            </p>
          </div>

          <div className="bg-[#f7f7f7] text-gray-700 p-3 rounded-lg mb-4">
            <p className="font-semibold">Bank Details:</p>
            <p>Bank: Access Bank</p>
            <p>Account Number: 1234567890</p>
            <p>Mobile Money: +233 54 123 4567</p>
          </div>

          <button className="w-full bg-[#C4A54A] text-white py-2 rounded-lg font-medium hover:bg-[#a3893a] transition">
            Donate Now
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

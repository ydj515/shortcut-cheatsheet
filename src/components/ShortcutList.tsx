import type { Shortcut } from "../types/shortcut";
import { motion, AnimatePresence } from "framer-motion";

interface ShortcutListProps {
  shortcuts: Shortcut[];
}

export const ShortcutList = ({ shortcuts }: ShortcutListProps) => {
  if (!shortcuts) return null;

  if (shortcuts.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <div className="text-4xl font-bold text-gray-800 mb-2">No Results Found</div>
        <div className="text-gray-300 text-base">please check your search query</div>
      </div>
    );
  }

  const grouped = shortcuts.reduce((acc, item) => {
    acc[item.category] = [...(acc[item.category] || []), item];
    return acc;
  }, {} as Record<string, Shortcut[]>);

  return (
    <div className="space-y-6">
      <AnimatePresence mode="wait">
        {Object.entries(grouped).map(([category, items]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-2">{category}</h2>
            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {items.map(({ action, mac, win }, index) => (
                  <motion.div
                    key={action}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20, height: 0 }}
                    transition={{ 
                      duration: 0.2,
                      delay: index * 0.05,
                      height: { duration: 0.2 }
                    }}
                    className="flex justify-between items-center bg-white rounded p-3 shadow transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                  >
                    <div className="w-1/2">{action}</div>
                    <div className="flex gap-4 w-1/2 justify-end text-sm">
                      <div>
                        <span className="text-gray-500">Mac:</span> <kbd>{mac}</kbd>
                      </div>
                      <div>
                        <span className="text-gray-500">Win:</span>{" "}
                        <kbd>{win || "-"}</kbd>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

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
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-xl font-semibold mb-2">{category}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr>
                  <th className="w-1/3 px-4 py-2 border-b-2 border-gray-100">기능</th>
                  <th className="w-1/3 px-4 py-2 border-b-2 border-gray-100">Mac</th>
                  <th className="w-1/3 px-4 py-2 border-b-2 border-gray-100">Win</th>
                </tr>
              </thead>
              <AnimatePresence>
                <tbody>
                  {items.map(({ action, mac, win }, index) => (
                    <motion.tr
                      key={action}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20, height: 0 }}
                      transition={{
                        duration: 0.2,
                        delay: index * 0.05,
                        height: { duration: 0.2 }
                      }}
                      className="bg-white rounded-lg shadow transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                      style={{ borderRadius: 12, overflow: "hidden" }}
                    >
                      <td className="px-4 py-2 align-top rounded-l-lg">{action}</td>
                      <td className="px-4 py-2 align-top">{mac}</td>
                      <td className="px-4 py-2 align-top rounded-r-lg">{win || "-"}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </AnimatePresence>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

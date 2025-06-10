import type { Shortcut } from '../types/shortcut';

interface ShortcutListProps {
  shortcuts: Shortcut[];
}

export const ShortcutList = ({ shortcuts }: ShortcutListProps) => {
  if (!shortcuts) return null;
  
  const grouped = shortcuts.reduce((acc, item) => {
    acc[item.category] = [...(acc[item.category] || []), item];
    return acc;
  }, {} as Record<string, Shortcut[]>);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-xl font-semibold mb-2">{category}</h2>
          {items.map(({ action, mac, win }) => (
            <div
              key={action}
              className="flex justify-between items-center bg-white rounded p-3 mb-2 shadow"
            >
              <div className="w-1/2">{action}</div>
              <div className="flex gap-4 w-1/2 justify-end text-sm">
                <div>
                  <span className="text-gray-500">Mac:</span> <kbd>{mac}</kbd>
                </div>
                <div>
                  <span className="text-gray-500">Win:</span>{' '}
                  <kbd>{win || '-'}</kbd>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
} 
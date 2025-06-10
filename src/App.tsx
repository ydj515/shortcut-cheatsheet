import { useState } from 'react';
import { NavigationBar } from './components/NavigationBar';
import ShortcutCheatsheet from './components/ShortcutCheatsheet';


function App() {
  const [selectedCategory, setSelectedCategory] = useState('figma');

  return (
    <div className="flex h-screen">
      <NavigationBar 
        selectedCategoryId={selectedCategory}
        onSelectCategory={setSelectedCategory} 
      />
      <main className="flex-1 overflow-auto">
      <ShortcutCheatsheet selectedCategory={selectedCategory} />
    </main>
    </div>
  );
}

export default App;
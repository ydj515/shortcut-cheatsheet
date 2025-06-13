import { useState } from "react";
import { NavigationBar } from "./components/NavigationBar";
import ShortcutCheatsheet from "./components/ShortcutCheatsheet";
import { Analytics } from '@vercel/analytics/react';

function App() {
  const [selectedCategory, setSelectedCategory] = useState("intellij");

  return (
    <>
      <div className="flex flex-col md:flex-row h-screen min-w-[320px]">
        <div className="md:hidden">
          <NavigationBar
            selectedCategoryId={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        <div className="hidden md:block">
          <NavigationBar
            selectedCategoryId={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
        <main className="flex-1 w-full max-w-7xl mx-auto overflow-auto">
          <ShortcutCheatsheet selectedCategory={selectedCategory} />
        </main>
      </div>
      <Analytics />
    </>
  );
}

export default App;

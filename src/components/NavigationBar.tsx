import { Link } from "react-router-dom";
import { categories } from "../data/categories";

type NavigationBarProps = {
  onSelectCategory: (categoryId: string) => void;
  selectedCategoryId: string;
};

export const NavigationBar = ({
  onSelectCategory,
  selectedCategoryId
}: NavigationBarProps) => {
  return (
    <nav className="w-64 bg-gray-50 border-r border-gray-200 h-screen p-4">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-800">
          <Link
            to="/"
            className="cursor-pointer text-inherit no-underline transition duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)]"
          >
            Shortcuts
          </Link>
        </h1>
      </div>

      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category.id}>
            <button
              onClick={() => onSelectCategory(category.id)}
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors
                ${
                  selectedCategoryId === category.id
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

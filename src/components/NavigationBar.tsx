import { useState } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";
import { Footer } from "./Footer"; // Footer 가져오기

type NavigationBarProps = {
  onSelectCategory: (categoryId: string) => void;
  selectedCategoryId: string;
};

export const NavigationBar = ({
  onSelectCategory,
  selectedCategoryId
}: NavigationBarProps) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (categoryId: string) => {
    onSelectCategory(categoryId);
    setOpen(false);
  };

  return (
    <>
      {/* ✅ 모바일: 햄버거 메뉴 */}
      <div className="md:hidden relative">
        <div className="flex items-center justify-between p-4 bg-gray-100">
          <h1 className="text-xl font-bold text-gray-800">
            <Link
              to="/"
              className="cursor-pointer text-inherit no-underline transition duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)]"
              onClick={() => setOpen(false)}
            >
              Shortcuts
            </Link>
          </h1>
          <button
            className="p-2 text-2xl focus:outline-none transition-transform duration-200"
            onClick={() => setOpen((prev) => !prev)}
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          >
            {open ? (
              <span className="block transition-transform duration-200 rotate-0">&times;</span>
            ) : (
              <span className="block">&#9776;</span>
            )}
          </button>
        </div>
        <div
          className={`
            absolute left-0 top-16 w-full bg-white shadow-md z-50 border-t border-gray-200
            transition-all duration-300 overflow-hidden
            ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}
          `}
          style={{ transitionProperty: "max-height, opacity" }}
        >
          <ul className="py-2">
            {categories.map((category) => (
              <li key={category.id}>
                <button
                  onClick={() => handleSelect(category.id)}
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
          {/* ✅ Footer: 모바일 메뉴 하단 */}
          <div className="px-4 pb-4 pt-2 border-t border-gray-200">
            <Footer />
          </div>
        </div>
      </div>

      {/* ✅ 데스크탑: 고정 사이드바 */}
      <nav className="hidden md:flex flex-col w-64 bg-gray-100 p-4 h-screen justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800 mb-6">
            <Link
              to="/"
              className="cursor-pointer text-inherit no-underline transition duration-300 hover:text-white hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.9)]"
            >
              Shortcuts
            </Link>
          </h1>
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
        </div>
        {/* ✅ Footer: 데스크탑 네비게이션 하단 */}
        <Footer />
      </nav>
    </>
  );
};

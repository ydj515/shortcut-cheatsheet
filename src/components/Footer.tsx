const INSTALL_LINK = "https://chromewebstore.google.com/detail/shortcut-cheatsheet/gnlnjnpgomjmoangnpmbifjjenbnohjl?authuser=0&hl=ko";

export const Footer = () => {
  return (
    <div className="text-center text-sm text-gray-500 py-4">
      <a
        href={INSTALL_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mb-4 px-4 py-2 bg-gray-700 text-white font-medium rounded hover:bg-gray-600 transition"
      >
        설치 바로가기
      </a>
      <footer className="border-t pt-4">
        © {new Date().getFullYear()} Copyright.<br />
        All rights reserved.
      </footer>
    </div>
  );
};

import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  className?: string;
}

const tabs = [
  { label: "Статья", path: "/article" },
  { label: "Викторина", path: "/quiz" },
  { label: "Мини-игры", path: "/games" },
];

export default function Header({ className }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div
          className="text-white text-sm uppercase tracking-widest font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          КОМПЬЮТЕРЫ
        </div>
        <nav className="flex gap-2">
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => navigate(tab.path)}
                className={`px-4 py-2 text-sm uppercase tracking-wide transition-all duration-300 border ${
                  isActive
                    ? "bg-white text-black border-white"
                    : "text-white border-white/40 hover:border-white hover:bg-white/10"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

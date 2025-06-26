import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore.js";
import {THEMES } from "../../constants/index.js"; // Adjust the import path as necessary

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="dropdown dropdown-end">
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-6 opacity-70" />
      </button>

      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 background-blur-lg rounded-2xl w-56
           border border-base-content/10 max-h-80 overflow-y-auto"
      >

        <div className="space-y-1">
            {THEMES.map((themeOption) => (
              <button 
              key={themeOption.name}
              className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors 
              ${
                theme === themeOption
                ? "bg-primary/10 text-primary"
                : "hover:bg-base-content/5"
              }`}
              onClick={() => setTheme(themeOption.name)}
              >
                <PaletteIcon className="size-5" />
                <span className="text-sm">{themeOption.label}</span>
                { /* PREVIEW COLORS */}
                <div className="ml-auto flex gap-1">
                {themeOption.colors.map((color, i) => (
                  <span key={i}
                        className="size-2 rounded-full"
                        style={{backgroundColor : color}} />
                ))}
                </div>
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ThemeSelector;

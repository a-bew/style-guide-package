// context/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { themes as defaultThemes, Theme } from "./theme";
import { darkenColor } from "@/utils/functions";

interface ThemeContextProps {
  themes: { [key: string]: Theme };
  currentTheme: Theme;
  currentThemeName: string;
  color: string;
  secondaryColor: string;
  darkenedColor: string;
  setTheme: (themeName: string) => void;
  addNewTheme: (newThemes: { [key: string]: Theme }) => void;
  resetThemes: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // ---------- Load from localStorage or fallback ----------
  const [themes, setThemes] = useState<{ [key: string]: Theme }>(() => {
    const stored = localStorage.getItem("themes");
    return stored ? JSON.parse(stored) : defaultThemes;
  });

  const [currentThemeName, setCurrentThemeName] = useState<string>(() => {
    const stored = localStorage.getItem("currentThemeName");
    return stored ? JSON.parse(stored) : "default";
  });

  // Always keep theme in sync with localStorage
  useEffect(() => {
    localStorage.setItem("themes", JSON.stringify(themes));
  }, [themes]);

  useEffect(() => {
    localStorage.setItem("currentThemeName", JSON.stringify(currentThemeName));
  }, [currentThemeName]);

  const currentTheme = themes[currentThemeName] || defaultThemes.default;

  // ---------- Derived values (memoized for performance) ----------
  const { color, secondaryColor, darkenedColor } = useMemo(() => {
    const color = currentTheme.primaryColor;
    const secondaryColor = currentTheme.secondaryColor;
    const darkenedColor = darkenColor(color, 0.1);
    return { color, secondaryColor, darkenedColor };
  }, [currentTheme]);

  // ---------- Actions ----------
  const setTheme = (themeName: string) => {
    if (themes[themeName]) {
      setCurrentThemeName(themeName);
    }
  };

  const addNewTheme = (newThemes: { [key: string]: Theme }) => {
    setThemes(prev => {
      const updated = { ...prev, ...newThemes };
      const keys = Object.keys(newThemes);

      if (keys.length === 1) {
        setCurrentThemeName(keys[0]); // auto switch to new theme
      }
      return updated;
    });
  };

  const resetThemes = () => {
    setThemes(defaultThemes);
    setCurrentThemeName("default");
  };

  return (
    <ThemeContext.Provider
      value={{
        themes,
        currentTheme,
        currentThemeName,
        color,
        secondaryColor,
        darkenedColor,
        setTheme,
        addNewTheme,
        resetThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// ---------- Custom Hook ----------
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used within ThemeProvider");
  return context;
};

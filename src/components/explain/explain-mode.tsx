"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

export type ExplainMode = "plain" | "technical";

const ExplainModeContext = createContext<{
  mode: ExplainMode;
  setMode: (m: ExplainMode) => void;
}>({ mode: "plain", setMode: () => {} });

const STORAGE_KEY = "gr-explain-mode";

export function ExplainModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ExplainMode>("plain");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "plain" || saved === "technical") setMode(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  return (
    <ExplainModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ExplainModeContext.Provider>
  );
}

export function useExplainMode() {
  return useContext(ExplainModeContext);
}

export function ExplainModeToggle() {
  const { mode, setMode } = useExplainMode();
  const options: { value: ExplainMode; label: string }[] = [
    { value: "plain", label: "Simple" },
    { value: "technical", label: "Technical" },
  ];
  return (
    <div
      className="flex rounded-md border border-border p-0.5"
      role="group"
      aria-label="Explanation detail level"
      title="Detail level for the ⓘ explainers on cards"
    >
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setMode(o.value)}
          aria-pressed={mode === o.value}
          className={cn(
            "rounded px-2 py-1 text-xs font-medium transition-colors",
            mode === o.value
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

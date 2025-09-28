"use client";
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type ReactElement,
  Children,
  cloneElement,
  useRef,
  useEffect,
  useId,
} from "react";
import styles from "./Tabs.module.scss";

// ---------------- Context ----------------
type TabsContextType = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  idPrefix: string;
  registerTab: (ref: HTMLButtonElement | null) => number;

};

const TabsContext = createContext<TabsContextType | null>(null);

// ---------------- Root ----------------
export function Tabs({ children, defaultIndex = 0  }: { children: ReactNode; defaultIndex?: number }) {

  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const [focusedIndex, setFocusedIndex] = useState(0);
const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const idPrefix = useId();

  const registerTab = (ref: HTMLButtonElement | null) => {
    if (ref && !tabRefs.current.includes(ref)) {
      tabRefs.current.push(ref);
    }
    return tabRefs.current.length - 1;
  };

  // Keyboard navigation
  const onKeyDown = (e: KeyboardEvent) => {
    const currentIndex = activeIndex;
    let newIndex = currentIndex;

    if (e.key === "ArrowRight") newIndex = (currentIndex + 1) % tabRefs.current.length;
    if (e.key === "ArrowLeft") newIndex = (currentIndex - 1 + tabRefs.current.length) % tabRefs.current.length;
    if (e.key === "Home") newIndex = 0;
    if (e.key === "End") newIndex = tabRefs.current.length - 1;

    if (newIndex !== currentIndex) {
      setActiveIndex(newIndex);
      tabRefs.current[newIndex]?.focus();
      e.preventDefault();
    }
  };

  useEffect(() => {
    const container: any = tabRefs.current[0]?.closest("[role=tablist]");
    if (!container) return;
    container.addEventListener("keydown", onKeyDown);
    return () => container.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);
  return (
    <TabsContext.Provider
      value={{ activeIndex, setActiveIndex, focusedIndex, setFocusedIndex, idPrefix, registerTab }}
    >
      <div className={styles.tabs}>{children}</div>
    </TabsContext.Provider>
  );
}

// ---------------- Tabs.List ----------------
Tabs.List = function TabsList({
  children,
}: {
  children: ReactElement[];
}) {
  return (
    <div role="tablist" className={styles.tabList}>
      {Children.map(children, (child, index: number) =>
        cloneElement(child, index === 0 ? { "aria-selected": true } as any : {index})
      )}
    </div>
  );
};

// ---------------- Tabs.Tab ----------------
Tabs.Tab = function TabsTab({
  children,
  index,
  disabled = false,
}: {
  children: ReactNode;
  index?: number;
  disabled?: boolean;
}) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.Tab must be used inside <Tabs>");

  const { activeIndex, setActiveIndex, focusedIndex, setFocusedIndex } = ctx;
  const ref = useRef<HTMLButtonElement | null>(null);

  const isActive = activeIndex === index;
  const isFocused = focusedIndex === index;

  // Auto-focus when focusedIndex changes
  useEffect(() => {
    if (isFocused && !disabled) {
      ref.current?.focus();
    }
  }, [isFocused, disabled]);

  // Get siblings ignoring disabled
  const getEnabledSiblings = () => {
    const siblings = ref.current?.parentElement?.children;
    if (!siblings) return [];
    return Array.from(siblings).filter(
      (el) => !(el as HTMLButtonElement).disabled
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const siblings = getEnabledSiblings();
    const count = siblings.length;
    if (count === 0) return;

    const currentPos = siblings.indexOf(ref.current!);
    let nextIndex = currentPos;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = (currentPos + 1) % count;
        break;
      case "ArrowLeft":
        nextIndex = (currentPos - 1 + count) % count;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = count - 1;
        break;
      case "Enter":
      case " ":
        setActiveIndex(index!);
        e.preventDefault();
        return;
    }

    const nextTab = siblings[nextIndex];
    if (nextTab) {
      const nextIndexAttr = Array.from(
        ref.current?.parentElement?.children || []
      ).indexOf(nextTab);
      setFocusedIndex(nextIndexAttr);
    }

    e.preventDefault();
  };

  return (
    <button
      ref={ref}
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      tabIndex={isActive ? 0 : -1}
      disabled={disabled}
      onClick={() => !disabled && setActiveIndex(index!)}
      onFocus={() => !disabled && setFocusedIndex(index!)}
      onKeyDown={disabled ? undefined : handleKeyDown}
      className={`${styles.tab} ${isActive ? styles.active : ""} ${
        disabled ? styles.disabled : ""
      }`}
    >
      {children}
    </button>
  );
};

// ---------------- Tabs.Panels ----------------
Tabs.Panels = function TabsPanels({
  children,
}: {
  children: ReactElement[];
}) {
  return (
    <>
      {Children.map(children, (child, index) =>
        cloneElement(child, { index }as any)
      )}
    </>
  );
};

// ---------------- Tabs.Panel ----------------
Tabs.Panel = function TabsPanel({
  children,
  index,
}: {
  children: ReactNode;
  index?: number;
}) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.Panel must be used inside <Tabs>");

  return ctx.activeIndex === index ? (
    <div role="tabpanel" className={styles.panel}>
      {children}
    </div>
  ) : null;
};

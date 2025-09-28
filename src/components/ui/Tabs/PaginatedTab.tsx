import React, { useState, useRef, useEffect, memo } from "react";
import styles from "./PaginatedTab.module.scss";
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi";

interface TabItemData {
  label: string;
  icon?: React.ReactNode;
  value: string; // e.g. section id, slug, or route
}

interface PaginatedTabProps {
  items: TabItemData[];
  itemsPerPage?: number;
  disabled?: boolean;
  initialIndex?: number;
  onClickTabItem: (tab: TabItemData, index: number) => void;
}

const PaginatedTab: React.FC<PaginatedTabProps> = memo(
  ({
    items,
    itemsPerPage = 5,
    disabled = false,
    initialIndex = 0,
    onClickTabItem,
  }) => {
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const [focusedIndex, setFocusedIndex] = useState(initialIndex);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const currentPage = Math.floor(focusedIndex / itemsPerPage);

    const focusTab = (newIndex: number) => {
      setFocusedIndex(newIndex);
      scrollTabIntoView(newIndex);
    };

    const activateTab = (newIndex: number) => {
      if (!disabled) {
        setActiveIndex(newIndex);
        onClickTabItem(items[newIndex], newIndex);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      switch (e.key) {
        case "ArrowRight":
          e.preventDefault();
          focusTab((index + 1) % items.length);
          break;
        case "ArrowLeft":
          e.preventDefault();
          focusTab((index - 1 + items.length) % items.length);
          break;
        case "Home":
          e.preventDefault();
          focusTab(0);
          break;
        case "End":
          e.preventDefault();
          focusTab(items.length - 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          activateTab(index);
          break;
      }
    };

    const scrollTabIntoView = (index: number) => {
      const container = scrollContainerRef.current;
      if (!container) return;

      const tab = container.children[index] as HTMLElement;
      if (tab) {
        tab.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    };

    return (
      <nav className={styles.container} aria-label="Main navigation tabs">
        {currentPage > 0 && (
          <button
            type="button"
            className={styles.arrow}
            aria-label="Previous tabs"
            onClick={() => focusTab(Math.max(0, focusedIndex - itemsPerPage))}
          >
            <TfiArrowCircleLeft />
          </button>
        )}

        <div
          className={styles.scrollContainer}
          role="tablist"
          aria-label="Navigation Tabs"
          ref={scrollContainerRef}
        >
          {items.map((item, index) => (
            <button
              key={item.value}
              role="tab"
              id={`nav-tab-${index}`}
              aria-selected={activeIndex === index}
              tabIndex={focusedIndex === index ? 0 : -1}
              disabled={disabled}
              className={`${styles.tab} ${
                activeIndex === index ? styles.active : ""
              }`}
              onClick={() => activateTab(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>

        {currentPage < totalPages - 1 && (
          <button
            type="button"
            className={styles.arrow}
            aria-label="Next tabs"
            onClick={() =>
              focusTab(Math.min(items.length - 1, focusedIndex + itemsPerPage))
            }
          >
            <TfiArrowCircleRight />
          </button>
        )}
      </nav>
    );
  }
);

export default PaginatedTab;

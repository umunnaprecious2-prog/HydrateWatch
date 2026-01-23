"use client";

import { useState, createContext, useContext } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

/**
 * Accordion Component System
 *
 * A reusable, accessible accordion component with consistent expand/collapse behavior.
 *
 * Features:
 * - Single or multiple items expanded at once
 * - Smooth animations
 * - Keyboard accessible
 * - Customizable styling
 * - Icon rotation on expand/collapse
 *
 * Usage:
 * <Accordion>
 *   <AccordionItem>
 *     <AccordionTrigger>Title</AccordionTrigger>
 *     <AccordionContent>Content here</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 */

// Context for accordion state
const AccordionContext = createContext(null);
const AccordionItemContext = createContext(null);

/**
 * Main Accordion container
 * @param {Object} props
 * @param {React.ReactNode} props.children - AccordionItem children
 * @param {string} props.type - "single" (one at a time) or "multiple" (multiple open)
 * @param {string|string[]} props.defaultValue - Default expanded item(s)
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.collapsible - Allow all items to be collapsed (single mode)
 */
export function Accordion({
  children,
  type = "single",
  defaultValue = null,
  className = "",
  collapsible = true,
}) {
  const [expandedItems, setExpandedItems] = useState(() => {
    if (type === "multiple") {
      return Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [];
    }
    return defaultValue || null;
  });

  const toggleItem = (itemId) => {
    if (type === "multiple") {
      setExpandedItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setExpandedItems((prev) => {
        if (prev === itemId) {
          return collapsible ? null : prev;
        }
        return itemId;
      });
    }
  };

  const isExpanded = (itemId) => {
    if (type === "multiple") {
      return expandedItems.includes(itemId);
    }
    return expandedItems === itemId;
  };

  return (
    <AccordionContext.Provider value={{ toggleItem, isExpanded, type }}>
      <div className={`divide-y divide-gray-200 ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

/**
 * Individual accordion item
 * @param {Object} props
 * @param {React.ReactNode} props.children - AccordionTrigger and AccordionContent
 * @param {string} props.value - Unique identifier for this item
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Disable this item
 */
export function AccordionItem({
  children,
  value,
  className = "",
  disabled = false,
}) {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionItem must be used within an Accordion");
  }

  const isExpanded = context.isExpanded(value);

  return (
    <AccordionItemContext.Provider value={{ value, isExpanded, disabled }}>
      <div
        className={`${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        data-state={isExpanded ? "open" : "closed"}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}

/**
 * Clickable trigger/header for accordion item
 * @param {Object} props
 * @param {React.ReactNode} props.children - Trigger content
 * @param {string} props.className - Additional CSS classes
 * @param {React.ReactNode} props.icon - Custom expand/collapse icon
 * @param {boolean} props.showIcon - Whether to show chevron icon
 * @param {"left"|"right"} props.iconPosition - Position of the icon
 */
export function AccordionTrigger({
  children,
  className = "",
  icon = null,
  showIcon = true,
  iconPosition = "right",
}) {
  const accordionContext = useContext(AccordionContext);
  const itemContext = useContext(AccordionItemContext);

  if (!accordionContext || !itemContext) {
    throw new Error("AccordionTrigger must be used within an AccordionItem");
  }

  const { toggleItem } = accordionContext;
  const { value, isExpanded, disabled } = itemContext;

  const handleClick = () => {
    if (!disabled) {
      toggleItem(value);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;

  const iconElement = showIcon && (
    <span
      className={`transition-transform duration-200 ${
        isExpanded ? "rotate-0" : iconPosition === "right" ? "-rotate-90" : "rotate-0"
      }`}
    >
      {icon || <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? "rotate-0" : "-rotate-90"}`} />}
    </span>
  );

  return (
    <button
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      disabled={disabled}
      aria-expanded={isExpanded}
      className={`
        w-full flex items-center justify-between p-4
        text-left font-medium text-gray-900
        hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500
        transition-colors duration-150
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      {iconPosition === "left" && iconElement}
      <span className="flex-1">{children}</span>
      {iconPosition === "right" && iconElement}
    </button>
  );
}

/**
 * Collapsible content area
 * @param {Object} props
 * @param {React.ReactNode} props.children - Content to show/hide
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.forceMount - Always mount content (for animations)
 */
export function AccordionContent({
  children,
  className = "",
  forceMount = false,
}) {
  const itemContext = useContext(AccordionItemContext);

  if (!itemContext) {
    throw new Error("AccordionContent must be used within an AccordionItem");
  }

  const { isExpanded } = itemContext;

  if (!forceMount && !isExpanded) {
    return null;
  }

  return (
    <div
      className={`
        overflow-hidden transition-all duration-200 ease-in-out
        ${isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}
      `}
      aria-hidden={!isExpanded}
    >
      <div className={`px-4 pb-4 pt-0 ${className}`}>{children}</div>
    </div>
  );
}

/**
 * Simple collapsible component for single items
 * @param {Object} props
 * @param {string} props.title - Header text
 * @param {React.ReactNode} props.children - Collapsible content
 * @param {boolean} props.defaultOpen - Start expanded
 * @param {string} props.className - Container classes
 * @param {string} props.headerClassName - Header classes
 * @param {string} props.contentClassName - Content classes
 * @param {React.ReactNode} props.icon - Icon to show in header
 */
export function Collapsible({
  title,
  children,
  defaultOpen = false,
  className = "",
  headerClassName = "",
  contentClassName = "",
  icon = null,
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-full flex items-center justify-between p-4
          text-left font-medium text-gray-900 bg-white
          hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500
          transition-colors duration-150
          ${headerClassName}
        `}
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-3">
          {icon}
          {title}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "rotate-0" : "-rotate-90"
          }`}
        />
      </button>
      {isOpen && (
        <div className={`px-4 pb-4 border-t border-gray-100 bg-gray-50 ${contentClassName}`}>
          <div className="pt-4">{children}</div>
        </div>
      )}
    </div>
  );
}

/**
 * Utility hook for managing accordion state
 */
export function useAccordion(type = "single", defaultValue = null, collapsible = true) {
  const [expandedItems, setExpandedItems] = useState(() => {
    if (type === "multiple") {
      return Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : [];
    }
    return defaultValue || null;
  });

  const toggleItem = (itemId) => {
    if (type === "multiple") {
      setExpandedItems((prev) =>
        prev.includes(itemId)
          ? prev.filter((id) => id !== itemId)
          : [...prev, itemId]
      );
    } else {
      setExpandedItems((prev) => {
        if (prev === itemId) {
          return collapsible ? null : prev;
        }
        return itemId;
      });
    }
  };

  const isExpanded = (itemId) => {
    if (type === "multiple") {
      return expandedItems.includes(itemId);
    }
    return expandedItems === itemId;
  };

  const expandAll = (items) => {
    if (type === "multiple") {
      setExpandedItems(items);
    }
  };

  const collapseAll = () => {
    setExpandedItems(type === "multiple" ? [] : null);
  };

  return {
    expandedItems,
    toggleItem,
    isExpanded,
    expandAll,
    collapseAll,
  };
}

export default Accordion;

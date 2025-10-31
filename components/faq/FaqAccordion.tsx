'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import './faq-accordion.css';

export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqAccordionProps = {
  items: FaqItem[];
  defaultOpenIndex?: number | null;
  className?: string;
  glassEnabled?: boolean;
};

const clampIndex = (index: number | null, total: number) => {
  if (index === null) return null;
  return Math.min(Math.max(index, 0), total - 1);
};

type AccordionItemProps = {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  glassEnabled: boolean;
};

function AccordionItem({ id, question, answer, isOpen, onToggle, glassEnabled }: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const node = contentRef.current;
    if (!node) return;

    if (typeof ResizeObserver === 'undefined') {
      setHeight(node.scrollHeight);
      return;
    }

    const updateHeight = () => {
      setHeight(node.scrollHeight);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [question, answer]);

  const contentStyle = useMemo<CSSProperties>(
    () => ({ maxHeight: isOpen ? `${height}px` : '0px' }),
    [isOpen, height],
  );

  const triggerClasses = useMemo(() => {
    const base = 'faq-trigger accord-motion';
    return glassEnabled ? `${base} lux-glass` : base;
  }, [glassEnabled]);

  return (
    <div className="faq-item">
      <button
        type="button"
        className={triggerClasses}
        id={`${id}-trigger`}
        aria-expanded={isOpen}
        aria-controls={`${id}-panel`}
        data-open={isOpen}
        data-state={glassEnabled && isOpen ? 'active' : undefined}
        onClick={onToggle}
      >
        <span className="faq-trigger-text">{question}</span>
        <span className="faq-trigger-icon" aria-hidden="true">
          +
        </span>
      </button>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-trigger`}
        className="faq-content accord-motion"
        data-open={isOpen}
        aria-hidden={!isOpen}
        style={contentStyle}
      >
        <div ref={contentRef}>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FaqAccordion({ items, defaultOpenIndex = 0, className, glassEnabled = false }: FaqAccordionProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(() => clampIndex(defaultOpenIndex, items.length));

  return (
    <div className={`faq-accordion${className ? ` ${className}` : ''}`}>
      {items.map((item, index) => {
        const id = `${baseId}-${index}`;
        const isOpen = openIndex === index;
        return (
          <AccordionItem
            key={id}
            id={id}
            question={item.question}
            answer={item.answer}
            isOpen={isOpen}
            glassEnabled={glassEnabled}
            onToggle={() => setOpenIndex(isOpen ? null : index)}
          />
        );
      })}
    </div>
  );
}

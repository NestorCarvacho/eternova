"use client";

import { useState } from "react";

export function FaqList({
  items,
  empty,
}: {
  items: { q: string; a: string }[];
  empty: string;
}) {
  const [open, setOpen] = useState(0);
  const [motion, setMotion] = useState<"down" | "up" | null>(null);

  if (items.length === 0) {
    return <p className="text-muted">{empty}</p>;
  }

  function select(index: number) {
    if (index === open) return;
    setMotion(index > open ? "down" : "up");
    setOpen(index);
  }

  return (
    <div className="border-t border-line">
      {items.map((item, index) => {
        const selected = open === index;
        return (
          <div key={item.q} className="border-b border-line">
            <button
              type="button"
              id={`faq-question-${index}`}
              aria-expanded={selected}
              aria-controls={`faq-panel-${index}`}
              onClick={() => select(index)}
              className="flex min-h-14 w-full cursor-pointer items-center justify-between gap-4 py-3 text-left font-medium text-ink"
            >
              <span className="text-pretty">{item.q}</span>
              <span
                aria-hidden="true"
                className={`text-xl leading-none text-gold-deep transition-transform duration-500 ease-out motion-reduce:transition-none ${
                  selected ? "rotate-45" : ""
                }`}
              >
                +
              </span>
            </button>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              inert={selected ? undefined : true}
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ gridTemplateRows: selected ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div className="grid">
                  {items.map((answer, answerIndex) => {
                    const visible = selected && answerIndex === open;
                    return (
                      <p
                        key={answer.q}
                        aria-hidden={!visible}
                        className={`col-start-1 row-start-1 max-w-[68ch] py-4 leading-7 text-pretty text-muted ${
                          visible ? (motion === "down" ? "faq-settle-down" : motion === "up" ? "faq-settle-up" : "") : "invisible"
                        }`}
                      >
                        {answer.a}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

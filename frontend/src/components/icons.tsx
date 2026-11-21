export function PhoneIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
      <path
        d="M6.2 3.8h2.1l1 2.4-1.3 1a8.4 8.4 0 0 0 4.8 4.8l1-1.3 2.4 1v2.1a1.2 1.2 0 0 1-1.3 1.2A12.2 12.2 0 0 1 5 5.1a1.2 1.2 0 0 1 1.2-1.3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChatIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-5" aria-hidden="true">
      <path
        d="M4 5.5h12v7.2H8.2L4 15.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
      <path
        d="M4 10h12M12 6l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: { className?: string }) {
  const svgClass = className ? `size-5 shrink-0 ${className}` : "size-5 shrink-0";
  return (
    <svg viewBox="0 0 20 20" className={svgClass} aria-hidden="true">
      <path
        d="M12 4.5 6.5 10 12 15.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className }: { className?: string }) {
  const svgClass = className ? `size-5 shrink-0 ${className}` : "size-5 shrink-0";
  return (
    <svg viewBox="0 0 20 20" className={svgClass} aria-hidden="true">
      <path
        d="M8 4.5 13.5 10 8 15.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  const svgClass = className ?? "mt-0.5 size-4 shrink-0 text-gold-deep";
  return (
    <svg viewBox="0 0 20 20" className={svgClass} aria-hidden="true">
      <path
        d="M4 10.5 8 14.5 16 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function XMarkIcon({ className }: { className?: string }) {
  const svgClass = className ?? "size-4 shrink-0 text-muted";
  return (
    <svg viewBox="0 0 20 20" className={svgClass} aria-hidden="true">
      <path
        d="m6 6 8 8M14 6l-8 8"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

const paths = [
  "M4 6.5h12v8H4zM7 6.5V5.2A1.2 1.2 0 0 1 8.2 4h3.6A1.2 1.2 0 0 1 13 5.2v1.3",
  "M6 3.5h8v13H6zM8 7h4M8 10h4M8 13h2.5",
  "M10 13.5V6M7 8.5 10 5.5l3 3M4 15.5h12",
  "M3.5 6.5h13v8h-13zM3.5 9.5h13",
  "M15 8a5 5 0 0 0-8.5-2.2M5 12a5 5 0 0 0 8.5 2.2M13.5 4.5V7H16M6.5 15.5V13H4",
  "M4 9.2 10 4.5l6 4.7V15.5H4zM8 15.5v-4h4v4",
];

export function StepIcon({ index }: { index: number }) {
  return (
    <svg viewBox="0 0 20 20" className="size-6" aria-hidden="true">
      <path
        d={paths[index] ?? paths[0]}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

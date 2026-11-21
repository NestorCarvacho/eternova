export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden="true">
      <path
        d="M10 20C10 10 22 10 30 20C38 30 50 30 50 20C50 10 38 10 30 20C22 30 10 30 10 20Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

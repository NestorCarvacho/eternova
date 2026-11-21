export function Flag({ code }: { code: string }) {
  const frame = "h-3.5 w-5 shrink-0 overflow-hidden rounded-[2px]";
  if (code === "es") {
    return (
      <svg viewBox="0 0 20 14" className={frame} aria-hidden="true">
        <rect width="20" height="14" fill="#c60b1e" />
        <rect y="3.5" width="20" height="7" fill="#ffc400" />
      </svg>
    );
  }
  if (code === "fr") {
    return (
      <svg viewBox="0 0 20 14" className={frame} aria-hidden="true">
        <rect width="6.67" height="14" fill="#0055a4" />
        <rect x="6.67" width="6.66" height="14" fill="#fff" />
        <rect x="13.33" width="6.67" height="14" fill="#ef4135" />
      </svg>
    );
  }
  if (code === "it") {
    return (
      <svg viewBox="0 0 20 14" className={frame} aria-hidden="true">
        <rect width="6.67" height="14" fill="#009246" />
        <rect x="6.67" width="6.66" height="14" fill="#fff" />
        <rect x="13.33" width="6.67" height="14" fill="#ce2b37" />
      </svg>
    );
  }
  if (code === "pt") {
    return (
      <svg viewBox="0 0 20 14" className={frame} aria-hidden="true">
        <rect width="8" height="14" fill="#006600" />
        <rect x="8" width="12" height="14" fill="#ff0000" />
        <circle cx="8" cy="7" r="2.4" fill="#ffcc00" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 30" className={frame} aria-hidden="true">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#fff" strokeWidth="8" />
      <path d="M0 0 L60 30 M60 0 L0 30" stroke="#c8102e" strokeWidth="4" />
      <path d="M30 0 V30 M0 15 H60" stroke="#fff" strokeWidth="14" />
      <path d="M30 0 V30 M0 15 H60" stroke="#c8102e" strokeWidth="8" />
    </svg>
  );
}

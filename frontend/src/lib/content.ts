export function asStrings(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export function asFaq(value: unknown): { q: string; a: string }[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as { q?: unknown; a?: unknown };
    if (typeof record.q !== "string" || typeof record.a !== "string") return [];
    return [{ q: record.q, a: record.a }];
  });
}

export function asSteps(value: unknown): { title: string; text: string }[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as { title?: unknown; text?: unknown };
    if (typeof record.title !== "string" || typeof record.text !== "string") return [];
    return [{ title: record.title, text: record.text }];
  });
}

import type { Service } from "@/lib/site";

export type PlanId = Service["id"];

export type ComparisonRow = {
  key: string;
  included: Record<PlanId, boolean>;
};

/** Filas atómicas para la tabla comparativa (sin “todo lo incluido en…”). */
export const comparisonRows: ComparisonRow[] = [
  {
    key: "docs",
    included: { basica: true, signature: true, vip: true },
  },
  {
    key: "crematorium",
    included: { basica: true, signature: true, vip: true },
  },
  {
    key: "individualCremation",
    included: { basica: true, signature: true, vip: true },
  },
  {
    key: "homeDelivery",
    included: { basica: true, signature: true, vip: true },
  },
  {
    key: "basicUrn",
    included: { basica: true, signature: false, vip: false },
  },
  {
    key: "superiorUrn",
    included: { basica: false, signature: true, vip: false },
  },
  {
    key: "premiumUrn",
    included: { basica: false, signature: false, vip: true },
  },
  {
    key: "specialPresentation",
    included: { basica: false, signature: true, vip: true },
  },
  {
    key: "personalSupport",
    included: { basica: false, signature: true, vip: true },
  },
  {
    key: "priorityDelivery",
    included: { basica: false, signature: true, vip: true },
  },
  {
    key: "priorityAttention",
    included: { basica: false, signature: false, vip: true },
  },
  {
    key: "specialDeliveryCoord",
    included: { basica: false, signature: false, vip: true },
  },
  {
    key: "fullProcessSupport",
    included: { basica: false, signature: false, vip: true },
  },
];
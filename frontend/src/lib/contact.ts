export type ContactField = "name" | "email" | "phone" | "message";

export type ContactState = {
  ok: boolean;
  message: string;
  field?: ContactField;
  nonce: number;
};

export const initialContactState: ContactState = {
  ok: false,
  message: "",
  nonce: 0,
};

export type ContactOption = {
  value: string;
  label: string;
};

export type ContactLabels = {
  name: string;
  email: string;
  phone: string;
  message: string;
  plan: string;
  planEmpty: string;
  plans: ContactOption[];
  submit: string;
  sending: string;
  privacy: string;
  privacyHref: string;
  privacyLink: string;
  termsLead?: string;
  termsLink?: string;
  termsHref?: string;
  company?: string;
};

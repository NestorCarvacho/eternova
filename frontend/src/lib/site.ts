export const site = {
  phoneDisplay: "+56 2 2345 6789",
  phoneHref: "tel:+56223456789",
  whatsappDisplay: "+56 9 8765 4321",
  whatsappHref: "https://wa.me/56987654321",
} as const;

export const services = [
  {
    id: "basica",
    slug: "cremacion-basica",
    price: 995_000,
    image: "/images/service-basic.jpg",
    featured: false,
  },
  {
    id: "signature",
    slug: "cremacion-signature",
    price: 1_295_000,
    image: "/images/service-signature.jpg",
    featured: true,
  },
  {
    id: "vip",
    slug: "cremacion-vip",
    price: 1_595_000,
    image: "/images/service-vip.jpg",
    featured: false,
  },
] as const;

export type Service = (typeof services)[number];
export type ServiceSlug = Service["slug"];

export function findService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

import Link from "next/link";

export default function RootNotFound() {
  return (
    <html lang="es">
      <body className="bg-cream font-sans text-ink antialiased">
        <section className="mx-auto w-full max-w-3xl px-5 py-24 sm:px-8">
          <h1 className="font-display text-5xl">No encontramos esta página</h1>
          <p className="mt-4 text-lg text-muted">El enlace no corresponde a una página de Eternova.</p>
          <Link href="/" className="mt-8 inline-flex min-h-11 items-center rounded-full bg-ink px-6 text-sm font-medium text-paper">
            Volver al inicio
          </Link>
        </section>
      </body>
    </html>
  );
}
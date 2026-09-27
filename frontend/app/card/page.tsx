import { notFound } from 'next/navigation';

import { buildPageMetadata } from '@/lib/seo';

import { CardPageClient } from './CardPageClient';

function isCardEnabled(): boolean {
  const value = process.env.NEXT_PUBLIC_CARD_ENABLED;
  if (!value) return false;
  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
}

export const metadata = buildPageMetadata({
  title: 'Card Controls',
  description: 'Freeze or unfreeze an additive card program. This feature is disabled by default.',
  path: '/card',
  absoluteTitle: true,
});

export default function CardPage() {
  if (!isCardEnabled()) {
    notFound();
  }

  return <CardPageClient />;
import type { Metadata } from "next";
import { CardPageClient } from "./CardPageClient";

export const metadata: Metadata = {
  title: "Card | StellarRoute",
  description:
    "Preview of card authorization status. Webhook declines surface here only — the notification inbox is unchanged.",
};

export default function CardPage() {
  return (
    <main className="min-h-[calc(100vh-80px)] py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Card
          </h1>
          <p
            data-testid="card-paused-sentence"
            className="text-sm text-muted-foreground"
          >
            Card issuance is currently paused while we finish the preview.
          </p>
        </div>
        <CardPageClient />
      </div>
    </main>
  );
}

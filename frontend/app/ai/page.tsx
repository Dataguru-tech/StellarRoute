'use client';

import * as React from 'react';
import { useFeatureFlag } from '@/hooks/useFeatureFlag';

export default function AiPage() {
  const { enabled, loading } = useFeatureFlag('ai_agent');

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl" data-testid="ai-page-loading">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
      </div>
    );
  }

  if (!enabled) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-4xl" data-testid="ai-page-disabled">
        <div className="rounded-lg border border-border bg-card p-8 text-center text-card-foreground shadow-sm">
          <h1 className="text-2xl font-bold tracking-tight">AI Agent Unavailable</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            The AI assistant is currently disabled on this deployment.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl" data-testid="ai-page-shell">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Agent</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Non-custodial trading assistant.
          </p>
        </div>
        <div
          data-testid="agent-empty-shell"
          className="rounded-lg border border-dashed border-border p-12 text-center text-muted-foreground"
        >
          <p>Agent preview shell initialized.</p>
        </div>
      </div>
    </div>
  );
}

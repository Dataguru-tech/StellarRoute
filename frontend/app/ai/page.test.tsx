import React from "react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";

import AiPage from "./page";
import { useFeatureFlag } from "@/hooks/useFeatureFlag";

vi.mock("@/hooks/useFeatureFlag", () => ({
  useFeatureFlag: vi.fn(),
}));

describe("AiPage (/ai)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("shows disabled state when ai_agent flag is false and offers no actions", () => {
    vi.mocked(useFeatureFlag).mockReturnValue({ enabled: false, loading: false });

    render(<AiPage />);

    expect(screen.getByTestId("ai-page-disabled")).toBeInTheDocument();
    expect(screen.getByText("AI Agent Unavailable")).toBeInTheDocument();
    expect(
      screen.getByText(/The AI assistant is currently disabled on this deployment/i),
    ).toBeInTheDocument();

    // Does not offer actions
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  });

  it("renders empty shell when ai_agent flag is true", () => {
    vi.mocked(useFeatureFlag).mockReturnValue({ enabled: true, loading: false });

    render(<AiPage />);

    expect(screen.getByTestId("ai-page-shell")).toBeInTheDocument();
    expect(screen.getByTestId("agent-empty-shell")).toBeInTheDocument();
    expect(screen.getByText("AI Agent")).toBeInTheDocument();
    expect(screen.getByText("Agent preview shell initialized.")).toBeInTheDocument();
  });
});

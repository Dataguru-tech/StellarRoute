import { describe, expect, it } from "vitest";

import { getNavItems } from "./nav-items";

describe("getNavItems", () => {
  it("includes analytics when the feature flag is enabled", () => {
    const items = getNavItems({ analyticsEnabled: true });
    expect(items.some((item) => item.href === "/analytics")).toBe(true);
  });

  it("omits analytics when the feature flag is disabled", () => {
    const items = getNavItems({ analyticsEnabled: false });
    expect(items.some((item) => item.href === "/analytics")).toBe(false);
  });

  it("always includes offramp", () => {
    const items = getNavItems({ analyticsEnabled: false });
    expect(items.some((item) => item.href === "/offramp")).toBe(true);
  });

  it("omits Agent when aiAgentEnabled is false or omitted", () => {
    const items = getNavItems({ analyticsEnabled: false });
    expect(items.some((item) => item.href === "/ai" || item.label === "Agent")).toBe(false);

    const itemsExplicitOff = getNavItems({ analyticsEnabled: false, aiAgentEnabled: false });
    expect(itemsExplicitOff.some((item) => item.href === "/ai" || item.label === "Agent")).toBe(false);
  });

  it("includes Agent when aiAgentEnabled is true", () => {
    const items = getNavItems({ analyticsEnabled: false, aiAgentEnabled: true });
    const agentItem = items.find((item) => item.href === "/ai");
    expect(agentItem).toBeDefined();
    expect(agentItem?.label).toBe("Agent");
  });
});

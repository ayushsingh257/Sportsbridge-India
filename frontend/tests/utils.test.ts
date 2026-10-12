import { describe, it, expect } from "vitest";
import { formatINR, cn } from "../src/lib/utils";

describe("Frontend Utilities Foundation", () => {
  it("formats Indian Rupee currency correctly", () => {
    const formatted = formatINR(50000);
    expect(formatted).toContain("50,000");
  });

  it("merges CSS class names properly", () => {
    const classes = cn("px-4", "py-2", { "bg-red-600": true });
    expect(classes).toContain("bg-red-600");
  });
});

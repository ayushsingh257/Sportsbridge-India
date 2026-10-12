import { describe, it, expect } from "vitest";
import { SPORTS_CATALOGUE, SCHOLARSHIP_PROGRAMS, PLATFORM_STATS } from "../src/data/mock-data";

describe("Sports Catalogue & Data Integrity", () => {
  it("covers at least 14 recognized sports", () => {
    expect(SPORTS_CATALOGUE.length).toBeGreaterThanOrEqual(14);
  });

  it("includes core mandated Olympic and Indian sports", () => {
    const sportNames = SPORTS_CATALOGUE.map((s) => s.name);
    expect(sportNames).toContain("Cricket");
    expect(sportNames).toContain("Football");
    expect(sportNames).toContain("Archery");
    expect(sportNames).toContain("Shooting");
    expect(sportNames).toContain("Athletics (Track & Field)");
    expect(sportNames).toContain("Badminton");
    expect(sportNames).toContain("Wrestling (Freestyle/Greco-Roman)");
    expect(sportNames).toContain("Boxing");
    expect(sportNames).toContain("Swimming");
  });

  it("explicitly tags demonstration platform statistics", () => {
    const demoStats = PLATFORM_STATS.filter((s) => s.isDemonstrationData);
    expect(demoStats.length).toBeGreaterThan(0);
    expect(demoStats.some((s) => s.label === "Athletes Supported")).toBe(true);
  });

  it("provides distinct published scholarship programs", () => {
    expect(SCHOLARSHIP_PROGRAMS.length).toBeGreaterThanOrEqual(4);
    const archProg = SCHOLARSHIP_PROGRAMS.find((p) => p.sport === "Archery");
    expect(archProg).toBeDefined();
    expect(archProg?.fundingMax).toBeGreaterThan(0);
  });
});

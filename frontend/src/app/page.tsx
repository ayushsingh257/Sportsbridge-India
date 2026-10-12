import React from "react";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { SportsDiscovery } from "@/components/home/sports-discovery";
import { HowItWorks } from "@/components/home/how-it-works";
import { ScholarshipsSection } from "@/components/home/scholarships-section";
import { ParticipatingOrgs } from "@/components/home/participating-orgs";
import { TrustTransparency } from "@/components/home/trust-transparency";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <SportsDiscovery />
      <HowItWorks />
      <ScholarshipsSection />
      <ParticipatingOrgs />
      <TrustTransparency />
    </>
  );
}

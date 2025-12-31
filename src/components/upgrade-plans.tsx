"use client";

import PricingCard from "./pricing-card";
import { Gift, Snowflake, Star } from "lucide-react";
import SantaHat from "./santa-hat";

export default function UpgradePlans() {
  const plans = [
    {
      title: "Snowflake",
      description: "Perfect for getting started.",
      price: "$5",
      features: ["10 GB Storage", "50 GB Bandwidth", "Basic Support"],
      Icon: Snowflake,
    },
    {
      title: "Reindeer",
      description: "For growing needs.",
      price: "$15",
      features: [
        "50 GB Storage",
        "250 GB Bandwidth",
        "Priority Email Support",
        "Advanced Analytics",
      ],
      Icon: Gift,
      isFeatured: true,
      buttonText: "Choose Featured Plan",
    },
    {
      title: "Santa's Sleigh",
      description: "For power users & teams.",
      price: "$30",
      features: [
        "200 GB Storage",
        "1 TB Bandwidth",
        "24/7 Phone Support",
        "Team Collaboration",
        "Dedicated IP",
      ],
      Icon: Star,
    },
  ];

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight relative inline-block">
            <SantaHat className="absolute -top-6 -right-8 h-10 w-10 transform rotate-[15deg]"/>
            Christmas Plan Offers
        </h2>
        <p className="text-muted-foreground mt-2">
            'Tis the season for more storage! Unlock special holiday deals.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <PricingCard key={index} {...plan} />
        ))}
      </div>
    </section>
  );
}

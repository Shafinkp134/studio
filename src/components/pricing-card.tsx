"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  buttonText?: string;
  isFeatured?: boolean;
  Icon?: React.ElementType;
}

export default function PricingCard({
  title,
  description,
  price,
  features,
  buttonText = "Upgrade",
  isFeatured = false,
  Icon,
}: PricingCardProps) {
  return (
    <Card className={cn("flex flex-col", isFeatured ? "border-primary shadow-lg" : "")}>
      <CardHeader className="items-center text-center">
        {Icon && <Icon className="h-10 w-10 mb-2 text-primary" />}
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-center mb-6">
          <span className="text-4xl font-bold">{price}</span>
          <span className="text-muted-foreground">/month</span>
        </div>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className="w-full" variant={isFeatured ? "default" : "outline"}>
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}

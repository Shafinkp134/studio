import UpgradePlans from "@/components/upgrade-plans";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SleighAnimation from "@/components/sleigh-animation";

export default function PlansPage() {
  return (
    <>
      <SleighAnimation />
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="mb-8">
          <Button asChild variant="outline">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
        </div>
        <UpgradePlans />
      </div>
    </>
  );
}

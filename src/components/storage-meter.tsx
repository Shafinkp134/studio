"use client";

import { Progress } from "@/components/ui/progress";
import { formatBytes } from "@/lib/utils";

interface StorageMeterProps {
  storageUsed: number;
  storageLimit: number;
}

export default function StorageMeter({ storageUsed, storageLimit }: StorageMeterProps) {
  const percentage = (storageUsed / storageLimit) * 100;

  return (
    <div className="w-full md:w-64">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-muted-foreground">Storage</span>
        <span className="text-sm font-medium">
          {formatBytes(storageUsed)} / {formatBytes(storageLimit)}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}

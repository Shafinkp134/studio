import { cn } from "@/lib/utils";

export default function SantaHat({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={cn(className)}
      aria-hidden="true"
    >
      <path d="M20 50 Q50 20 80 50 L90 80 L10 80 Z" fill="#d90429" />
      <rect x="5" y="75" width="90" height="20" fill="white" rx="5" />
      <circle cx="85" cy="40" r="15" fill="white" />
    </svg>
  );
}

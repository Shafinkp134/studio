"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Loader2, Github } from "lucide-react";

export default function AuthForm() {
  const { signInWithGoogle, signInWithGitHub } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    await signInWithGoogle();
    setIsGoogleLoading(false);
  };

  const handleGitHubSignIn = async () => {
    setIsGitHubLoading(true);
    await signInWithGitHub();
    setIsGitHubLoading(false);
  };

  return (
    <div className="grid gap-4">
      <Button
        variant="outline"
        type="button"
        disabled={isGoogleLoading || isGitHubLoading}
        onClick={handleGoogleSignIn}
      >
        {isGoogleLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon className="mr-2 h-4 w-4" />
        )}
        Continue with Google
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isGoogleLoading || isGitHubLoading}
        onClick={handleGitHubSignIn}
      >
        {isGitHubLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Github className="mr-2 h-4 w-4" />
        )}
        Continue with GitHub
      </Button>
    </div>
  );
}

const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Google</title>
    <path
      fill="currentColor"
      d="M12.48 10.92v3.28h7.84c-.24 1.84-.85 3.18-1.73 4.1-1.02 1.02-2.62 1.9-4.72 1.9-4.42 0-7.92-3.6-7.92-7.92s3.5-7.92 7.92-7.92c2.34 0 4.02.86 5.3 2.02l2.6-2.6C18.06 2.48 15.48 1 12.48 1 5.8 1 1 5.8 1 12.32s4.8 11.32 11.48 11.32c3.54 0 6.3-1.24 8.36-3.36 2.16-2.16 2.8-5.2 2.8-8.32 0-.76-.06-1.5-.18-2.24h-10.9v.02Z"
    />
  </svg>
);

"use client";

import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Loader2, Github, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AuthForm() {
  const {
    signInWithGoogle,
    signInWithGitHub,
    signInWithEmail,
    signUpWithEmail,
  } = useAuth();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSignUp, setIsSignUp] = useState(false);

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

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsEmailLoading(true);
    setError(null);
    try {
      if (isSignUp) {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
    } catch (err: any) {
      let message = "An unexpected error occurred.";
      if (err.code) {
        switch (err.code) {
          case "auth/invalid-email":
            message = "Please enter a valid email address.";
            break;
          case "auth/user-not-found":
            message = "No account found with this email. Please sign up.";
            break;
          case "auth/wrong-password":
            message = "Incorrect password. Please try again.";
            break;
          case "auth/email-already-in-use":
            message = "An account already exists with this email address.";
            break;
          case "auth/weak-password":
            message = "The password must be at least 6 characters long.";
            break;
          default:
            message = "Failed to authenticate. Please try again.";
        }
      }
      setError(message);
    } finally {
      setIsEmailLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleEmailAuth} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isEmailLoading}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            disabled={isEmailLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button disabled={isEmailLoading}>
          {isEmailLoading && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          {isSignUp ? "Sign Up" : "Sign In"} with Email
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid gap-4">
        <Button
          variant="outline"
          type="button"
          disabled={isGoogleLoading || isGitHubLoading || isEmailLoading}
          onClick={handleGoogleSignIn}
        >
          {isGoogleLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GoogleIcon className="mr-2 h-4 w-4" />
          )}
          Google
        </Button>
        <Button
          variant="outline"
          type="button"
          disabled={isGoogleLoading || isGitHubLoading || isEmailLoading}
          onClick={handleGitHubSignIn}
        >
          {isGitHubLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Github className="mr-2 h-4 w-4" />
          )}
          GitHub
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
        <Button
          variant="link"
          className="p-0 h-auto"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError(null);
          }}
        >
          {isSignUp ? "Sign In" : "Sign Up"}
        </Button>
      </p>
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

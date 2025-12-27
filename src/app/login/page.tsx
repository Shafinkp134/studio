import AuthForm from "@/components/auth-form";
import { Cloud } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="container relative flex h-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <Cloud className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome to CloudVault
          </h1>
          <p className="text-sm text-muted-foreground">
            Sign in to access your secure cloud storage
          </p>
        </div>
        <AuthForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

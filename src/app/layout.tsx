import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "CloudVault",
  description: "Secure cloud storage for your files.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body h-full bg-background">
        <AuthProvider>
          <div className="flex flex-col h-full">
            <Header />
            <main className="flex-1">{children}</main>
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

"use client";

import "@/src/styles/globals.css";
import { ModeProvider } from "@/src/contexts/ModeContext";
import { AuthProvider } from "@/src/contexts/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-auto">
      <head>
        <title>HydrateWatch - Real-Time Hydrate Formation Monitoring</title>
        <meta name="description" content="Enterprise-grade hydrate formation monitoring and prediction for oil & gas operations" />
      </head>
      <body className="min-h-screen overflow-y-scroll">
        <GoogleOAuthProvider clientId={googleClientId}>
          <AuthProvider>
            <ModeProvider>
              {children}
            </ModeProvider>
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

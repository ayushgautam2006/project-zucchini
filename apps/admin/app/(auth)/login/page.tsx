"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { signInWithGoogle } from "@repo/firebase-config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GoogleIcon from "@/components/google";

export default function LoginPage({ className, ...props }: React.ComponentProps<"div">) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await signInWithGoogle();

      if (result) {
        console.log("Login successful:", result.user.email);

        router.push("/registrations");
      }
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className={cn("flex flex-col gap-6 w-full max-w-md", className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Admin Login</CardTitle>
            <CardDescription>Please Enter your credentials to login</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              type="button"
              className="w-full"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <GoogleIcon />
              {isLoading ? "Signing in..." : "Login with Google"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

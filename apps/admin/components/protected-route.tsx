"use client";

import { useAuth } from "@/contexts/auth-context";
import { usePathname } from "next/navigation";
import Loader from "./loader";
import { publicRoutes } from "@/config";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  if (loading) {
    return <Loader text="Loading..." />;
  }

  if (publicRoutes.includes(pathname) && !user) {
    return <>{children}</>;
  }
  if (!user) {
    return <Loader text="Redirecting to login..." />;
  }

  return <>{children}</>;
}

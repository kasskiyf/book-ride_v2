"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth-context";
import { usePathname, useRouter } from "next/navigation";

export default function DriversLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      // Allow access to the main drivers page without authentication
      if (pathname === "/drivers") {
        setIsAuthorized(true);
        return;
      }

      // For other driver routes, check authentication and type
      if (!user) {
        router.push("/auth?register=true&type=driver");
      } else if (user.type !== "driver") {
        router.push("/");
      } else {
        setIsAuthorized(true);
      }
    }
  }, [user, isLoading, pathname, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
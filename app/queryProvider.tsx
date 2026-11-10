"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import DesktopOnly from "@/common/DesktopOnly";
import { Toaster } from "@/components/ui/toast";
export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime:10*60*1000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
       <DesktopOnly>
          {children}
       </DesktopOnly>
       <Toaster/>
    
    
    </QueryClientProvider>
  );
}
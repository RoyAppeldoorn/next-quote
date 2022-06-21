import type { AppProps } from "next/app";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import PageLayout from "../layouts/PageLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </QueryClientProvider>
  );
}

export default MyApp;

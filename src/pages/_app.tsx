// src/pages/_app.tsx
import { withTRPC } from "@trpc/next";
import type { AppRouter } from "../server/router";
import type { AppType } from "next/dist/shared/lib/utils";
import superjson from "superjson";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react"
import { createTRPCClient } from "@trpc/client";
import { createContext, useState } from "react";

export const CartContext = createContext<Array<any>>([]);

const MyApp: AppType = ({ Component, pageProps: { session, ...pageProps } }) => {

  const [items, setItems] = useState<Array<any>>([]);

  return (
    <CartContext.Provider value={[items, setItems]}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </CartContext.Provider>
  )
  // using next-auth session
};



const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  // Browser should use current path
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`;
  // dev SSR should use localhost
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;
    return {
      url,
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);

export const client = createTRPCClient<AppRouter>({
  url: `${getBaseUrl()}/api/trpc`
});

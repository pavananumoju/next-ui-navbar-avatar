import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Layout } from "@/layout/Layout";
import { AuthContextProvider } from "@/context/auth-context";

export default function App({ Component, pageProps }) {
  return (
    <NextUIProvider>
      <AuthContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthContextProvider>
    </NextUIProvider>
  );
}

import type { AppProps } from "next/app";

import "../styles/globals.css";

globalThis.api = { stickies: globalThis.api?.stickies || [] };
console.log("_app");

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

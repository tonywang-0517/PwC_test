import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import dynamic from "next/dynamic";
import {ContextProvider} from "@context/index";

export function MyApp({ Component, pageProps }: AppProps) {
  return <ContextProvider>
    <Component {...pageProps} />
  </ContextProvider>
}

export default dynamic(() => Promise.resolve(MyApp), {ssr: false});

import "../lib/styles/globals.css";
import type { AppProps } from "next/app";
import { wrapper } from "../store";
import Router from "next/router";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const showRoute = ["/postlist", "/postdetail"];
    const start = (url: string) => {
      console.log(url);
      if (showRoute.find((route) => String(url).includes(route))) {
        setLoading(true);
      }
    };
    const end = (url: string) => {
      if (showRoute.find((route) => String(url).includes(route))) {
        setLoading(false);
      }
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return <>{loading ? <h1>Loading...</h1> : <Component {...pageProps} />}</>;
}

export default wrapper.withRedux(MyApp);

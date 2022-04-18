import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { useTheme, ThemeProvider } from "./core/utils/theme-provider";
import { getThemeSession } from "./core/utils/theme.server";
import invariant from "tiny-invariant";

import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesheetUrl },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  // uncomment if you want to use realtime supabase features
  // const authSession = await getAuthSession(request);

  // return json({
  //   realtimeSession: {
  //     accessToken: authSession?.accessToken,
  //     expiresIn: authSession?.expiresIn,
  //     expiresAt: authSession?.expiresAt,
  //   },
  //   ENV: {
  //     SUPABASE_URL: process.env.SUPABASE_URL,
  //     SUPABASE_ANON_PUBLIC: process.env.SUPABASE_ANON_PUBLIC,
  //   },
  // });
  return json({
    requestInfo: {
      session: {
        theme: themeSession.getTheme(),
      },
    },
    ENV: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_ANON_PUBLIC: process.env.SUPABASE_ANON_PUBLIC,
    },
  });
};

function App() {
  const { ENV } = useLoaderData() as Window;
  const [theme] = useTheme();
  invariant(theme, "theme must be set");

  return (
    <html lang="en" className={theme}>
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData();
  return (
    <ThemeProvider specifiedTheme={data.requestInfo.session.theme}>
      <App />
    </ThemeProvider>
  );
}

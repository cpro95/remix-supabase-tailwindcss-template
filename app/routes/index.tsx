import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getAuthSession } from "~/core/auth/session.server";
import { DarkMode } from "~/core/components/darkmode";
import { LogoutButton } from "~/core/components/logout-button";

type LoaderData = {
  email?: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const { email } = (await getAuthSession(request)) || {};

  return json({ email });
};

export default function Index() {
  const { email } = useLoaderData() as LoaderData;

  return (
    <main className="relative min-h-screen bg-white dark:bg-gray-700 sm:flex sm:items-start sm:justify-center">
      <div className="relative sm:pb-16 sm:pt-8">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
            <div className="absolute inset-0">
              {/* <img
            className="h-full w-full object-cover"
            src="https://raw.githubusercontent.com/cpro95/cpro95-cdn/main/images/polynesia-gfb10af716_1920.jpg"
            alt="Polynesia Beach"
          /> */}
              <img
                className="h-full w-full object-cover"
                src="polynesia-gfb10af716_1920.jpg"
                alt="Polynesia Beach"
              />
              <div className="absolute inset-0 bg-[color:rgba(254,204,27,0.5)] mix-blend-multiply" />
            </div>
            <div className="lg:pb-18 relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32">
              <h1 className="text-center text-6xl font-extrabold tracking-tight sm:text-7xl lg:text-9xl">
                <span className="block uppercase text-amber-100 drop-shadow-md">
                  Remix Supabase Netlify
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-center text-xl text-cyan-300 sm:max-w-3xl">
                Let's Coding with Remix!
              </p>

              <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
                {email ? (
                  <div className="flex flex-cols justify-center space-x-2">
                    <Link
                      to="/notes"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                    >
                      View Notes for {email}
                    </Link>
                    <LogoutButton />
                  </div>
                ) : (
                  <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
                    <Link
                      to="/join"
                      className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
                    >
                      Sign up
                    </Link>
                    <Link
                      to="/login"
                      className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600"
                    >
                      Log In
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <DarkMode />
    </main>
  );
}

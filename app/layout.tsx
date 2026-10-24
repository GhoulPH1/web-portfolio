import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { NavProgress } from "./components/NavProgress";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { siteMeta } from "@/content/site";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: siteMeta.defaultTitle,
    template: siteMeta.titleTemplate,
  },
  description: siteMeta.defaultDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var d=document.documentElement;d.classList.add('js');if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){d.setAttribute('data-reduced-motion','')}var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}d.setAttribute('data-theme',t)}catch(e){}})();`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-bg font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-5 focus:top-4 focus:z-50 focus:bg-bg focus:px-3 focus:py-2 focus:text-sm"
        >
          Skip to main content
        </a>
        <NavProgress />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}

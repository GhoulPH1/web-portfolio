import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-5 py-20 sm:px-8">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-md text-muted">
        That route does not exist. Try the home page or project index.
      </p>
      <p className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link href="/" className="font-medium text-accent hover:text-accent-hover">
          Home
        </Link>
        <Link href="/projects" className="font-medium text-accent hover:text-accent-hover">
          Projects
        </Link>
      </p>
    </main>
  );
}

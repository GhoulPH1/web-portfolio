import { Container } from "./components/ui/Container";
import { TextLink } from "./components/ui/TextLink";

export default function NotFound() {
  return (
    <main id="main" className="bg-bg">
      <Container className="flex min-h-[60vh] flex-col justify-center py-24">
        <p className="text-label text-ink-muted">404</p>
        <h1 className="text-h1 mt-4">Page not found</h1>
        <p className="text-body mt-4 text-ink-muted">
          That route does not exist.
        </p>
        <p className="mt-8 flex flex-wrap gap-6">
          <TextLink href="/">Home</TextLink>
          <TextLink href="/projects">Work</TextLink>
        </p>
      </Container>
    </main>
  );
}

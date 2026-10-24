import { Container } from "./components/ui/Container";
import { Reveal } from "./components/ui/Reveal";
import { TextLink } from "./components/ui/TextLink";

export default function NotFound() {
  return (
    <main id="main" className="bg-bg">
      <Container className="flex min-h-[60vh] flex-col justify-center py-24">
        <Reveal>
          <p className="text-label text-ink-muted">404</p>
          <h1 className="text-h1 mt-4">Page not found</h1>
          <p className="text-body mt-4 text-ink-muted">
            That route does not exist.
          </p>
          <p className="mt-8 flex flex-wrap gap-6">
            <TextLink href="/">Home</TextLink>
            <TextLink href="/projects">Projects</TextLink>
          </p>
        </Reveal>
      </Container>
    </main>
  );
}

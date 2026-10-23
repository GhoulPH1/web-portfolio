import { contact, siteMeta } from "@/content/site";
import { ContactLinks } from "./ContactLinks";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 py-8 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="text-muted">
          <span className="text-foreground">{siteMeta.siteName}</span>
          {contact.locationDisplay ? ` · ${contact.locationDisplay}` : null}
        </p>
        <ContactLinks />
      </div>
    </footer>
  );
}

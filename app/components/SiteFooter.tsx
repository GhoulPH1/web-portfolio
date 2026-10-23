import { contact, rolesOpenTo, siteMeta } from "@/content/site";
import { ContactLinks } from "./ContactLinks";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 px-5 py-8 text-sm sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted">
            <span className="text-foreground">{siteMeta.siteName}</span>
            {contact.locationDisplay ? ` · ${contact.locationDisplay}` : null}
          </p>
          <ContactLinks />
        </div>
        <p className="text-muted">{rolesOpenTo}</p>
      </div>
    </footer>
  );
}

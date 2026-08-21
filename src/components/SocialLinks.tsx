import type { ReactNode } from "react";
import { siteConfig } from "@/lib/seo";

export type SocialId = "instagram" | "whatsapp" | "tiktok" | "facebook";

export interface SocialLink {
  id: SocialId;
  label: string;
  handle: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@maimbo.streetwear",
    href: siteConfig.social.instagram,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    handle: siteConfig.phoneDisplay,
    href: siteConfig.whatsapp,
  },
  {
    id: "tiktok",
    label: "TikTok",
    handle: "@maimbo_1",
    href: siteConfig.social.tiktok,
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "MAINBOMODA",
    href: siteConfig.social.facebook,
  },
];

function IconShell({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className="h-[1.05rem] w-[1.05rem] shrink-0"
    >
      {children}
    </svg>
  );
}

export function SocialIcon({ id }: { id: SocialId }) {
  switch (id) {
    case "instagram":
      return (
        <IconShell>
          <path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.75A3.75 3.75 0 0 0 3.75 7.5v9A3.75 3.75 0 0 0 7.5 20.25h9A3.75 3.75 0 0 0 20.25 16.5v-9A3.75 3.75 0 0 0 16.5 3.75h-9Z" />
          <path d="M12 7.25A4.75 4.75 0 1 1 7.25 12 4.75 4.75 0 0 1 12 7.25Zm0 1.5A3.25 3.25 0 1 0 15.25 12 3.25 3.25 0 0 0 12 8.75Z" />
          <circle cx="17.55" cy="6.45" r="1.05" />
        </IconShell>
      );
    case "whatsapp":
      return (
        <IconShell>
          <path d="M12.04 2.1A9.9 9.9 0 0 0 2.2 11.9a9.8 9.8 0 0 0 1.35 4.98L2.1 21.9l5.2-1.4a9.9 9.9 0 0 0 4.74 1.2h.01a9.9 9.9 0 0 0 9.9-9.9 9.86 9.86 0 0 0-9.9-9.7Zm5.8 14.05c-.24.68-1.4 1.25-1.94 1.33-.5.07-1.13.1-1.82-.11a18.8 18.8 0 0 1-1.75-.65 8.85 8.85 0 0 1-3.78-3.42c-.36-.55-.74-1.3-.74-2.03 0-.7.37-1.34.66-1.6.24-.22.62-.34.93-.34h.27c.2 0 .4-.02.57.44l.66 1.6c.1.24.05.36-.08.52l-.34.4c-.16.17-.32.32-.14.6.17.28.76 1.24 1.63 2.01 1.12.98 2.04 1.3 2.34 1.45.3.14.48.12.66-.07l.74-.87c.16-.19.37-.15.58-.08l1.55.73c.21.1.36.15.41.24.06.09.06.55-.18 1.23Z" />
        </IconShell>
      );
    case "tiktok":
      return (
        <IconShell>
          <path d="M16.6 2.1h-2.9v11.2a2.6 2.6 0 1 1-1.85-2.49V7.8a5.55 5.55 0 1 0 4.75 5.5V8.45A6.7 6.7 0 0 0 21 9.65V6.55a6.55 6.55 0 0 1-4.4-4.45Z" />
        </IconShell>
      );
    case "facebook":
      return (
        <IconShell>
          <path d="M13.5 21.9v-7.6h2.55l.38-2.95H13.5V9.45c0-.85.24-1.43 1.46-1.43h1.56V5.38A21.2 21.2 0 0 0 14.2 5.2c-2.4 0-4.04 1.46-4.04 4.15v2.32H7.7v2.95h2.46v7.28h3.34Z" />
        </IconShell>
      );
  }
}

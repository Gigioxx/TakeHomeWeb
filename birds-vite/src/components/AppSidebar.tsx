import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useSidebar } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Github, Link as LinkIcon, Linkedin } from "lucide-react";
import { useNavigate } from 'react-router-dom';

interface SocialLinkProps {
    url: string;
    label: string;
    children: React.ReactNode;
}

const SocialLink = ({ url, label, children }: SocialLinkProps) => (
    <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        className="inline-flex items-center justify-center rounded-full p-2 text-birds-secondary hover:text-birds-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-birds-secondary transition-colors"
    >
        {children}
        <span className="sr-only">{label}</span>
    </a>
);

const SidebarContent = ({ navigate }: { navigate: (path: string) => void }) => (
  <div className="flex flex-col justify-between items-start p-4 w-full h-full bg-birds-background">
    <div className="flex flex-col items-start p-0 gap-4 w-full">
      <div className="flex flex-row items-start p-0 gap-3 w-full">
        <div className="flex flex-col items-start p-0">
          <h1 className="font-medium text-base leading-6 text-birds-primary">
            The Birds App
          </h1>
          <p className="font-normal text-sm leading-[21px] text-birds-secondary">
            By Copilot
          </p>
        </div>
      </div>

      <div className="flex flex-col items-start p-0 gap-2 w-full">
        <div
          className="flex flex-row items-center px-3 py-2 gap-3 w-full h-[37px] bg-[rgba(63,119,171,0.08)] rounded-lg cursor-pointer hover:bg-[rgba(63,119,171,0.12)] transition-colors"
          onClick={() => navigate('/')}
        >
          <span className="font-semibold text-sm leading-[21px] text-birds-primary">
            Home
          </span>
        </div>
      </div>
    </div>

    {/* Social Links */}
    <div className="flex flex-col items-center gap-3 pb-2 w-full">
      <div className="flex items-center justify-center gap-3">
        <SocialLink url="https://www.linkedin.com/in/guillermocasanovab/" label="LinkedIn profile">
          <Linkedin className="size-5" />
        </SocialLink>
        <SocialLink url="https://github.com/gigioxx" label="GitHub profile">
          <Github className="size-5" />
        </SocialLink>
        <SocialLink url="https://www.guillermocasanova.cl/" label="Personal website">
          <LinkIcon className="size-5" />
        </SocialLink>
      </div>
      <p className="text-center text-sm text-birds-secondary w-full">With ❤️ by Guillermo Casanova</p>
    </div>
  </div>
);

export function AppSidebar() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { openMobile, setOpenMobile } = useSidebar();

  // On mobile, render as Sheet
  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side="left" className="w-[307px] p-0 bg-white">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <SidebarContent navigate={navigate} />
        </SheetContent>
      </Sheet>
    );
  }

  // On desktop, render as fixed sidebar
  return (
    <div className="fixed top-0 left-0 flex flex-col items-start p-0 w-[307px] h-screen bg-white border border-birds-border z-10">
      <SidebarContent navigate={navigate} />
    </div>
  );
}

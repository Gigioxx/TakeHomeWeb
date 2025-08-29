import { useNavigate } from 'react-router-dom';
import { Github, Link as LinkIcon, Linkedin } from "lucide-react";

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

export function AppSidebar() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col bg-white border-r border-birds-border w-[307px]">
      <div className="flex flex-col justify-between p-4 bg-birds-background h-full">
        <div className="flex flex-col gap-4">
          {/* Header */}
          <div className="flex flex-row items-start gap-3">
            <div className="flex flex-col">
              <h1 className="font-medium text-base leading-6 text-birds-primary">
                The Birds App
              </h1>
              <p className="font-normal text-sm leading-[21px] text-birds-secondary">
                By Copilot
              </p>
            </div>
          </div>
          
          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <div 
              className="flex flex-row items-center rounded-lg px-3 py-2 bg-birds-home-bg h-[37px] cursor-pointer hover:bg-birds-home-bg/80 transition-colors"
              onClick={() => navigate('/')}
            >
              <span className="font-semibold text-sm leading-[21px] text-birds-primary">
                Home
              </span>
            </div>
          </div>
        </div>
        
        {/* Social Links */}
        <div className="flex flex-col items-center gap-3 pb-2">
          <div className="flex items-center gap-3">
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
          <p className="text-center text-sm text-birds-secondary">With ❤️ by Guillermo Casanova</p>
        </div>
      </div>
    </div>
  );
}
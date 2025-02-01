import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import Container from "../container";

const routes = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socials = [
  { href: "https://github.com/yourusername", icon: Github, label: "Github" },
  { href: "https://twitter.com/yourusername", icon: Twitter, label: "Twitter" },
  {
    href: "https://linkedin.com/in/yourusername",
    icon: Linkedin,
    label: "LinkedIn",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background/95">
      <Container>
        <div className="grid grid-cols-1 gap-8 py-12 md:grid-cols-3">
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Portfolio</h3>
            <p className="text-sm text-muted-foreground">
              Showcasing my journey through web development
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-medium">Connect</h3>
            <div className="flex space-x-4">
              {socials.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between border-t border-border/40 py-6 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js, Tailwind CSS, and shadcn/ui
          </p>
        </div>
      </Container>
    </footer>
  );
}

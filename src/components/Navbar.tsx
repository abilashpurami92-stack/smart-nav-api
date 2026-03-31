import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { section: "home", label: "Home" },
  { section: "vision", label: "Vision" },
  { section: "events", label: "Events" },
  { section: "schedule", label: "Schedule" },
  { section: "achievements", label: "Achievements" },
  { section: "about-game", label: "About Game", isPage: true },
  { section: "contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // Track active section on scroll (home page only)
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const sections = navLinks
        .filter((l) => !l.isPage)
        .map((l) => l.section);

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(sections[i]);
            return;
          }
        }
      }
      setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Handle hash scroll after navigation from another page
  useEffect(() => {
    if (isHomePage && location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isHomePage, location.hash]);

  const scrollToSection = useCallback(
    (sectionId: string) => {
      if (isHomePage) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate(`/#${sectionId}`);
      }
    },
    [isHomePage, navigate]
  );

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    link: typeof navLinks[0]
  ) => {
    e.preventDefault();
    if (link.isPage) {
      navigate("/about-game");
    } else {
      scrollToSection(link.section);
    }
    setIsOpen(false);
  };

  const getLinkClass = (link: typeof navLinks[0], isMobile = false) => {
    const isActive = link.isPage
      ? location.pathname === "/about-game"
      : isHomePage && activeSection === link.section;

    const base = isMobile
      ? "text-lg font-medium transition-colors uppercase tracking-wider py-2"
      : "text-sm font-medium transition-colors uppercase tracking-wider";

    return `${base} ${isActive ? "text-primary" : "text-muted-foreground hover:text-primary"}`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Goosebumps Ultimate Disc Club"
              className="w-10 h-10 lg:w-12 lg:h-12 object-contain"
            />
            <div className="hidden sm:block">
              <span className="font-display text-lg lg:text-xl font-bold tracking-tight text-foreground leading-tight block">
                GOOSEBUMPS
              </span>
              <span className="text-xs text-muted-foreground tracking-widest">
                ULTIMATE DISC CLUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.section}
                href={link.isPage ? "/about-game" : `#${link.section}`}
                onClick={(e) => handleNavClick(e, link)}
                className={getLinkClass(link)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Button
              variant="default"
              className="font-semibold uppercase tracking-wider"
              onClick={(e) =>
                handleNavClick(e, { section: "contact", label: "Contact" })
              }
            >
              Join Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex items-center gap-3 mb-8">
                <img
                  src="/images/logo.png"
                  alt="Goosebumps Ultimate Disc Club"
                  className="w-10 h-10 object-contain"
                />
                <div>
                  <span className="font-display text-lg font-bold tracking-tight text-foreground leading-tight block">
                    GOOSEBUMPS
                  </span>
                  <span className="text-xs text-muted-foreground tracking-widest">
                    ULTIMATE DISC CLUB
                  </span>
                </div>
              </div>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.section}
                    href={link.isPage ? "/about-game" : `#${link.section}`}
                    onClick={(e) => handleNavClick(e, link)}
                    className={getLinkClass(link, true)}
                  >
                    {link.label}
                  </a>
                ))}
                <Button
                  className="mt-4 w-full font-semibold uppercase tracking-wider"
                  onClick={(e) =>
                    handleNavClick(e, { section: "contact", label: "Contact" })
                  }
                >
                  Join Now
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

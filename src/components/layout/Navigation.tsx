import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Menu,
  X,
  LogIn,
  ChevronDown,
  Star,
  Calendar,
  Sparkles,
  Activity,
  Heart,
  Zap,
  ArrowRight,
  Users,
  Stethoscope,
} from "lucide-react";

type DropdownItem = {
  name: string;
  href: string;
  icon?: string; // "sparkles" | "heart" | "zap" | "activity" | ...
  isRoute?: boolean;
};

type NavItem = {
  name: string;
  href: string;
  isRoute?: boolean;
  hasDropdown?: boolean;
  dropdownItems?: DropdownItem[];
  featured?: boolean;
  icon?: string; // "users" etc.
};

const getIcon = (icon?: string, className = "w-4 h-4") => {
  switch (icon) {
    case "users":
      return <Users className={className} />;
    case "sparkles":
      return <Sparkles className={className} />;
    case "heart":
      return <Heart className={className} />;
    case "zap":
      return <Zap className={className} />;
    case "activity":
      return <Activity className={className} />;
    default:
      return null;
  }
};

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { user } = useAuth();

  const navItems: NavItem[] = [
    ...(user && user.role === "admin"
      ? [
          {
            name: "Usuarios",
            href: "/admin/users",
            isRoute: true,
            icon: "users",
          },
          {
            name: "Centros",
            href: "/admin/centers",
            isRoute: true,
            icon: "users",
          },
        ]
      : []),
    {
      name: "Tratamientos",
      href: "#tratamientos",
      hasDropdown: true,
      dropdownItems: [
        {
          name: "Medicina Estética",
          href: "#tratamientos",
          icon: "sparkles",
        },
        {
          name: "Sueroterapia",
          href: "#sueroterapia",
          icon: "heart",
        },
        {
          name: "Performance",
          href: "#performance",
          icon: "zap",
        },
        {
          name: "Biohacking",
          href: "/calculadora-edad",
          icon: "activity",
          isRoute: true,
        },
      ],
    },
    ...(user && user.role === "patient"
      ? [
          {
            name: "Ruta de Vitalidad",
            href: "/ruta-vitalidad",
            isRoute: true,
            featured: true,
          },
        ]
      : []),
    { name: "Quiénes Somos", href: "#quienes-somos" },
    { name: "Testimonios", href: "/testimonios", isRoute: true },
    { name: "Noticias", href: "/noticias", isRoute: true },
    { name: "Blog", href: "/blog", isRoute: true },
    { name: "FAQs", href: "/faq", isRoute: true },
    { name: "Membresías", href: "#membresias" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const baseButtonClasses =
    "relative h-10 px-3 text-xs sm:text-sm font-medium rounded-none border-b-2 border-transparent " +
    "bg-transparent hover:bg-transparent hover:text-primary hover:border-primary transition-colors";

  const getDropdownDescription = (name: string) => {
    if (name === "Medicina Estética") return "Tratamientos faciales y corporales";
    if (name === "Sueroterapia") return "Hidratación y vitaminas IV";
    if (name === "Performance") return "Optimización del rendimiento";
    if (name === "Biohacking") return "Calculadora de edad biológica";
    return "";
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        border-b border-white/10
        transition-colors duration-300
        ${isScrolled ? "bg-background/95 backdrop-blur" : "bg-background/90"}
      `}
    >
      {/* Desktop / main header */}
      <div className="flex h-14 items-center justify-between gap-4 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary shadow-sm">
            <span className="text-sm font-bold text-primary-foreground">I</span>
          </div>
          <div className="leading-tight">
            <span className="block text-sm font-semibold tracking-[0.18em] text-foreground">
              ILUMINA
            </span>
            <span className="block text-[11px] text-muted-foreground">
              Vital Lounge
            </span>
          </div>
        </Link>

        {/* Left side nav (desktop) */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = item.isRoute && location.pathname === item.href;

            return (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown && setActiveDropdown(item.name)
                }
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.isRoute ? (
                  <Link to={item.href}>
                    <Button
                      variant="ghost"
                      className={`${baseButtonClasses} ${
                        isActive ? "text-primary border-primary" : "text-foreground"
                      }`}
                    >
                      {item.icon === "users" && (
                        <Users className="mr-1 h-4 w-4 text-primary" />
                      )}
                      {item.featured && !item.icon && (
                        <Sparkles className="mr-1 h-3 w-3 text-primary" />
                      )}
                      <span>{item.name}</span>
                      {item.hasDropdown && (
                        <ChevronDown className="ml-1 h-3 w-3" />
                      )}
                    </Button>
                  </Link>
                ) : (
                  <a href={item.href}>
                    <Button
                      variant="ghost"
                      className={`${baseButtonClasses} text-foreground`}
                    >
                      <span>{item.name}</span>
                      {item.hasDropdown && (
                        <ChevronDown className="ml-1 h-3 w-3" />
                      )}
                    </Button>
                  </a>
                )}

                {/* Dropdown (desktop) */}
                {item.hasDropdown && activeDropdown === item.name && (
                  <div className="absolute left-0 top-full mt-2 w-72 rounded-lg border border-white/10 bg-background/98 backdrop-blur shadow-xl p-3">
                    <div className="space-y-1">
                      {item.dropdownItems?.map((dropdownItem) => {
                        const content = (
                          <button className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm hover:bg-primary/5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10">
                              {getIcon(dropdownItem.icon)}
                            </div>
                            <div>
                              <p className="font-medium">{dropdownItem.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {getDropdownDescription(dropdownItem.name)}
                              </p>
                            </div>
                          </button>
                        );

                        return dropdownItem.isRoute ? (
                          <Link key={dropdownItem.name} to={dropdownItem.href}>
                            {content}
                          </Link>
                        ) : (
                          <a key={dropdownItem.name} href={dropdownItem.href}>
                            {content}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Únete al Equipo */}
          <Button
            variant="outline"
            size="sm"
            className="ml-2 h-9 border-primary/40 bg-transparent text-xs font-semibold hover:bg-primary/10"
            onClick={() =>
              window.dispatchEvent(new CustomEvent("openJoinTeamModal"))
            }
          >
            <Users className="mr-2 h-4 w-4" />
            Únete al Equipo
          </Button>
        </div>

        {/* Right side (desktop): rating + CTAs */}
        <div className="hidden lg:flex items-center gap-2">
          <div className="flex items-center rounded-full border border-white/10 px-3 py-1 text-[11px]">
            <Star className="mr-1 h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="font-semibold mr-2">4.9</span>
            <span className="h-3 w-px bg-white/20 mr-2" />
            <span className="text-muted-foreground">500+ pacientes</span>
          </div>

          <Link to="/login">
            <Button
              variant="outline"
              size="sm"
              className="h-9 border-white/20 bg-transparent text-xs font-semibold hover:bg-white/5"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Iniciar Sesión
            </Button>
          </Link>

          <Link to="/reservar">
            <Button
              size="sm"
              className="h-9 px-4 bg-gradient-to-r from-primary to-amber-400 text-xs font-semibold text-black shadow-md hover:brightness-105"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Reservar Cita
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden h-9 w-9"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-white/10 pb-4 pt-3">
          <div className="space-y-3 px-4">
            {navItems.map((item) => (
              <div key={item.name}>
                {item.isRoute ? (
                  <Link
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-foreground hover:bg-primary/5"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                ) : (
                  <a
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between rounded-md px-2 py-2 text-sm text-foreground hover:bg-primary/5"
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                )}

                {item.hasDropdown && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.dropdownItems?.map((dropdownItem) => {
                      const inner = (
                        <span className="flex items-center gap-2 rounded-md px-2 py-1 text-xs text-muted-foreground hover:text-primary">
                          {getIcon(dropdownItem.icon, "w-3 h-3")}
                          <span>{dropdownItem.name}</span>
                        </span>
                      );

                      return dropdownItem.isRoute ? (
                        <Link
                          key={dropdownItem.name}
                          to={dropdownItem.href}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {inner}
                        </Link>
                      ) : (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {inner}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            <div className="mt-2 space-y-2 border-t border-white/10 pt-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="w-full h-9 text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Iniciar Sesión
                </Button>
              </Link>
              <Link to="/reservar">
                <Button
                  className="w-full h-9 text-sm bg-gradient-to-r from-primary to-amber-400 text-black"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  Reservar Cita Online
                </Button>
              </Link>

              <div className="flex items-center justify-center gap-3 pt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
                  4.9/5
                </span>
                <span className="flex items-center gap-1">
                  <Stethoscope className="h-3 w-3 text-primary" />
                  500+ pacientes
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

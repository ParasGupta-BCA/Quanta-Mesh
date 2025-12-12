import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, LogIn, UserPlus, Shield, Home, Briefcase, ShoppingBag, Phone, MessageSquare } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sidebar, MobileSidebar, SidebarLink } from "@/components/ui/sidebar";

const navLinks = [
  { name: "Home", path: "/", icon: <Home className="h-4 w-4 shrink-0" /> },
  { name: "Services", path: "/services", icon: <Briefcase className="h-4 w-4 shrink-0" /> },
  { name: "Order", path: "/order", icon: <ShoppingBag className="h-4 w-4 shrink-0" /> },
  { name: "Contact", path: "/contact", icon: <Phone className="h-4 w-4 shrink-0" /> },
  { name: "Chat", path: "/chat", badge: "New", icon: <MessageSquare className="h-4 w-4 shrink-0" /> },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, signOut, loading } = useAuth();
  const { isAdmin } = useAdmin();

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="glass-card border-t-0 rounded-t-none">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-1.5 text-xl font-bold flex-shrink-0"
            >
              <span className="gradient-text">Quanta</span>
              <span className="text-foreground">Mesh</span>
            </Link>

            {/* Desktop Navigation - Centered */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${location.pathname === link.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                >
                  {link.name}
                  {link.badge && (
                    <span className="absolute -top-2 -right-3 flex h-4 items-center justify-center rounded-full bg-primary/30 backdrop-blur-md border border-primary/20 px-1.5 text-[9px] text-primary font-bold shadow-lg shadow-primary/20 animate-pulse">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section - Desktop (md and above) */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3">
              {!loading && (
                <>
                  {user ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="gap-2">
                          <User size={16} />
                          <span className="max-w-[100px] truncate text-sm">
                            {user.email?.split('@')[0]}
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border z-50">
                        {isAdmin && (
                          <>
                            <DropdownMenuItem asChild className="cursor-pointer">
                              <Link to="/admin" className="flex items-center">
                                <Shield className="mr-2 h-4 w-4" />
                                Admin Panel
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                          </>
                        )}
                        <DropdownMenuItem
                          onClick={handleSignOut}
                          className="cursor-pointer text-destructive focus:text-destructive"
                        >
                          <LogOut className="mr-2 h-4 w-4" />
                          Sign Out
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <>
                      <Button variant="ghost" size="sm" className="gap-1.5" asChild>
                        <Link to="/auth">
                          <LogIn size={16} />
                          Sign In
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1.5 border-primary/50 text-primary hover:bg-primary/10"
                        asChild
                      >
                        <Link to="/auth?signup=true">
                          <UserPlus size={16} />
                          Sign Up
                        </Link>
                      </Button>
                    </>
                  )}
                </>
              )}
              <Button variant="gradient" size="sm" className="lg:size-default" asChild>
                <Link to="/order">Publish My App</Link>
              </Button>
            </div>

            {/* Mobile Sidebar Trigger & Content */}
            <div className="md:hidden">
              <Sidebar open={isOpen} setOpen={setIsOpen}>
                <MobileSidebar>
                  <div className="flex flex-col h-full">
                    <div className="flex-1 space-y-4 pt-10">
                      {/* Logo Section in Sidebar */}
                      <div className="mb-8 px-2">
                        <Link
                          to="/"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-1.5 text-2xl font-bold"
                        >
                          <span className="gradient-text">Quanta</span>
                          <span className="text-foreground">Mesh</span>
                        </Link>
                      </div>

                      {/* Navigation Links */}
                      <div className="flex flex-col gap-2">
                        {navLinks.map((link, idx) => (
                          <Link to={link.path} key={idx} onClick={() => setIsOpen(false)}>
                            <SidebarLink
                              link={{
                                label: link.name,
                                href: link.path,
                                icon: link.icon,
                              }}
                              className={location.pathname === link.path ? "text-primary font-semibold" : "text-muted-foreground"}
                            />
                          </Link>
                        ))}
                      </div>

                      {/* Auth Section */}
                      <div className="pt-6 border-t border-border mt-auto">
                        {!loading && (
                          <div className="flex flex-col gap-2">
                            {user ? (
                              <>
                                <div className="px-2 py-2 text-sm text-muted-foreground break-all">
                                  Signed in as <span className="text-foreground font-medium block">{user.email}</span>
                                </div>
                                {isAdmin && (
                                  <Link to="/admin" onClick={() => setIsOpen(false)}>
                                    <SidebarLink
                                      link={{
                                        label: "Admin Panel",
                                        href: "/admin",
                                        icon: <Shield className="h-4 w-4 shrink-0 text-orange-500" />,
                                      }}
                                    />
                                  </Link>
                                )}
                                <div onClick={handleSignOut} className="cursor-pointer">
                                  <SidebarLink
                                    link={{
                                      label: "Sign Out",
                                      href: "#",
                                      icon: <LogOut className="h-4 w-4 shrink-0 text-destructive" />,
                                    }}
                                    className="text-destructive hover:text-destructive"
                                  />
                                </div>
                              </>
                            ) : (
                              <div className="space-y-3 px-1">
                                <Button
                                  variant="outline"
                                  className="w-full gap-2 justify-start"
                                  onClick={() => setIsOpen(false)}
                                  asChild
                                >
                                  <Link to="/auth">
                                    <LogIn size={16} />
                                    Sign In
                                  </Link>
                                </Button>
                                <Button
                                  variant="gradient"
                                  className="w-full gap-2 justify-start"
                                  onClick={() => setIsOpen(false)}
                                  asChild
                                >
                                  <Link to="/auth?signup=true">
                                    <UserPlus size={16} />
                                    Sign Up
                                  </Link>
                                </Button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Footer / CTA */}
                    <div className="pt-6">
                      <Button variant="gradient" className="w-full" asChild>
                        <Link to="/order" onClick={() => setIsOpen(false)}>
                          Publish My App
                        </Link>
                      </Button>
                    </div>
                  </div>
                </MobileSidebar>
              </Sidebar>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Car,
  Menu,
  X,
  Plane,
  Route,
  Crown,
  Building2,
  Truck,
  Headphones,
  DollarSign,
  Shield,
  Leaf,
  CalendarClock,
  BarChart3,
  MessageSquare,
  Settings,
  Users2,
  User,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "@/contexts/auth-context";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const services = [
  {
    title: "Airport Transfers",
    description: "Reliable transportation to and from airports",
    href: "/services/airport-transfers",
    icon: Plane,
  },
  {
    title: "Long Distance",
    description: "Comfortable rides for longer journeys between cities",
    href: "/services/long-distance",
    icon: Route,
  },
  {
    title: "VIP Services",
    description: "Luxury transportation for special occasions",
    href: "/services/vip",
    icon: Crown,
  },
  {
    title: "Business Solutions",
    description: "Corporate transportation services for professionals",
    href: "/services/business",
    icon: Building2,
  },
  {
    title: "Fleet Management",
    description: "Comprehensive fleet tracking and management",
    href: "/services/fleet",
    icon: Truck,
  },
  {
    title: "Customer Support",
    description: "24/7 dedicated customer assistance",
    href: "/services/support",
    icon: Headphones,
  },
];

const business = [
  {
    title: "Corporate Solutions",
    description: "Tailored transportation for businesses",
    href: "/business/corporate",
    icon: Building2,
  },
  {
    title: "Event Management",
    description: "Coordinated transport for corporate events",
    href: "/business/events",
    icon: CalendarClock,
  },
  {
    title: "Analytics",
    description: "Detailed insights and reporting",
    href: "/business/analytics",
    icon: BarChart3,
  },
  {
    title: "Communication Hub",
    description: "Centralized team communication",
    href: "/business/communication",
    icon: MessageSquare,
  },
  {
    title: "Team Management",
    description: "Manage your transportation team",
    href: "/business/team",
    icon: Users2,
  },
  {
    title: "Settings",
    description: "Configure your business account",
    href: "/business/settings",
    icon: Settings,
  },
];

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName[0]}${lastName[0]}`.toUpperCase();
  };

  const UserMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {user ? getInitials(user.firstName, user.lastName) : "JR"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {user?.type === "admin" ? (
          <DropdownMenuItem asChild>
            <Link href="/admin">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Admin Dashboard
            </Link>
          </DropdownMenuItem>
        ) : user?.type === "driver" ? (
          <DropdownMenuItem asChild>
            <Link href="/drivers/dashboard">
              <Car className="mr-2 h-4 w-4" />
              Driver Dashboard
            </Link>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/rides">
              <Route className="mr-2 h-4 w-4" />
              My Rides
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <header className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6" />
            <span className="font-bold">Jack's Ride</span>
          </Link>

          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Our Services</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                      {services.map((service) => (
                        <li key={service.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={service.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2">
                                <service.icon className="h-4 w-4" />
                                <div className="text-sm font-medium leading-none">
                                  {service.title}
                                </div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {service.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>For Business</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
                      {business.map((item) => (
                        <li key={item.title}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={item.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <div className="text-sm font-medium leading-none">
                                  {item.title}
                                </div>
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {item.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/drivers"
                    className={cn(
                      "text-sm font-medium transition-colors hover:text-primary",
                      pathname === "/drivers"
                        ? "text-primary"
                        : "text-muted-foreground"
                    )}
                  >
                    For Chauffeurs
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="hidden md:flex md:items-center md:gap-4">
            {user ? (
              <UserMenu />
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth?register=true">Get started</Link>
                </Button>
              </>
            )}
          </div>

          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="divide-y px-4">
            <div className="space-y-1 pb-3 pt-2">
              <div className="space-y-1">
                <p className="px-3 py-2 text-sm font-semibold">Our Services</p>
                {services.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <service.icon className="h-4 w-4" />
                    {service.title}
                  </Link>
                ))}
              </div>
              <div className="space-y-1 pt-4">
                <p className="px-3 py-2 text-sm font-semibold">For Business</p>
                {business.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                ))}
              </div>
              <Link
                href="/drivers"
                className="block rounded-md px-3 py-2 text-sm font-semibold hover:bg-accent hover:text-accent-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                For Chauffeurs
              </Link>
            </div>
            <div className="space-y-2 py-4">
              {user ? (
                <>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    asChild
                  >
                    <Link href="/profile">
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/auth">Sign in</Link>
                  </Button>
                  <Button className="w-full justify-start" asChild>
                    <Link href="/auth?register=true">Get started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}